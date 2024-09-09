import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginSevice } from "../Services/Segurity/Login/LoginService";

Injectable({
  providedIn: 'root'

})

export class GuardActivate implements CanActivate {
  _login: LoginSevice;
  _router: Router;

  constructor(private authService: LoginSevice, private router: Router) {
    this._login = authService;
    this._router = router;
  }

  canActivate(): boolean {
 //   if (false) {
 //     return true;
 //   } else {
 ///*     alert("ss");*/
 //   /*  this._router.navigate(['login']);*/
 //     return false;
    //   }

    this._router.navigate(['login']);
        return false;
  }

}
