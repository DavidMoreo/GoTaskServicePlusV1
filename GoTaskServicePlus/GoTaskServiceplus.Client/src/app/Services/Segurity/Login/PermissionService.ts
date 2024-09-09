import { Injectable, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { ResponseHttp } from '../../../Models/Common/Response';
import { Login, StatusLogim } from '../../../Models/Segurity/Login/LoginModel';
import { ConfigService } from '../../Common/ConfigService';
import { Router } from '@angular/router';
import { LoginSevice } from './LoginService';
import { HttpClientService } from '../../Common/HttpService';
import { ConceptService } from '../../Product/Concept/ConceptService';
import { CounterUser } from '../../../Models/Common/CounterUser';
import CryptoJS from "crypto-js";
import { Permission, tblRol } from '../../../Models/Segurity/Register/RegisterModel';
import { UtilitiService } from '../../Common/UtilitisService';
import { RegisterService } from '../Register/RegisterService';
import { CommonService } from '../../Common/CommonService';



@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  counter: number = 0;
  _configservice: ConfigService
  _route: Router;
  _statusLoging: boolean;
  _login: LoginSevice;
  _http: HttpClient;
  rolActive: tblRol;

  public secretKey() { return 'miClaveSecreta' }
  constructor(private _CommonService: CommonService, private http: HttpClient, private route: Router, login: LoginSevice, _configservice: ConfigService, private _util: UtilitiService,  private Register: RegisterService) {
    this._configservice = _configservice;
    this._route = route;
    this._login = login;
    this._http = http;
  }



  public ValidationStatusLogin() {
   var keyActive = this._configservice.ValidationLogin();
    return keyActive;
  }



  public ValidationLogin(page: string, mode: boolean = true) {
    this.Register.ValidateUserActive();

  

    if (mode) {

      try {       
        var keyActive = false;
        if (page != "*") keyActive = this._configservice.ValidationLogin();

        this.ActionKey(keyActive);

        if (!keyActive) return false;

        var rol = this._configservice.GetRols();

        var isPublic = this.IsPublic(page);
        //alert("isPublic :"+ isPublic);
        if (isPublic) return true;

        var adminRol = this.IsAdmin(rol);
     /*   alert("adminRol :" + adminRol);*/
        if (adminRol) return true;

        var vendorVendor = this.IsVendor(rol, page);
        /*alert("vendorMarker :" + vendorVendor);*/
        if (vendorVendor) return true;


        var vendorMarker = this.IsMarker(rol, page);
        //alert("vendorMarker :" + vendorMarker);
        if (vendorMarker) return true;

        var vendorCustomer = this.IsCustomer(rol, page);
        /*  alert("vendorCustomer :" + vendorCustomer);*/
        if (vendorCustomer) return true;

       this._CommonService._AlertService.Alert("Su rol actualmente no tiene autorizacion para esta funcción");

        this.RedirectPage(page);

        return false;
      } catch (e) {
        //alert("error");
        this._configservice.DeleteBeareLogin();
        this.route.navigate(["/login"]);
      }

      this.route.navigate(["/login"]);

      return false;
    }

    return true;
  }


  ActionKey(keyActive: boolean) {

    if (!keyActive) {     
      this._configservice.DeleteBeareLogin();
      this.route.navigate(["/login"]);
    }

  }


  IsAdmin(rols: Array<tblRol>) {
    var status = false;
    var exist = rols.find(s => s.isAdmin);

    status = exist != null;
    return status;
  }

  IsPublic(page: string) {
    if (page == "*") return true;
    return false;
  }

  IsVendor(rols: Array<tblRol>, page: string) {
    var exist = rols.filter(s => s.isVendor && s.permissionByRoll.page == page && s.permissionByRoll.read);
    return (exist != null && exist.length > 0);
  }

  IsMarker(rols: Array<tblRol>, page: string) {
    var exist = rols.filter(s => s.isMaker && s.permissionByRoll.page == page && s.permissionByRoll.read);
    return (exist != null && exist.length > 0);
  }

  IsCustomer(rols: Array<tblRol>, page: string) {
    var exist = rols.filter(s => s.isCustomer && s.permissionByRoll.page == page && s.permissionByRoll.read);
    return (exist != null && exist.length > 0);
  }


  RedirectPage(page: string) {
    this.route.navigate(["/home-menu"]);
  }


  alertMsg(msg: string, status: string) {
    this._util.alertMsg(this.languageTraslate(msg));
  }


  languageTraslate(value: string) {
    return value;
  }

}

