import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList, SimpleChanges } from "@angular/core";

import { Location } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ConfigService } from "../../../Services/Common/ConfigService";



@Component({
  standalone: true,
  selector: "app-not-login",
  templateUrl: './app.not-login-component.html',
  styleUrls: ['app.not-login.css'],
  imports: [FormsModule, CommonModule]


})

export class NotLoginComponent implements OnInit {
  _configservice: ConfigService;
  _router: Router;

  _isNotLlogin: boolean;

  @ContentChild("header") cardContentHeader: ElementRef;
  _location: Location;
  constructor(private location: Location,configservice: ConfigService, cdRef: ChangeDetectorRef, private router: Router) {
    this._configservice = configservice;
    this._location = location;

    this._router = router;
    /*    this._autenticate = autenticate;*/


  }

  ngOnInit(): void {
    var status = this._configservice.ValidationLogin();
    const currentUrl = this._location.path();
   
    if (!status) {
      this._isNotLlogin = false;
    
    } else {
      this._isNotLlogin = true;
    }
  }



  Route(name: string) {
    this._router.navigate([name]);
  }



}
