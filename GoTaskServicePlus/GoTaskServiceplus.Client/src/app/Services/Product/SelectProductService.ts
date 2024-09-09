import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { tblProduct } from '../../Models/Structure/tblProduct';



@Injectable({
  providedIn: 'root'
})



export class SelectProductService {

  _http: HttpClient;
  _host: ConfigService;
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }


  GetProductById(id: string): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() +`Product/GetProductById?id=${id}`);
    return result;
  }




}

