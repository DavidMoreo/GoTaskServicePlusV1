import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";

import { ChatBotService } from "../../../Services/Chat/ChatBotService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { BtnBotMsg } from "../BtnBot/app.btn-bot";
import { GpsService } from "../../../Services/Common/Gopositioning";



@Component({
  standalone: true,
  selector: 'app-menu-phone',
  templateUrl: './app.menu-phone.component.html',
  styleUrls: ['app.menu-phone.css'],
  imports: [ LoadingComponent, FormsModule, BtnBotMsg]
})


export class MenuPhone implements OnInit, DoCheck {

  _configService: ConfigService;
  _titleService: Title;
  mode: boolean = true;
  classMode: string = "div-menu-phone-dafaul";

  constructor(private route: Router, chatBotService: ChatBotService, configService: ConfigService, private _cdRef: ChangeDetectorRef,private Gps: GpsService) {

    this._configService = configService;
  }
    ngDoCheck(): void {
      this.detectarNavegador();
    }
 

  ngOnInit(): void {
    if (this._titleService != undefined) this._titleService.setTitle('Mis Productos');

  }


  Route(routeValue: string) {

    this.route.navigate([routeValue]);
  }


  GpsLoad() {
   
    this.Gps.SetCordinates();
  }

  detectarNavegador() {

    if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && 'caches' in window) {
     
    } else {
     
      this.mode = false;
    }



    var esChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (esChrome) {
      this.classMode = "div-menu-phone";
      this._cdRef.detectChanges();
    } else {
      this.classMode = "div-menu-phone-dafaul";
      this._cdRef.detectChanges();
    }

  }


}
