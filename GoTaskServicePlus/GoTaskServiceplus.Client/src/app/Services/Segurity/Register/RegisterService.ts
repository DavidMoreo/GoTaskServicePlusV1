import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ILogin } from '../../../Interfases/Sgurity/Login/ILogin';
import { ConfigService } from '../../Common/ConfigService';
import { tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { HttpClientService } from '../../Common/HttpService';
import { UtilitiService } from '../../Common/UtilitisService';
import { LoginSevice } from '../Login/LoginService';
import { CommonService } from '../../Common/CommonService';
import { LocalStorageService } from '../../Common/LocalStorageService';
import { CityFilterFilterService } from '../../Common/CityFilterService';
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class RegisterService  {

  _baseUrl: string;
  _service: HttpClientService;


  constructor(private http: HttpClient, private _Route: Router, service: HttpClientService, private _CommonService: CommonService) {
    this._service = service;
  }

  public getLogin(email: string, password: string): Observable<any> {
    return new Observable<any>();
  }

  public Save(user: tblUser): Observable<any> {
    var result = this._service.postHttp("Register/SaveRegister", user);
    return result;
  }


  public async SetIdUser() {

    var id = this._CommonService._StorageService.GetIUser();

    if (id == undefined || id == null || id == "") {
      var result = this.http.get(this._CommonService._ConfigService.GetHostApi() + "Register/GetIdUSer");
      result.subscribe({
        next: (d: any) => {
          this._CommonService._StorageService.SetIUser(d.data);
          this._Route.navigate(["/home"]);
        },
        error: (er) => {
          alert(er);
        }

      });
    }
  }





  public ValidateUserActive() {

    var loginStatus = this._CommonService._ConfigService.ValidationLogin();
   
    if (loginStatus) return true;

    var existId = this._CommonService._StorageService.GetIUser();
    if (existId == "") this._CommonService._CityFilterFilterService.ActiveMode(true, true, true);

    return false;
  }





}



