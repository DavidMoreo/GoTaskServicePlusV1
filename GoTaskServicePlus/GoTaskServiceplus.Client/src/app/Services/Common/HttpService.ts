import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigService } from './ConfigService';
import { IHttp } from '../../Interfases/Common/IHttp';
import { Observable, map, observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { LoginSevice } from '../Segurity/Login/LoginService';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements IHttp {

  _baseUrl: string;
  Beare: string;
  secretKey: string = 'miClaveSecreta';



  constructor(private http: HttpClient, private _host: ConfigService) {
    this._baseUrl = this._host.GetHostApi();
 
  }

  public getHttpData(route: string): Observable<any> {
    var status = this._host.ValidationLogin();
    if (status) {
      let option = this.Header();
      var rerult = this.http.get<any>(this._baseUrl + route);
      return rerult;
    }
    return  new Observable();
  }


  public getHttp(route: string): Observable<any> {
    const header = { Accept: "video/mp4" };
    var rerult = this.http.get<any>(this._baseUrl + route,
      {
        reportProgress: true,
        observe: 'events',
        headers: header
      });
    return rerult;
  }

  public getFileHttp(route: string): Observable<any> {
    /*  var rerult = this.http.get<Blob>(this._baseUrl + route,);*/
    const header = { Accept: "video/mp4" };
    var result = this.http.get(this._host.GetHostApi() + route, {


      reportProgress: true,
      observe: 'events',
      responseType: 'blob' as 'json',
      headers: header

    })

    return result;
  }



  public postHttp(route: string, body: any): Observable<any> {
   
    var rerult = this.http.post<ResponseHttp>(this._baseUrl + route, body, {
      headers: this.Header()
    });

    return rerult;
  }

  public postHttpAny(route: string, body: any): Observable<any> {

    var rerult = this.http.post<ResponseHttp>(this._baseUrl + route, body);

    return rerult;
  }

  /*  headers: this.Header("multipart/form-data")*/


  public postFromDataHttp(route: string, body: FormData): Observable<ResponseHttp> {
  
    var rerult = this.http.post<ResponseHttp>(this._baseUrl + route, body, { headers: this.Header("multipart/form-data") });

    return rerult;
  }


  public putHttp(route: string, body: string): Observable<ResponseHttp> {
    var rerult = this.http.put<ResponseHttp>(this._baseUrl + route, body);
    return rerult;
  }

  public deleteHttp(route: string, id: string): Observable<ResponseHttp> {
    var rerult = this.http.delete<ResponseHttp>(this._baseUrl + route + "?id=" + id).subscribe(

      (e) => {
        console.log("prom",e);
        return e;
      } 
    );

    return new Observable<ResponseHttp>();
  }


  public getConvertJson(value: string) {
    var result = JSON.parse(value);
    return result;
  }

  public postHttpBeare(route: string): Observable<any> {
    var rerult = this.http.post<ResponseHttp>(this._baseUrl + route, {
      headers: this.Header()
    });
    rerult.subscribe(console.log);

    return rerult;
  }


  private Header(type: string = 'application / json') {
    var log = window.localStorage.getItem("key");
    this.Beare = log != null ? log : "";


    const headers1 = new HttpHeaders({
      "Authorization": this.Beare,
      "Content-Type": "application/json"
    })



    const headers = new HttpHeaders({
      Authorization: this.Beare

    });
    // headers = new HttpHeaders().set( 'Authorization', "Bearer "+this.Beare.toString() );

    return headers1;
  }








}

