import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';

import { tblCompany, tblProject } from '../../../Models/Admin/Admin';
import { ConfigService } from '../../Common/ConfigService';
import { tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { NameConcept } from '../../../Models/Structure/tblProduct';



@Injectable({
  providedIn: 'root'
})



export class ProjectMenuService {

  _http: HttpClient;
  _host: ConfigService;
  _listProject: Array<tblProject>;
  _listCompany: Array<tblCompany>;
  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  

  public UpbdateProjectActive(projectId: string, companyId: string
  ): Observable<any> {

    let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');


    var userId = new tblUser();
    userId.idCompany = companyId;
    userId.idProject = projectId;
    //console.log("User",userId);
    var result = this._http.post<any>(this._host.GetHostApi() + "User/UpdateProjectActive", userId  );
 
    return result;
  }


  private Header(type: string = 'application/json') {
    const headers1 = new HttpHeaders({  
      "Content-Type": type
    })
    return headers1;
  }


}

