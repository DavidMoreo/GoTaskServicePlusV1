import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../../Models/Common/Response';
import { ChangePassword, Login, StatusLogim } from '../../../Models/Segurity/Login/LoginModel';
import { ConfigService } from '../../Common/ConfigService';
import { Router } from '@angular/router';
import { HttpClientService } from "../../Common/HttpService";

import { CommonService } from '../../Common/CommonService';
import { UtilitiService } from '../../Common/UtilitisService';
import { NavMenuService } from '../../Common/NavMenuService';
import { LocalStorageService } from '../../Common/LocalStorageService';
import { EncryptService } from '../../Common/EncryptService ';
import { AlertService } from '../../Common/AlertService';
import { HttpClient } from '@angular/common/http';
import { tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { ChangedPasswordUser } from '../../../Component/Segurity/ChangedPassword/app.segurity-changed-password-user';



@Injectable({
  providedIn: 'root'
})
export class LoginSevice {


  _route: Router;
  _http: HttpClientService;
  _host: ConfigService;

  constructor(private _AlertService: AlertService, private httpClient: HttpClient, private http: HttpClientService, private Nav: NavMenuService, private route: Router, private _StorageService: LocalStorageService, private _EncryptService: EncryptService, private _Alert: AlertService, private _ConfigService: ConfigService) {
    this._route = route;
    this._http = http;
  }

  public GetStatus(): boolean {

    return true;
  }


  public getLogin(email: string, password: string) {
    var obj: Login = new Login();
    const body = { Email: email, Password: password };

    var response = this.http.postHttp("Login/loging", body);


    response.subscribe(result => {


      if (result.msg && result.msg != "") this._Alert.Alert(result.msg);

      this.SavedStatusLogin(result.data.keyLogin);
      this.SavedRol(result.rols);     
      this._StorageService.SetProject(result.data.nameProject);
      this._StorageService.SetNameUser(result.data.nameUser);


      if (result.data.keyLogin != undefined) {
        this.route.navigate(["home-menu"]);
        this.Nav.StatusLogin(true);
      } else {

        this.Nav.StatusLogin(false);
      }

    });

    return response;
  }


  public SavedStatusLogin(keyLogin: string) {
    this._StorageService.SetKeyUser(keyLogin);
  }

  public SavedRol(value: string) {
    this._StorageService.SetRol(JSON.stringify(value));
  }


  //SetStorage(name: string, value: string) {
  //  var key = this._EncryptService.encryptData(value);
  //  window.localStorage.setItem(name, key);
  //}

  //public DeleteStorage(value: string) {
  //  var storge = window.localStorage.removeItem(value);
  //}


  async GetKeyVerification(number: string): Promise<Observable<any>> {

    const body = { number: number };

    var response = this.httpClient.get(this._ConfigService.GetHostApi() + "Login/ChangeKeyPassword?number=" + number);
    return response;

  }

  async GetChangedPassword(item: ChangePassword): Promise<Observable<any>> {

    var response = this.httpClient.post(this._ConfigService.GetHostApi() + "Login/ChangePassword", item);
    response.subscribe((e: any) => {
      this._AlertService.Alert("Completado ");
      if (e.msg!="") this._AlertService.Alert(e.msg);
      this.route.navigate(["login"]);
      
    });
    return response;

  }

}

