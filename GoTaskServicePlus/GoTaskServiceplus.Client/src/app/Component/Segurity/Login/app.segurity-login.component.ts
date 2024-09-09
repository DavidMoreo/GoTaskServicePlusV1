import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { style } from "@angular/animations";
import { Router } from "@angular/router";


import { FormsModule } from "@angular/forms";
import { LoginSevice } from "../../../Services/Segurity/Login/LoginService";
import { RegisterService } from "../../../Services/Segurity/Register/RegisterService";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { LocalStorageService } from "../../../Services/Common/LocalStorageService";
import { AlertService } from "../../../Services/Common/AlertService";



@Component({
  standalone: true,
  selector: 'app.segurity-loging',
  templateUrl: './app.segurity-login.component.html',
  styleUrls: ['app.segurity-login.css']  ,
  imports: [   LoadingComponent, FormsModule]
})
export class LoginComponent implements OnInit {

  modeLoginRegister: boolean = false;
  private _login: LoginSevice;
  public loginData: LoginUser = new LoginUser();
  _userRegister: RegisterService ;
  _route: Router;
  eyePassword: string = "password";
  constructor(private login: LoginSevice, private Alert: AlertService, private route: Router, private _cdRef: ChangeDetectorRef, private _StorageService: LocalStorageService) {
    this._login = login;
    this._route = this.route;
  }
    ngOnInit(): void {
      this.Alert.Alert("Si no estás registrado te invitamos a hacerlo, solo requiere un número de celular para recibir el código de verificación y nada más.", "blue", 500000);
    }




  changedLogin() {
   
    this._login.getLogin(this.loginData.email, this.loginData.password);
   
  }

  changedLogau() {
    this._StorageService.ClearKeyUser();     
  }


  public setRegister() {
    
  }

  languageTraslate(value:string) {
    return value;
  }
  changedEye(mode: string) {
    this.eyePassword = mode;
    this._cdRef.detectChanges();
  }

  searchProduct(routeValue: string) {
    this._route.navigate([routeValue]);
  }
}





class LoginUser {

  email: string = "";
  password: string = "";


}

function changedEye(value: any) {
    throw new Error("Function not implemented.");
}


