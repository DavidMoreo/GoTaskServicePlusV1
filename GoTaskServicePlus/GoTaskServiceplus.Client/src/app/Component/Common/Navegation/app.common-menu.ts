import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../Services/Common/ConfigService';
import { LoginSevice } from '../../../Services/Segurity/Login/LoginService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotLoginComponent } from '../NotLogin/app.not-login';
import { SearchProductService } from '../../../Services/Product/Search/SeaarchProductService';
import { LoadingServiceControl } from '../../../Services/Common/LoadingService';
import { CommonService } from '../../../Services/Common/CommonService';




@Component({

  selector: 'app-common-menu',
  templateUrl: './app.common-menu.component.html',
  styleUrls: ['app.common-menu.css']

})
export class NavMenuComponent implements OnInit, DoCheck {


  valueSeacrh: string = "";
  isExpanded = false;
  filter: string = "all";
  page: number = 0;

  _search: SearchProductService;
  _login: LoginSevice;
  private _cdRef: ChangeDetectorRef;
  _loading: LoadingServiceControl
  clean: string;
  @ViewChild('imputSearch') imputSearch: ElementRef;

  @Input() search: Function;
  constructor(private _CommonService: CommonService, private route: Router, search: SearchProductService, login: LoginSevice, cdRef: ChangeDetectorRef, loading: LoadingServiceControl) {

    this._search = search;
    this._login = login;
    this._cdRef = cdRef;
    this._loading = loading;
  }

  ngDoCheck(): void {
    
    // console.log(this._LoginStatus);
  }


  ngOnInit(): void {
    this.ValidateLogin();
  }

  GetNameProject() {
    var project = this._CommonService._StorageService.GetProject();  
    var user = this._CommonService._StorageService.GetIUser();
   
    if (project != undefined && project != null && project!="") return project;
    return "Go Task Service";
  }
  GetNameUser() {
    var user = this._CommonService._StorageService.GetNameUser();
/*    console.log("user", user);*/
    if (user != undefined && user != null) return user;
    return "";
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle(mode: boolean = false) {
    this.isExpanded = mode;
  }

  toggleCloseSession() {
    this.isExpanded = !this.isExpanded;
    this.CloseSession();
  }

  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);
  }

  searchProductValue(routeValue: string) {

  /*  this._loading.Loading(true);*/

    let search = "";
    if (this.filter != "") {
      this.filter.split(" ").forEach((e) => {
        if (e != "") search += e + "-";
      })

      this.imputSearch.nativeElement.value = "";

      this.route.navigate([routeValue + "/" + search]);
    } else {

    }
    this.filter = "";
  }

  OnchangeInputSearch(event: any) {
    this.filter = event.target.value;
    this.clean = "";
    this._cdRef.detectChanges();
  }

  CloseSession() {  
    var status = this._CommonService._ConfigService.DeleteBeareLogin();
 
    if (status)this._CommonService._NavMenuService.StatusLogin(false);   
  }


  ValidateLogin() {
    var status = this._CommonService._ConfigService.ValidationLogin();

    this._CommonService._NavMenuService.StatusLogin(status);
  }


  Search() {
    this._search.GetAllProduct(this.filter,  this.page);
  }


  GetStatusLogin() {
  
        return this._CommonService._NavMenuService.GetStatusLogin();

  }
   



}
