import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ConceptProduct, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { UtilitiService } from '../Common/UtilitisService';
import { ListProduct } from '../../Component/Product/ListProduct/app.product-list-product';
import { LoadingServiceControl } from '../Common/LoadingService';
import { tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';




@Injectable({
  providedIn: 'root'
})



export class ListBuyService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _listProduct: Array<tblBuyerCustomer>;
  _listBuyStorageTemp: Array<string>;
  _listBuyGroupByIdBuy: Array<string> = new Array<string>;
  _loading: LoadingServiceControl;
  isBuyProduct: boolean = false;
  limitHttp: number = 10;
  counHttp: number = 0;

  constructor(private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl) {
    this._host = host;
    this._http = http;
    this._loading = loading;
  }


  async GetAllProduct(page: number): Promise<Observable<any>> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.ReloadHttp();
    await this.GetAllCartStorage();

    this._listBuyGroupByIdBuy = new Array<string>;
    var result = this._http.post<any>(this._host.GetHostApi() + `BuyCustomer/GetAllBuyCustomer?page=${page}`,null);
    result.subscribe({


      next: (e) => {

        this._loading.Loading(false);
        if (e.status) {
          this._listProduct = e.data;
          console.log("All", this._listProduct.map(s => s.purchareId));        

        }
      },
      error: (error) => {
        this._loading.Loading(false);
      }




    });

    return result;
  }

  CancelBuy(id: string): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })


    var result = this._http.post<any>(this._host.GetHostApi() + `BuyCustomer/CancelBuyById?id=${id}&movementTypeItem=Compra cancelada por cliente`, { headers: headers1 });
    result.subscribe((e) => {


      if (e.status) {
        console.log(e.status);
        this._listProduct = this._listProduct.filter(s => s.id != id);
        this.LoadGroup();
        this._loading.Loading(false);
        this.RemoveBuyById(id);
        //this.GetAllProduct(0);
      }


    });

    return result;
  }


  LoadGroup() {
    this._listBuyGroupByIdBuy = new Array<string>;
    this._listProduct.forEach((p) => {
      var exist = this._listBuyGroupByIdBuy.find(s => s == p.purchareId);
      if (exist == null || exist == undefined) {
        this._listBuyGroupByIdBuy.push(p.purchareId);

      }
    });
  }


  ClearCacheBuy() {
    this.GetAllCartStorage();

    if (this._listBuyStorageTemp != null && this._listBuyStorageTemp != undefined) {
      this._listBuyStorageTemp.forEach((p) => {
        var exist = this._listBuyGroupByIdBuy.find(s => s == p);
        if (exist == null || exist == undefined) {

          this.RemoveBuyById(p);
        }

      });
    }

  }



  GetAllCartStorage() {
    var list = window.localStorage.getItem("BuyList");
    if (list != null && list != undefined && list != "") {
      this._listBuyStorageTemp = JSON.parse(list);
    }
    if (this._listBuyStorageTemp == undefined) this._listBuyStorageTemp = new Array<string>;
  }

  RemoveBuyById(id: string) {

    this.GetAllCartStorage();
    this._listBuyStorageTemp = this._listBuyStorageTemp.filter(r => r != id);

    window.localStorage.setItem("BuyList", JSON.stringify(this._listBuyStorageTemp));
  }




  GetListNull(): boolean {
    this.counHttp++;
    if ((this._listProduct == undefined || this._listProduct == null) && (this.counHttp < this.limitHttp) && (this._listBuyStorageTemp != undefined && this._listBuyStorageTemp.length > 0))
      return true;



    return false;
  }



  BuyProduct(mode: boolean) {
    this.isBuyProduct = true;
  }

  async ReloadHttp() {
    this.counHttp++;
    console.log("ReloadHttp", this._listProduct);
    if (this.counHttp <= this.limitHttp && this.GetListNull()) {
      var timer = setInterval(() => {

        clearInterval(timer);
        if (this.GetListNull()) this.GetAllProduct(0);

      }, 10000)
    }

  }

}

