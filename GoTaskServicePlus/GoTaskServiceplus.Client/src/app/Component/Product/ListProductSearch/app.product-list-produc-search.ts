import { ChangeDetectorRef, Component, HostListener, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { ItemProductView } from "../ProductItem/app.product-item-product";
import { Title } from "@angular/platform-browser";
import { tblConcepValue, tblProduct } from "../../../Models/Structure/tblProduct";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { LoadingPartialComponent } from "../../Common/LoadingPartial/app.common-loading-partial";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { AlertBuyProductComponent } from "../../Common/AlertBuyProduct/app.alert-buy-product";
import { MenuPhone } from "../../Common/MenuPhone/app.menu-phone";
import { ItemRowProductView } from "../ProductItemRow/app.product-item-row-product";
import { GpsService } from "../../../Services/Common/Gopositioning";
import { Coordinates } from "../../../Models/Common/Coordinates";
import { float } from "html2canvas/dist/types/css/property-descriptors/float";
import { AlertService } from "../../../Services/Common/AlertService";
import { CommonService } from "../../../Services/Common/CommonService";
import { ScrollCategory } from "../ScrollCategory/app.common-scroll-category.component";
import { CartService } from "../../../Services/Customer/CartService";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";



@Component({
  standalone: true,
  selector: 'app-product-list-product-search',
  templateUrl: './app.product-list-product-search.component.html',
  styleUrls: ['app.product-list-product-search.css'],
  imports: [ItemProductView, LoadingComponent, LoadingPartialComponent, FormsModule, AlertBuyProductComponent, MenuPhone, ItemRowProductView, ScrollCategory]
})


export class ListProductSearch implements OnInit {

  filter: string = "all";


 
  _titleService: Title;
  _param: ActivatedRoute;
  _search: SearchProductService;
  _Permission: PermissionService;

  _loading: LoadingServiceControl;
  isBot: boolean = false;
  counHttp: number = 0;
  limitHttp: number = 3;

  menuVidible: boolean = false;
  _Gps: GpsService;
  private _cdRef: ChangeDetectorRef;
  constructor(private permission: PermissionService, private _FavoriteService: FavoriteService, private _Cart: CartService, private route: Router, titleService: Title, param: ActivatedRoute, search: SearchProductService, loading: LoadingServiceControl, cdRef: ChangeDetectorRef, Permission: PermissionService, Gps: GpsService, private Alert: AlertService, private _CommonService: CommonService) {
    this._param = param;
    this._titleService = titleService;
    this._search = search;
    this._loading = loading;
    this._cdRef = cdRef;
    this._Permission = Permission;
    this._Gps = Gps;
  }
  ngOnInit(): void {
    if (this.permission.ValidationStatusLogin()) {
      this._FavoriteService.LoadFavorite();
      this._Cart.LoadCart();
    }

      this._param.params.subscribe((param: Params) => {
        this.filter = param["filter"];       
      this._search._listProduct = new Array();
      this._search._listProductIA = new Array();
      this.SearchAll();
    });

  }

  async loadData() {
    
  }

  

  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);
  }

  async Search(page: number) {
  
   /* this.ReloadHttp();*/
    this._search.GetAllProduct(this.filter, page);
  }

  async FilterCategory(value: string) {
   
   await this._search.SetTypeProduct(value);
    
  }

  GetTypeCategory() {
    return this._search.GetType();
  }


  async SearchIA(page: number) {
   /* this.ReloadHttp();*/
    this._search.GetAllProductIA(this.filter, page);
  }


  async SearchAll() {
    this.ReloadHttp();
   /* this._search.SetType(this._CommonService._UtilitiService.GuidEmpty())*/
    //if (this.filter.replace("-", "") != "all")
    //  this._search.GetAllProductIA(this.filter, 1);
      
    this._search.GetAllProduct(this.filter,  1);

  }

  SetIsBot(mode: boolean) {
    this._search.isBotActive = mode;
  }

  MenuVisible(mode: boolean) {
    this.menuVidible = mode;
    this._search.listBotAvailable = false;
    this._cdRef.detectChanges();
  }

  PageGo() { 

    if (!this._search.isBotActive) {
      if (this._search.pageActive > this._search.pageTotal && this._search.pageTotal > 100) {
        this._search.pageActive = 1;
       
      }

      if (this._search.pageActive <= this._search.pageTotal) {

        this.Search(this._search.pageActive);
      /*  this._search.pageActive++;*/
      }
      else {
        this._CommonService._AlertService.Alert("Fin");
      }


    } else

    if (this._search.isBotActive) {
      if (this._search.pageActiveIA > this._search.pageTotalIA && this._search.pageTotalIA > 100) {
        this._search.pageActiveIA = 1;
     
      }

      if (this._search.pageActiveIA <= this._search.pageTotalIA) {
       
        this.SearchIA(this._search.pageActiveIA);
      /*  this._search.pageActiveIA++;*/
      } else {
        this._CommonService._AlertService.Alert("Fin");
      }

    }

  }







  GetDistanceProduct(concepts: tblConcepValue) {

   
    if (concepts == null || concepts == undefined ) return "";

    var concept = concepts;
    2
    if (concept == null || concept == undefined) return "";
    if (concept.value == null || concept.value == undefined) return "";

    var coordinates = concept.value;

    if (!coordinates.includes("lat")) return "";
    if (!coordinates.includes("lng")) return "";

    var gpsLat = coordinates.split(",")[0];
    var gpsLng = coordinates.split(",")[1];

    var gpsLatNumber = Number.parseFloat(gpsLat.replace("lat:", ""));
    var gpsLngNumber = Number.parseFloat(gpsLng.replace("lng:", ""));



    var cordinates = new Coordinates();
   
    var distance = this._Gps.GetDistance(gpsLatNumber, gpsLngNumber);
   
    return distance.toString();

  }








  onScroll(event: any) {
    console.log(event.target.offsetHeight + event.target.scrollTop);
    //al/*ert();*/
    //if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //  console.log("End");
    //}
  }


  GetListNullIA() {
    if ((this._search._listProductIA == undefined ))
      return (this.counHttp <= this.limitHttp) ? true : false;
    return false;
  }

  GetListNull() {
    if ((this._search._listProduct == undefined ))
      return (this.counHttp <= this.limitHttp) ? true : false;
    return false;
  }



  async ReloadHttp() {
    this.counHttp++; 
    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {
        clearInterval(timer);
        if (this.GetListNull()) if (!this._search.isBotActive) this.Search(this._search.pageActive);
        if (this.GetListNullIA()) if (this._search.isBotActive) this.SearchIA(this._search.pageActiveIA);
      }, (10000 + (this.counHttp * 100)))
    }

  }


  GetStatusFilterCity(){ return this._CommonService._CityFilterFilterService.GetStatusFilterCity(); }

  ActionVisibleCityFilter(mode:boolean) {
    this._CommonService._CityFilterFilterService.ActiveMode(mode, false, mode);
    /*this._search.FilterProduct();*/
  }


}




