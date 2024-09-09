import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginSevice } from '../Segurity/Login/LoginService';
import { publicIp } from 'public-ip';
import { NameConcept } from '../../Models/Structure/tblProduct';
import { CommonService } from './CommonService';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor, OnInit {

  _route: Router;
  _Login: LoginSevice;
  ip: string;
  filterRules: Array<string>;
  constructor(private router: Router, Login: LoginSevice, private _CommonService: CommonService) {
    this._route = router;
    this._Login = Login;

  }
    ngOnInit(): void {     
     
    }

  async load() {
    try {

      if (this.ip == undefined || this.ip == "" || this.ip == null) {
        this.ip = this._CommonService._StorageService.GetIP();
       // console.log("IP storage", this.ip);
        if (this.ip == undefined || this.ip == "" || this.ip == null) {
          this.ip = await publicIp();
          this._CommonService._StorageService.SetIP(this.ip);
         // console.log("IP guardada", this.ip);
        } else {
        // console.log("IP storage disponible", this.ip);
        }
      }
   
    } catch (e) {
      console.log("Error ip", e);
    }

    var data = this._CommonService._CityFilterFilterService.GetListFilterCity();

    this.filterRules = data.map((e) => {
      return e.id;
    })

   /* console.log("Ip Public",await publicIp()); // Falls back to IPv4*/
    //=> 'fe80::200:f8ff:fe21:67cf'

    //console.log("Ip Public 6" , await publicIpv6());
    ////=> 'fe80::200:f8ff:fe21:67cf'

    //console.log("Ip Public 4",await publicIpv4());
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.load();
 
    let requestClone = req;

    var key = this._CommonService._StorageService.GetKeyUser();

   
   
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    console.log("Enviando ip ", this.ip);

    if (key != null && key != undefined) {
      requestClone = req.clone(
        {
          headers: req.headers.set("Authorization", key != null ? key : "")
            .set("X-Client-IP", this.ip != undefined ? this.ip : "")
            .set("X-Filter-Rules", JSON.stringify(this.filterRules))
        }
      );


    }
    if (key == undefined || key == null || key == undefined || key == "") {
      //this.router.navigate(["login"]);
      //alert("sesion terminada");
    }

    var result = next.handle(requestClone)
      .pipe(

        catchError((error: HttpErrorResponse) => {

          let errorMessage = '';
          if (error.status == 401) {
            this._CommonService._StorageService.ClearKeyUser();
            this.router.navigate(["login"]);
          }

          if (error.error instanceof ErrorEvent) {
            //Error del cliente
             errorMessage = `error intercep cliente: ${error.error.message}`;
          } else {
             //Error del servidor
              errorMessage = `error intercep servidor: ${error.status}\nMessage: ${error.message}`;
          }
          /* console.error(errorMessage);*/
          return throwError(errorMessage);
        })

      );

    return result;

  }



}

