import { Component, OnInit, SimpleChanges } from "@angular/core";

import { Inject } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { ConfigService } from "../../Services/Common/ConfigService";
import { ControInfo } from "../Common/ScrollInfo/app.common-scroll-info.component";
import { ListProduct } from "../Product/ListProduct/app.product-list-product";
import { LoadingServiceControl } from "../../Services/Common/LoadingService";
import { LoadingComponent } from "../Common/Loading/app.common-loading";
import { Router } from "@angular/router";
import { PermissionComponent } from "../Permission/app.permission";
import { HttpClient } from "@angular/common/http";
import { CounterUser } from "../../Models/Common/CounterUser";
import { PermissionService } from "../../Services/Segurity/Login/PermissionService";
import { UtilitiService } from "../../Services/Common/UtilitisService";
import { MenuPhone } from "../Common/MenuPhone/app.menu-phone";
import { ListpartialProductService } from "../../Services/Product/ListProductService";
import { SignalRService } from "../../Services/HubService/Hub";





@Component({
  standalone:true,
  selector: "app-home-home",
  templateUrl: './app.home-home-component.html',
  styleUrls: ['app.home-home.css'],
  imports: [ControInfo, ListProduct, LoadingComponent, PermissionComponent, MenuPhone]


})

export class HomeComponent implements OnInit {
  _configservice: ConfigService;
  _loading: LoadingServiceControl;
  _http: HttpClient;
  _visibleItem: number = 0;
  _route: Router;
  _Permission: PermissionService;
  _Uitil: UtilitiService
  _ProductPartial: ListpartialProductService;
  constructor(configservice: ConfigService, loading: LoadingServiceControl, private route: Router, private http: HttpClient, Permission: PermissionService, Uitil: UtilitiService, _ProductPartial: ListpartialProductService, private hub:SignalRService) {
    this._configservice = configservice;
    this._loading = loading;
    this._route = route;
    this._http = http;
    this._Permission = Permission;
    this._Uitil = Uitil;
    this._ProductPartial = _ProductPartial;
  }

  ngOnInit(): void {
    this.Load();
    this.loadAr();
  }


 async loadAr() {
  /*  this.hub.startConnection();*/
    //this.hub.addReceiveMessageListener((message: string) => {
    //  console.log("Mensaje recibido desde el servidor:", message);
    //  // Aquí puedes realizar cualquier acción con el mensaje recibido
    //});
  }

  async Load() {
   await this._ProductPartial.GetAllProduct("0");
    this._Uitil.scrollToBottom("scrollAuto");
    const count = interval(7000);
    count.subscribe(item => {
      this._visibleItem++;
    });       
  }

  GetVisible(number: Number): boolean {

    if (this._visibleItem > 2) this._visibleItem = 0;
    
    return this._visibleItem === number;

  }

  
 public intervalSlider(): void {

  }

  searchProduct(routeValue: string) {
    this._route.navigate([routeValue]);
  }




  async scrollToBottom(Byid: string, scroll: number = 0) {
    // Espera 1000 milisegundos (1 segundo)
    await new Promise(resolve => setTimeout(resolve, 500));
    const container = document.getElementById(Byid);
    if (container) {
      container.scrollTo({
        top: (scroll == 0 ? (container.scrollHeight + container.scrollHeight) : scroll),
        behavior: 'smooth'
      });
    }

  }



}
