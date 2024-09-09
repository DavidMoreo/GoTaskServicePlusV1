import { Component, OnChanges, OnInit, SecurityContext, SimpleChanges } from "@angular/core";

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { tblUser } from "../../../Models/Segurity/Register/RegisterModel";
import { ConfigService } from "../../../Services/Common/ConfigService";





@Component({
  standalone: true,
  selector: "app-segurity-register",
  templateUrl: './app.segurity-register.component.html',
  styleUrls: ['app.segurity-register.css'],
    imports: [ FormsModule]
})
export class Register implements OnInit {
  _map: string = '';
  urlSafe: SafeResourceUrl;
  _mapActive: boolean = false;
  _page: number = 0;
  _user: tblUser = new tblUser();

  _configservice: ConfigService;
  baseApi: string;
  _visibleItem: number = 0;
  public _route: Router;
  constructor(configservice: ConfigService, public sanitizer: DomSanitizer, private route: Router) {
    this._configservice = configservice;
    this.baseApi = this._configservice.GetHostApi();
    this._route = this.route;
     
    this.sanitizerMode();
  }
  ngOnInit(): void {

  }

  sanitizerMode(): void {
    try {
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizer.sanitize(SecurityContext.URL, this._map.split('"',)[1]) + "");

    } catch (e) { }
  }

  changeMap() {
    if (!this._map.search("iframe")) { this._map = ""; this._mapActive = false; }
    else {
      this._mapActive = true;
    }
    this.sanitizerMode();
  }


  save() {
   
    this._page++;
  }

}
