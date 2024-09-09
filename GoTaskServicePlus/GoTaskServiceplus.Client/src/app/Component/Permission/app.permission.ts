import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from "@angular/core";

import { Location } from '@angular/common';
import { ConfigService } from "../../Services/Common/ConfigService";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PermissionService } from "../../Services/Segurity/Login/PermissionService";
import { BtnBotMsg } from "../Common/BtnBot/app.btn-bot";
import { AlertComponent } from "../Common/Alert/app.common-alert";





@Component({
  standalone: true,
  selector: "app-permission",
  templateUrl: './app.permission-component.html',
  styleUrls: ['app.permission.css'],
  imports: [FormsModule, CommonModule, BtnBotMsg]


})

export class PermissionComponent implements OnInit {
/*  ;*/
  _router: Router;
  _visible: boolean = false;
  _Permission: PermissionService
  _cdRef: ChangeDetectorRef;

  @Input() enable: boolean = true;
  @Input() page: string;
  @Input() scrollName: string = "";

  @ContentChild("header") cardContentHeader: ElementRef;
  _location: Location;
  constructor(private location: Location, cdRef: ChangeDetectorRef, private router: Router, Permission: PermissionService, private _configservice: ConfigService) {

    this._location = location;
    this._router = router;
    this._Permission = Permission;
    this._cdRef = cdRef;
  }

  ngOnInit(): void {
    if (this.enable) {
      var status = this._Permission.ValidationLogin(this.page);
    
      this._visible = status;
      const currentUrl = this._location.path(); 
    } else {
      this._visible = true;
    }
   
  }


  Route(name: string) {
    
  }



}
