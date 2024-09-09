import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';

import { tblCompany, tblProject } from '../../../Models/Admin/Admin';
import { ConfigService } from '../../Common/ConfigService';
import { tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { SearchFilter } from '../../../Models/Admin/SearchFilter';



@Injectable({
  providedIn: 'root'
})



export class ListSearchService {

  _http: HttpClient;
  _host: ConfigService;

  listSearchFilter: Array<SearchFilter> = new Array<SearchFilter>();
  listSearchFilterTemp: Array<SearchFilter> = new Array<SearchFilter>();
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  
  GetAllProduct(): Observable<any> {  

    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetListSearch`);

    result.subscribe((e) => {
      this.listSearchFilter = e.data;
      this.listSearchFilter.forEach((d) => {
      var exist =  this.listSearchFilterTemp.find(s => s.filter == d.filter);
        if (exist ==null)
         this.listSearchFilterTemp.push(d);
      });
    }
    );

    console.log(this.listSearchFilterTemp);
    return result;
  }




}

