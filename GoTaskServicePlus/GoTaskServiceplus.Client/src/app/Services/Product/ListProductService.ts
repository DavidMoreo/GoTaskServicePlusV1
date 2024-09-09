import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { tblProduct } from '../../Models/Structure/tblProduct';



@Injectable({
  providedIn: 'root'
})



export class ListpartialProductService {

  _http: HttpClient;
  _host: ConfigService;
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }


  GetAllProduct( type: string): Observable<any> {
    type = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    var result = this._http.get<any>(this._host.GetHostApi() +`Product/GetProducByPartial?type=${type}`);
    return result;
  }




}

