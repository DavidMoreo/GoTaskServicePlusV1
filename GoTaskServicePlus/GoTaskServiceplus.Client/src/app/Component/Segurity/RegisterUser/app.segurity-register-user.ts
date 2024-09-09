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





@Component({
  standalone: true,
  selector: "app-segurity-register-user",
  templateUrl: './app.segurity-register-user.component.html',
  styleUrls: ['app.segurity-register-user.css'],
  imports: [FormsModule]
})
export class RegisterUser implements OnInit {

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


  constructor(configservice: ConfigService, private _ComonService :CommonService, private route: Router, service: RegisterService, private _Key: KeyVerificationService, private _Encrypt: EncryptService) {
    this._configservice = configservice;
    this._service = service;
    this._route = this.route;

  }
  ngOnInit(): void {

  }


  save() {
    this._ComonService._AlertService.Alert("Espere un momento");
    this._service.Save(this._user).subscribe((e) => {
      //   this._ComonService._AlertService.Alert("Completado ");
      if (e.status) {
        this.route.navigate(["/login"]);      
      }
      for (var i = 0; i < e.msg.length; i++) {
        this._ComonService._AlertService.Alert(e.msg[i].msg);
      }
    });
  }


  async SetCodeVerification() {
    if (this._user.email != "") {
      var result = await this._Key.GetKeyVerification(this._user.email.toString());
      result.subscribe({
        next: (e) => {
          this.codeVerification = this._Encrypt.KeyDesCrypt(e.data);
          this._ComonService._AlertService.Alert("El código fue enviado al número " + this._user.email);

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
    this._user.keyPassword = key;
    this._user.password = key;
  }


  Validation() {




    if (this._user.conceptCompany == undefined) this._user.conceptCompany = new NameConcept();
    if (this._user.conceptProject == undefined) this._user.conceptProject = new NameConcept();
    if (this._user.conceptPrevious == undefined) this._user.conceptPrevious = new NameConcept();
    if (this._user.rolUserActive == undefined) this._user.rolUserActive = new tblRol();

    if (this._user.rolUserActive.conceptCompany == undefined) this._user.rolUserActive.conceptCompany = new NameConcept();
    if (this._user.rolUserActive.conceptPrevious == undefined) this._user.rolUserActive.conceptPrevious = new NameConcept();
    if (this._user.rolUserActive.conceptProject == undefined) this._user.rolUserActive.conceptProject = new NameConcept();

    if (this._user.rolUser == undefined) this._user.rolUser = new Array<tblRol>();

    if (this._user.password == this._user.keyPassword && this._user.password.trim() != "")
      if (this.codeVerification.toUpperCase() == this.codeVerificationInput.toUpperCase())
        this.save();
      else this._ComonService._AlertService.Alert("Código no válido");
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
    if (this._user.password != this._user.keyPassword) return false;
    if (this._user.password.trim() == "") return false;
    if (this._user.keyPassword.trim() == "") return false;

    return true;

  }

  CetcodeVerificationInput() {

    console.log(0);
    if (!this.ValidationCode()) return false;
    console.log(1);
    if (!this.ValidationNumber()) return false;
    console.log(3);
    if (this.codeVerificationInput == "") return false;
    console.log(4);
    if (this.codeVerification == "") return false;
    console.log(5);
    return true;
  }

}
