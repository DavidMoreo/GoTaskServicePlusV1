import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../../Models/Common/Response';
import { ConceptCategory, NameConcept, tblConcepValue, tblProduct } from '../../../Models/Structure/tblProduct';
import { HttpClientService } from '../../Common/HttpService';
import { LoadingServiceControl } from '../../Common/LoadingService';



@Injectable({
  providedIn: 'root'
})



export class SearchProductService {

  _http: HttpClient;
  _host: ConfigService;
  listCategory: Array<ConceptCategory>;

  _listProduct: Array<tblProduct> = new Array<tblProduct>;
  _statust: boolean = false;
  _listProductIA: Array<tblProduct> = new Array<tblProduct>;
  _statustIA: boolean = false;
  _loading: LoadingServiceControl;
  pageActive: number = 1;
  pageTotal: number = 0;
  pageActiveIA: number = 1;
  pageTotalIA: number = 1;
  listBotAvailable: boolean = false;
  public isBotActive: boolean = false;
  loadingPageGo: boolean = false;
  lisConceptCategory: Array<ConceptCategory> = new Array<ConceptCategory>();

  filterTemp: string;

  private type ="00000000-0000-0000-0000-000000000000";

  counHttp: number = 0;
  limitHttp: number = 10;

  constructor(private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl) {
    this._host = host;
    this._http = http;
    this._loading = loading;
  }


  GetAllProduct(filter: string, page: number): Observable<any> {
    this.filterTemp = filter;
    this.loadingPageGo = true;
   
    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetProductByName?filter=${filter}&typeId=${this.type}&page=${page}`);

    try {

      /*      this.isBotActive = false;*/
      result.subscribe({

        next: (e) => {

          if (this._listProduct == undefined || this._listProduct == null || this._listProduct.length <= 0) {
            this._listProduct = e.data;
          }
          else {
            var temp = new Array();
            temp = e.data;
            temp.forEach((e) => {
              this._listProduct.push(e);
            })

          }

          //if (e.data != null && e.data.length <= 0)
          //  this._loading.Loading(false);

          this.pageTotal = e.pages;
          this.loadingPageGo = false;


          this._statust = true;

          //if (this._listProduct.length <= 0) {
          //  this.isBotActive = true;
          //} else {
           
          //}

          this._loading.Loading(false);
          this.pageActive++;
          this.pageActiveIA++;
         
        }
        ,
        error: (error) => {
          this.ReloadHttp();
        }
      });

      return result;

    } catch (e) {
      this._loading.Loading(false);
      this._statust = true;
      return new Observable<any>;
    }

  }

  GetAllProductIA(filter: string, page: number): Observable<any> {
    

    this.loadingPageGo = true;
    this._loading._loadingPartial = false;
    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetProductByNameIA?filter=${filter}&type=${this.type}&page=${page}`);
    //result.subscribe({

    //  next: (e) => {

    //    if (this._listProductIA == undefined || this._listProductIA == null || this._listProductIA.length <= 0) {
    //      this._listProductIA = e.data;
    //    }
    //    else {
    //      var temp = new Array();
    //      temp = e.data;
    //      temp.forEach((e) => {
    //        this._listProductIA.push(e);
    //      })

    //    }

    //    this.loadingPageGo = false;
    //    this.pageTotal = e.pages;

    //    if (this._listProductIA.length <= 0) {
    //      this.isBotActive = false;
    //    }

    //    this._loading.Loading(false);
    //    this._loading._loadingPartial = true;
    //    if (this._listProductIA != null && this._listProductIA.length > 0) this.listBotAvailable = true;



    //    this.limitHttp = 0;

    //  },
    //  error: (error) => {
    //    this.ReloadHttp();
    //  }




    //});
    return result;
  }


  SetTypeProduct(type: string) {
    this.type = type;
    this.filterTemp = "all";
    this.isBotActive = false;

    this.FilterProduct();
  }


  SetType(type: string) {
    this.type = type;
    this.filterTemp = "all";
  }

  GetType() {
    return this.type;
   
  }


  GetAllCategory(): Observable<any> {
  
    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetAllCategoryList`);

    try {
      result.subscribe({

        next: (e) => {

          this.lisConceptCategory = e.data;

          },
        error: (error) => {
          this.ReloadHttp();
        }
      });

      return result;

    } catch (e) {
      this._loading.Loading(false);
      this._statust = true;
      return new Observable<any>;
    }

  }


  ReloadModel() {

    this._listProductIA = new Array<tblProduct>();
    this._listProduct = new Array<tblProduct>();
    this.pageActive = 0;
    this.pageActiveIA = 0;

  }

  FilterProduct() {
    this.ReloadModel();
    if (this.isBotActive) {
      this.GetAllProductIA(this.filterTemp,  this.pageActiveIA);
    } else {
      this.GetAllProduct(this.filterTemp,  this.pageActiveIA);
    }
  }




  async ReloadHttp() {
    this.counHttp++;
    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {
        clearInterval(timer);

        if (this.isBotActive) {
          this.GetAllProductIA(this.filterTemp,  this.pageActiveIA);
        } else {
          this.GetAllProduct(this.filterTemp,  this.pageActiveIA);
        }
      }, (10000 + (this.counHttp * 100)))
    }

  }


}

