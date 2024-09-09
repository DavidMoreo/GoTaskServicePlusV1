import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { tblProduct } from '../../Models/Structure/tblProduct';
import { GridCustomService } from '../Common/CustomControl/GridCustomService';
import { CommonService } from '../Common/CommonService';
import { ReferService } from './ReferProduct';
import { NameAndId } from '../../Models/Common/CustomControl/InputTextModel';



@Injectable({
  providedIn: 'root'
})



export class ProductService {

  _http: HttpClient;
  _host: ConfigService;
  _listProduct: Array<tblProduct>;
  rowSeletion: string;
  product: tblProduct;
  constructor(private _ReferService: ReferService, private http: HttpClient, private host: ConfigService, private _CommonService: CommonService) {
    this._host = host;
    this._http = http;
  }

  public savedProduct(url: string, product: tblProduct): Observable<any> {


    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    var result = this._http.post<any>(this._host.GetHostApi() + url, product);

    return result;
  }

  public updateProduct(url: string, product: tblProduct): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("Update", product );
    var result = this._http.post<any>(this._host.GetHostApi() + url, product);

    return result;
  }

  deleteProduct(url: string, id: string): Observable<any> {  
   
    var result = this._http.delete<any>(this._host.GetHostApi() + url+ "?id=" +id);

  
    return result;
  }

  deleteImgByUrl(url: string, nameUrlImage: string, idProduct:string): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + url + "?url=" + nameUrlImage + "&idProduct=" + idProduct);


    return result;
  }

  saveAndUpdate(url: string, product: tblProduct): Observable<ResponseHttp> {

    let result = new Observable<ResponseHttp>();
   
   
    if (product.id != undefined && product.id != "00000000-0000-0000-0000-000000000000" && product.id.length == ("00000000-0000-0000-0000-000000000000").length)
      result = this.updateProduct(url, product);
    else     
        result = this.savedProduct(url, product);

    return result;

  }


  GetAllProduct(filter: string, type: string, page: number): Observable<any> {
    this._listProduct = new Array<tblProduct>;

    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetProductByProject?filter=${filter}&type=${type}&page=${page}`);
    result.subscribe((e) => {
      this._listProduct = e.data;
      if (this._listProduct == undefined) this._listProduct = new Array<tblProduct>;
      if (this._listProduct.length<=0)
      this._CommonService._AlertService.Alert("Tu negocio no tiene productos a mostrar, de crear y publicar un nuevo producto.");
    });
    this.GetAllReferByCompanyId();
  
    return result;
  }

  GetProductById(id: string): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetProductById?id=${id}`);
    return result;
  }

  GetAllReferByCompanyId() {
    this._ReferService.GetAllReferByCompanyId();
  }

  GetListReferProduct() {
   
    return this._ReferService.GetListRefer();
    
  }

}

