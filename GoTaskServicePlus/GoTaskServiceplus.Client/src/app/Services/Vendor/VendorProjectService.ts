import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';
import { ConfigService } from '../Common/ConfigService';
import { tblCompany, tblProject } from '../../Models/Admin/Admin';
import { tblConcepValue } from '../../Models/Structure/tblProduct';




@Injectable({
  providedIn: 'root'
})



export class VendorProjectService {

  _http: HttpClient;
  _host: ConfigService;
  _project: tblProject = new tblProject();
  _listProject: Array<tblProject>;
  _listCompany: Array<tblCompany>;
  adressList: Array<tblConcepValue>;
  _rowSeletion: string;
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  public Saved(project: tblProject): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');
 
    var result = this._http.post<any>(this._host.GetHostApi() + "Project/SaveProject", project);

    return result;
  }

  public Upbdate(company: tblProject): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    var result = this._http.post<any>(this._host.GetHostApi() + "Project/UpdateProject", company);

    return result;
  }

  public Delete(id: string): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + "Project/DeleteProjectById" + "?id=" + id);
    return result;
  }

  GetAllProject(filter: string, page: number): Observable<any> {
    this._listProject = new Array<tblProject>;
    var result = this._http.get<any>(this._host.GetHostApi() + `Project/GetProjectById?idProject=00000000-0000-0000-0000-000000000000`);
    //result.subscribe((e) => {
    //  this._listProject = e.data;
    //});
    return result;
  }


  GetAllProjectByCompany(idCompany: string, page: number): Observable<any> {
    if (idCompany == "") idCompany = "00000000-0000-0000-0000-000000000000";
    this._listProject = new Array<tblProject>;
    var result = this._http.get<any>(this._host.GetHostApi() + `Project/GetAllProjectByCompany?id=${idCompany}&page=${page}`);
    result.subscribe((e) => {
      this._listProject = e.data;

    });
    return result;
  }


  GetListAdress(filter: string, type: string, page: number): Observable<any> {

    var response = this._http.get<any>(this._host.GetHostApi() + `Concept/GetAllConcept?filter=${filter}&type=${type}&page=${page}`);

    return response;
  }


  GetProjectById(id: string): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Project/GetProjectById?idProject=${id}`);
    return result;
  }


  GetAllCompanys(filter: string, page: number): Observable<any> {
    this._listCompany = new Array<tblCompany>;
    var result = this._http.get<any>(this._host.GetHostApi() + `Company/GetAllCompany?filter=${filter}&page=${page}`);
    ////result.subscribe((e) => {    
    ////  this._listCompany = e.data;

    ////});
    return result;
  }



}

