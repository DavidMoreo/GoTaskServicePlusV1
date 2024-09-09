import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { TypeConcepValue, tblConcepValue, tblProduct } from '../../Models/Structure/tblProduct';
import { GridCustomService } from '../Common/CustomControl/GridCustomService';
import { ConceptService } from '../Product/Concept/ConceptService';



@Injectable({
  providedIn: 'root'
})



export class VendorProductService {

  _http: HttpClient;
  _Configservice: ConfigService;
  
  listProduct: Array<tblProduct>;
  _statusList: Array<tblConcepValue> = new Array<tblConcepValue>();
  product: tblProduct;
  rowSeletion: string;
  loadingStatus: boolean=false;

  constructor(private http: HttpClient, private Configservice: ConfigService, private _Concept: ConceptService) {
    this._Configservice = Configservice;
    this._http = http;
  }


  public UpdateProduct(product: tblProduct): Observable<any> {
    var url = "Product/UpdateProduct";

    var result = this._http.post<any>(this._Configservice.GetHostApi() + url, product);
    result.subscribe((e) => {
    
      var product = e.data;
   
      this.listProduct.forEach((p) => {
        if (product.id == p.id) {
          p.isPublic = product.isPublic;
          p.status = product.status;
        }

        this.SetLoading(false);
      })

    });
    return result;
  }






  GetAllProduct(filter: string, type: string, page: number): Observable<any> {
    this.listProduct = new Array<tblProduct>;

    var result = this._http.get<any>(this._Configservice.GetHostApi() + `Product/GetProductByProject?filter=${filter}&type=${type}&page=${page}`);
    result.subscribe((e) => {
      this.listProduct = e.data;
      if (this.listProduct == undefined) this.listProduct = new Array<tblProduct>;
    });

    return result;
  }

  GetProductById(id: string): Observable<any> {
    var result = this._http.get<any>(this._Configservice.GetHostApi() + `Product/GetProductById?id=${id}`);
    return result;
  }


  GetListStatusConcept() {
    var type = TypeConcepValue.StatusProductConcept();
    var result = this._Concept.GetListByName("ALL", type, 0);

    result.subscribe(
      (e) => {
        this._statusList = e.data;
       
      }

    );

  }

  GetUrl(imgName: string) {
    return this._Configservice.GetUrlImg(imgName, "PHONE");
  }


  SetLoading(mode: boolean) {
    this.loadingStatus = mode;
  }
  

}

