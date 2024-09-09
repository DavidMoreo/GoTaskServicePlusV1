import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';


import { ConfigService } from '../../Common/ConfigService';
import { tblRol, tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { tblCompany, tblProject } from '../../../Models/Admin/Admin';




@Injectable({
  providedIn: 'root'
})



export class UserService {

  _http: HttpClient;
  _host: ConfigService;
  public _listUser: Array<tblUser>;
  public _listCompanyFilter: Array<tblCompany>;
  public _listProjectFilter: Array<tblProject>;
  public _listCompany: Array<tblCompany>;
  public _listProject: Array<tblProject>;
  public listRolUser: Array<tblRol> = new Array<tblRol>;
  public user: tblUser = new tblUser;
  public rowSelection: string ="";
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  public Saved(project: tblUser): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    var result = this._http.post<any>(this._host.GetHostApi() + "User/SaveUser", project);

    return result;
  }

  public Upbdate(user: tblUser): Observable<any> {
  
    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    var result = this._http.post<any>(this._host.GetHostApi() + "User/UpdateUser", user);

    return result;
  }

  public Delete(id: string): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + "User/DeleteUser" + "?id=" + id);
    return result;
  }

  GetAll(filter: string, page: number): Observable<any> {
    this._listUser = new Array<tblUser>;
    var result = this._http.get<any>(this._host.GetHostApi() + `Project/GetAllProject?filter=${filter}&page=${page}`);
    result.subscribe((e) => {
      this._listUser = e.data;

    });
    return result;
  }

  GetById(id: string): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `User/GetUserById?id=${id}`);
    return result;
  }


  GetRolsByProject(filter: string, page: number): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Rol/GetAllRol?page=${page}&filter=${filter}`);
    result.subscribe((e) => {
      console.log("Geyt Rol ", e.data);
      this.listRolUser = e.data;    
      console.log("Geyt Rol 2", this.listRolUser);
    }
    );
    return result;
  }



  GetAllUserByProject(filter:string,idProject: string, page: number): Observable<any> {
  
  
    var result = this._http.get<any>(this._host.GetHostApi() + `User/GetAllUserByProject?filter=${filter}&idProject=${idProject}&page=${page}`);
  
    return result;
  }
  

  GetAllCompany(filter: string, page: number): Observable<any> {

    var result = this._http.get<any>(this._host.GetHostApi() + `Company/GetAllCompanyAdmin?filter=${filter}&page=${page}`);

    return result;
  }

  GetAllProject(filter: string, idCompany:string,page: number): Observable<any> {
 
    var result = this._http.get<any>(this._host.GetHostApi() + `Project/GetAllProjectAdmin?filter=${filter}&idCompany=${idCompany}&page=${page}`);

    return result;
  }




}

