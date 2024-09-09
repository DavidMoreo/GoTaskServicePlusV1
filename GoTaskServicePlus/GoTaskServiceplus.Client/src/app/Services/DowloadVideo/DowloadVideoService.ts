import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { ConfigService } from '../Common/ConfigService';
import { ResponseHttp } from '../../Models/Common/Response';



@Injectable({
  providedIn: 'root'
})
export class DowloadService {

  _host: ConfigService;
  constructor(private http: HttpClient, private host: ConfigService) {

    this._host = host;
  }

  public GetVideo(url: string): Observable<Blob> {

    var result = this.http.get(this._host.GetHostApi() + "DowLoaderVideo?url=" + url, {
      responseType: 'blob',
      observe: 'response',

    }).pipe(
      map((res: any) => {
        return res.body;// new Blob([res.body], { type: "application/octet-stream" });
       
      })
    );
      
    return  result;

   
  }

  public GetVideoInfo(url: string): Observable<ResponseHttp> {

    var result = this.http.get<ResponseHttp>(this._host + "GetInfoVideo?url=" + url);
    console.log(result);
    return result;

  }




}

