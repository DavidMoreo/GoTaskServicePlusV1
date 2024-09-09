import { Component, OnChanges, OnInit, SecurityContext, SimpleChanges } from "@angular/core";

import { Inject } from '@angular/core';
import { interval } from 'rxjs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tblRol, tblUser } from "../../../Models/Segurity/Register/RegisterModel";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { FormsModule } from "@angular/forms";
import { RegisterService } from "../../../Services/Segurity/Register/RegisterService";
import { NameConcept } from "../../../Models/Structure/tblProduct";
import { KeyVerificationService } from "../../../Services/Segurity/KeyVerificationService";
import { EncryptService } from "../../../Services/Common/EncryptService ";
import { transformOrigin } from "html2canvas/dist/types/css/property-descriptors/transform-origin";
import { CommonService } from "../../../Services/Common/CommonService";
import { LoginSevice } from "../../../Services/Segurity/Login/LoginService";
import { ChangePassword } from "../../../Models/Segurity/Login/LoginModel";





@Component({
  standalone: true,
  selector: "app-segurity-changed-password-user",
  templateUrl: './app.segurity-changed-password-user.component.html',
  styleUrls: ['app.segurity-changed-password-user.css'],
  imports: [FormsModule]
})
export class ChangedPasswordUser implements OnInit {

  _map: string = '';
  urlSafe: SafeResourceUrl;
  _mapActive: boolean = false;
  _page: number = 0;
  _user: tblUser = new tblUser();
  codeVerification: string = "";
  codeVerificationInput: string = "";

  _configservice: ConfigService;
  baseApi: string;
  _visibleItem: number = 0;
  _service: RegisterService;
  public _route: Router;


  constructor(private _LoginSevice: LoginSevice,   configservice: ConfigService, private _ComonService: CommonService, private route: Router, service: RegisterService, private _Key: KeyVerificationService, private _Encrypt: EncryptService) {
    this._configservice = configservice;
    this._service = service;
    this._route = this.route;

  }
  ngOnInit(): void {

  }


  save() {
    this._ComonService._AlertService.Alert("Espere un momento");

    var changed = new ChangePassword();
    changed.code = this.codeVerificationInput;
    changed.password = this._user.password;
    changed.email = this._user.email;

    var response = this._LoginSevice.GetChangedPassword(changed);
    
  }


  async SetCodeVerification() {
    if (this._user.email != "") {
      var result = await this._LoginSevice.GetKeyVerification(this._user.email.toString());
      result.subscribe({
        next: (e) => {        
          this._ComonService._AlertService.Alert(e.msg +" "+ this._user.email);

          /*   this._loading.Loading(false);*/
        },
        error: (error) => {
          /*this._loading.Loading(false);*/
        }

      });
    }
  }


  GenerateKey() {
    var key = this._Encrypt.GenerateKey();
    this._user.password = key;
  }


  Validation() {
    if (this.codeVerificationInput != "" && this._user.password.trim() != "")     
        this.save();
    else this._ComonService._AlertService.Alert("Clave requerida");

   
  }



  ValidationNumber() {
    if (this._user.email == null) return false;
    if (this._user.email == undefined) return false;
    if (this._user.email == "") return false;
    if (this._user.email.length < 10) return false;

    return true;
  }



  ValidationCode() {
    if (!this.ValidationNumber()) return false;
    if (this._user.password.trim() == "") return false;
    if (this._user.password.length<8) return false;
   

    return true;

  }

  CodeVerificationInput() {
    if (!this.ValidationCode()) return false;
    if (!this.ValidationNumber()) return false;
    if (this.codeVerificationInput == "") return false;
    if (this.codeVerificationInput.length<4 ) return false;


    return true;
  }

}
