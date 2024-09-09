import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { ItemProductView } from "../ProductItem/app.product-item-product";
import { ListpartialProductService } from "../../../Services/Product/ListProductService";
import { tblConcepValue, tblProduct } from "../../../Models/Structure/tblProduct";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { AlertBuyProductComponent } from "../../Common/AlertBuyProduct/app.alert-buy-product";
import { AlertBuyProductService } from "../../../Services/Customer/AlertBuyProductService";
import { Coordinates } from "../../../Models/Common/Coordinates";
import { GpsService } from "../../../Services/Common/Gopositioning";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";
import { CartService } from "../../../Services/Customer/CartService";
import { CommonService } from "../../../Services/Common/CommonService";



@Component({
  standalone: true,
  selector: 'app-product-list-product',
  templateUrl: './app.product-list-product.component.html',
  styleUrls: ['app.product-list-product.css'],
  imports: [ItemProductView, LoadingComponent, FormsModule, AlertBuyProductComponent]
})


export class ListProduct implements OnInit {

  _loading: LoadingServiceControl;
  _AlertBuyService: AlertBuyProductService;

  valueSeacrh: string = "";
  _service: ListpartialProductService;
  _listProduct: Array<tblProduct> = new Array<tblProduct>;
  counHttp: number = 0;
  limitHttp: number = 4;
  constructor(private _FavoriteService: FavoriteService, private _Cart: CartService, private route: Router, service: ListpartialProductService, loading: LoadingServiceControl, AlertBuyService: AlertBuyProductService, private Gps: GpsService, private permission: PermissionService, private _CommonService: CommonService) {
    this._service = service;
    this._loading = loading;
    this._AlertBuyService = AlertBuyService;
  }

  ngOnInit(): void {
    if (this.permission.ValidationStatusLogin()) {
      this._FavoriteService.LoadFavorite();
      this._Cart.LoadCart();
    }
    this.GetAllProduct();
    this._loading.Loading(true);
    this.permission.ValidationLogin("list-product", false);
  }


  GetAllProduct() {
    this._loading.Loading(true);
    this._service.GetAllProduct("0").subscribe({
      next: (e) => {

        if (e.status) {
          this._listProduct = e.data;
          if (this._listProduct.length <= 0)
            this._CommonService._AlertService.Alert("Tu negocio no tiene productos a mostrar, de crear y publicar un nuevo producto.");
          this._loading.Loading(false);
        }
      },
      error: () => {
        this.ReloadHttp();
      }
    })
  }


  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);
  }


  ScrollOff() {
    const elemento = document.getElementById('scroll-list-product'); // Reemplaza 'tuElemento' con el ID de tu elemento HTML
    if (elemento != null) {

      elemento.classList.remove('scroll-container');

    }
  }


  GetListNull() {
    if (this._listProduct == undefined || this._listProduct.length <= 0) return true;

    return false;
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

    var distance = this.Gps.GetDistance(gpsLatNumber, gpsLngNumber);

    return distance.toString();

  }




  async ReloadHttp() {
    this.counHttp++;
    this._loading._text = " Reintentando " + this.counHttp;
    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {
        console.log("Reintentando");
        if (this._listProduct == undefined || this._listProduct.length <= 0) {
          clearInterval(timer);
         this.GetAllProduct();
        }
        else
          clearInterval(timer);
      }, (9000 + (this.counHttp * 100)))
    }

  }



}
