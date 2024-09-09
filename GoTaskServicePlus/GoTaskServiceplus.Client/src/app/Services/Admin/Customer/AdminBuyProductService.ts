import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingServiceControl } from '../../Common/LoadingService';
import { tblProduct } from '../../../Models/Structure/tblProduct';
import { UtilitiService } from '../../Common/UtilitisService';
import { ConfigService } from '../../Common/ConfigService';
import { MovementType,  tblBuyerCustomer, tblBuyerCustomerConcept } from '../../../Models/Structure/tblBuyerCustomer';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})



export class AdminBuyProductService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _listProduct: Array<tblBuyerCustomer>;
  _listBuyGroupByIdBuy: Array<string> = new Array<string>;
  _listBuyStorageTemp: Array<string>;
  _listBuyStorage: Array<string>;
  _loading: LoadingServiceControl;
  isBuyProduct: boolean = false;
  stausBuy: string = "";
  _movementType: MovementType = new MovementType();
  buy = new tblBuyerCustomerConcept();
  rowSeletion: string;
  constructor(private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl) {
    this._host = host;
    this._http = http;
    this._loading = loading;
  }


  GetAllBuyStatusAdmin(movementTypeItem: string, idProject: string ): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.GetAllCartStorage();
    var list = this._listBuyStorageTemp;
    /*    alert(movementTypeItem);*/

    var result = this._http.get<any>(this._host.GetHostApi() + `BuyCustomer/GetAllBuyStatusAdmin?idProject=${idProject}&movementTypeItem=${movementTypeItem}&page=0`);
    result.subscribe((e) => {

      this._listProduct = e.data;

      this.LoadGroup();
      this._loading.Loading(false);

    });

    return result;
  }




  GetAllBuyStatus(movementTypeItem: string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.GetAllCartStorage();
    var list = this._listBuyStorageTemp;
    /*    alert(movementTypeItem);*/
 
    var result = this._http.get<any>(this._host.GetHostApi() + `BuyCustomer/GetAllBuyStatus?movementTypeItem=${movementTypeItem}&page=0`);
    result.subscribe((e) => {
     
      this._listProduct = e.data;

      this.LoadGroup();
      this._loading.Loading(false);

    });

    return result;
  }


  LoadGroup() {
    this._listBuyGroupByIdBuy = new Array<string>;
    if (this._listProduct != null) {
      this._listProduct.forEach((p) => {
        var exist = this._listBuyGroupByIdBuy.find(s => s == p.purchareId);
        if (exist == null || exist == undefined) {
          this._listBuyGroupByIdBuy.push(p.purchareId);
         
        }
      });
    }
  }


  Delete(id: string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

 
    var result = this._http.delete<any>(this._host.GetHostApi() + `BuyCustomer/DeleteAdminBuyCustomer?id=${id}`, { headers: headers1 });
    result.subscribe((e) => {
      this._loading.Loading(false);
   
      if (e.status) {
        this.GetAllBuyStatus(this.stausBuy);
     
        this._listProduct = this._listProduct.filter(s => s.id != id);
        /*  this.RemoveCartById(id);*/
      }


    });

    return result;
  }





  ChangedStatusBuy(id: string, status:string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })


    var result = this._http.post<any>(this._host.GetHostApi() + `BuyCustomer/CancelAdminBuyById?id=${id}&movementTypeItem=${status}`, { headers: headers1 });
    result.subscribe((e) => {
      this._listBuyGroupByIdBuy = new Array<string>;

      if (e.status) {      
        this._listProduct = this._listProduct.filter(s => s.id != id);
        this.LoadGroup();      
      }
  
      this._loading.Loading(false);


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

