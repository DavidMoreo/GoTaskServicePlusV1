import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ImgItem, tblProduct } from '../../Models/Structure/tblProduct';
import { UtilitiService } from '../Common/UtilitisService';



@Injectable({
  providedIn: 'root'
})



export class ProductItemService  {

  _http: HttpClient;
  _configservice: ConfigService;
  _listFavorites: Array<string> = new Array<string>;
  _util: UtilitiService;

  public _product: tblProduct = new tblProduct();

  constructor(private http: HttpClient, private host: ConfigService, util: UtilitiService) {
    this._configservice = host;
    this._http = http;
    this._util = util;
  }


  GetProjectById(id: string): Observable<any> {
    var result = this._http.get<any>(this._configservice.GetHostApi() + `Project/GetMobilNumberByProject?id=${id}`);
  
    return result;
  }


  GetCompanyById(id: string): Observable<any> {
    var result = this._http.get<any>(this._configservice.GetHostApi() + `Company/GetCompanyById?id=${id}`);
    return result;
  }



  FavoriteAdd(id: string) {
   
    var result = this.GetFavorite(id);
    var exist = result.find(s => s == id);
 
    if (result == null || result == undefined || exist == null) {
      this._listFavorites.push(id);
  
      this._util.SetLocalStorage("favorites", JSON.stringify(this._listFavorites));
    }
   

  }

  FavoriteRemove(id: string) {
    
    this._listFavorites = this._listFavorites.filter(r => r != id);
    this._util.SetLocalStorage("favorites", JSON.stringify(this._listFavorites));
  }

  GetFavorite(id: string) {
   
    var list = this._util.GetLocalStorage("favorites");
   

    if (list != null && list != undefined && list !="") {
     
      this._listFavorites = JSON.parse(list);
      var exist = this._listFavorites.find(f => f == id);
     
    } 
    return this._listFavorites;
  }


  GetAllFavorite() {

    var list = this._util.GetLocalStorage("favorites");
      this._listFavorites = JSON.parse(list);
    return this._listFavorites;
  }



}

