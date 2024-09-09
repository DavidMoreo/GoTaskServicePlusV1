import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../../Common/ConfigService';
import { Concept } from '../../../Models/Structure/tblProduct';
import { tblCompany } from '../../../Models/Admin/Admin';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})



export class CompanyService {

  _http: HttpClient;
  _host: ConfigService;
  _listCompany: Array<Concept>;
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  public Saved( company: tblCompany): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    var result = this._http.post<any>(this._host.GetHostApi() + "Company/SaveCompany", company);

    return result;
  }

  public Upbdate( company: tblCompany): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    var result = this._http.post<any>(this._host.GetHostApi() + "Company/UpdateCompany", company);

    return result;
  }

  public Delete(id: string): Observable<any> {
   
    var result = this._http.delete<any>(this._host.GetHostApi() + "Company/DeleteCompany"+ "?id=" +id);  
    return result;
  }

  GetAllCompanys(filter: string,  page: number): Observable<any> {
    this._listCompany = new Array<tblCompany>;
    var result = this._http.get<any>(this._host.GetHostApi() + `Company/GetAllCompanyAdmin?filter=${filter}&page=${page}`);
    ////result.subscribe((e) => {    
    ////  this._listCompany = e.data;

    ////});
    return result;
  }




  GetCompanyById(id: string): Observable<any> {
   
    var result = this._http.get<any>(this._host.GetHostApi() + `Company/GetCompanyById?id=${id}`);
    return result;
  }



}

