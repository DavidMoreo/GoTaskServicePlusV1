import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';


import { HttpClientService } from '../../Common/HttpService';
import { ResponseHttp } from '../../../Models/Common/Response';
import { ConfigService } from '../../Common/ConfigService';


@Injectable({
  providedIn: 'root'
})
export class DowloadService {


  constructor(private http: HttpClientService, private _host: ConfigService) {

    this._host = this._host;
  }

  public GetVideo(url: string): Observable<HttpResponse<Blob>> {

   var result =  this.http.getFileHttp("DowLoaderVideo?url=" + url)
    

    //var result = this.http.get(this._host.GetHostApi() + "DowLoaderVideo?url=" + url, {
    //  responseType: 'blob',
    //  observe: 'response',

    //}).pipe(
    //  map((res: any) => {
    //    return res.body;// new Blob([res.body], { type: "application/octet-stream" });
       
    //  })
    //);
      

    return result;
   
  }

  public GetVideoInfo(url: string): Observable<any> {

    var result = this.http.getHttp("GetInfoVideo?url=" + url);
  
    return result;

  }

  public GetDowloadVideoUrl(url: string): Observable<any> {
    var result = this.http.getHttp("DowLoaderVideoUrl?url="+url);
    return result;
  }

  public GetDowloadVideoPartial(url: string): Observable<any> {
    var result = this.http.getFileHttp("DowLoaderVideoPartial?url=" + url);
    return result;
  }

  public GetDowloadVInfo(url: string): Observable<any> {
    var result = this.http.getHttp("DowLoaderVideoPartial?url=" + url);
    return result;
  }

  public GetStreamAsList(id: string): Observable<any> {
    var result = this.http.getHttp("GetStreamAsList?id=" + id +"&restart=false");
    return result;
  }


  public GetResponseHttp(data: HttpResponse<ResponseHttp>): any {

    let dataString = JSON.stringify(data);
    let dataModel = JSON.parse(dataString);
    let returnModel = JSON.parse(dataModel.json);
   // console.log("returnModel", returnModel);
    return returnModel;
  }

}

