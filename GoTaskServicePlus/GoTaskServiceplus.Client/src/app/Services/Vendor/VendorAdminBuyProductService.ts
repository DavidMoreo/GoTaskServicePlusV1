import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountStatusBuys, MovementType, tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';
import { CommonService } from '../Common/CommonService';





@Injectable({
  providedIn: 'root'
})



export class VendorAdminBuyProductService {

  _http: HttpClient;
  _listProduct: Array<tblBuyerCustomer>;
  countBuy: CountStatusBuys;
  _listBuyGroupByIdBuy: Array<string> = new Array<string>;
  _listBuyStorageTemp: Array<string>;
  _listBuyStorage: Array<string>;
  isBuyProduct: boolean = false;
  stausBuy: string = "";
  _movementType: MovementType = new MovementType();
  buy = new tblBuyerCustomerConcept();
  rowSeletion: string;
  constructor(private http: HttpClient, private _CommonService: CommonService) { 
    this._http = http;   
  }

  GetCountBuyStatus() {
   
    var list = this._listBuyStorageTemp;
  
    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `BuyCustomer/GetCountBuyStatus`);
    result.subscribe((e) => {
      this.countBuy = e.data;
      console.log("count", e.data);
      console.log("listCountBuy", this.countBuy);

    });

  }

  GetAllBuyStatusAdmin(movementTypeItem: string, idProject: string ): Observable<any> {

    this.GetCountBuyStatus();

    this.GetAllCartStorage();
    var list = this._listBuyStorageTemp;
    /*    alert(movementTypeItem);*/

    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `BuyCustomer/GetAllBuyStatusAdmin?idProject=${idProject}&movementTypeItem=${movementTypeItem}&page=0`);
    result.subscribe((e) => {

      this._listProduct = e.data;
      console.log("Http", e.data  );
      this.LoadGroup();     

    });

    return result;
  }


  GetAllBuyStatus(movementTypeItem: string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.GetCountBuyStatus();
    var list = this._listBuyStorageTemp;
    /*    alert(movementTypeItem);*/

    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `BuyCustomer/GetAllBuyStatus?movementTypeItem=${movementTypeItem}&page=0`);
    result.subscribe((e) => {
     
      this._listProduct = e.data;

      this.LoadGroup();      

    });

    return result;
  }


  LoadGroup() {
    this._listBuyGroupByIdBuy = new Array<string>;
    console.log("Product", this._listProduct);
    if (this._listProduct != null) {
      this._listProduct.forEach((p) => {
        var exist = this._listBuyGroupByIdBuy.find(s => s == p.purchareId);
        if (!exist) {
          this._listBuyGroupByIdBuy.push(p.purchareId);         
        }
      });
    }
   
  }


  Delete(id: string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })


    var result = this._http.delete<any>(this._CommonService._ConfigService.GetHostApi() + `BuyCustomer/DeleteAdminBuyCustomer?id=${id}`, { headers: headers1 });
    result.subscribe((e) => {     
   
      if (e.status) {
        this.GetAllBuyStatus(this.stausBuy);
     
        this._listProduct = this._listProduct.filter(s => s.id != id);
        /*  this.RemoveCartById(id);*/
      }


    });

    return result;
  }

  ChangedStatusBuy(id: string, status:string): Observable<any> {
   

    this.GetCountBuyStatus();
    var result = this._http.post<any>(this._CommonService._ConfigService.GetHostApi() + `BuyCustomer/CancelAdminBuyById?id=${id}&movementTypeItem=${status}`,null);
    result.subscribe((e) => {
     
      if (e.status) {
        this._listProduct = this._listProduct.filter(s => s.id != id);       
        this.LoadGroup();        
      }
  


    });

    return result;
  }

  GetAllCartStorage() {
    var list = window.localStorage.getItem("BuyList");
    if (list != null && list != undefined && list != "") {
      this._listBuyStorage = JSON.parse(list);
    }
    if (this._listBuyStorage == undefined) this._listBuyStorage = new Array<string>;

  }


  AddProductCart(idBuy: string) {

    var resultD = this.GetCartById(idBuy);

    if (resultD == null || resultD == undefined) {
      this._listBuyStorage.push(idBuy);
     
      window.localStorage.setItem("BuyList", JSON.stringify(this._listBuyStorage));

    }
  }

  RemoveCartById(id: string) {
    this.GetAllCartStorage();
    this._listBuyStorage = this._listBuyStorage.filter(r => r != id);
    alert("Remove");
    window.localStorage.setItem("BuyList", JSON.stringify(this._listBuyStorage));
  }

  GetCartById(id: string) {
    this.GetAllCartStorage();
    var exist = this._listBuyStorage.find(f => f == id);
    return exist;
  }





  BuyProduct(mode: boolean) {
    this.isBuyProduct = true;
  }




}

