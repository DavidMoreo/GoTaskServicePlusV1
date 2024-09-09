import { ChangeDetectorRef, Component, Host, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigLanguage } from "../../../Services/Common/LanguageService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ConceptProduct, ImgItem, tblProduct } from "../../../Models/Structure/tblProduct";
import { LoginSevice } from "../../../Services/Segurity/Login/LoginService";
import { CartService } from "../../../Services/Customer/CartService";
import { AlertBuyProductService } from "../../../Services/Customer/AlertBuyProductService";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { util } from "@tensorflow/tfjs";
import { ShareService } from "../../../Services/Common/ShareApi";
import { HtmlToImgService } from "../../../Services/Common/HtmlToImg";
import { ShareControlService } from "../../../Services/Common/ShareControlService";
import { CommonModule } from "@angular/common";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";






@Component({
  standalone: true,
  selector: 'app-item-row-product',
  templateUrl: 'app.product-item-row-product.component.html',
  styleUrls: ['app.product-item-row-product.css'],
  imports: [CommonModule]

})


export class ItemRowProductView implements OnInit {
  _valueSeacrh: string = "";
  _configLanguage: ConfigLanguage
  _configservice: ConfigService;
  _loginSevice: LoginSevice;
  _ProductItemService: ProductItemService;
  _CartService: CartService;
  _AlertBuyService: AlertBuyProductService;
 
  _HtmlToImgService: HtmlToImgService;
  Share: ShareService;  



  @Input() product: tblProduct = new tblProduct();
  @Input() isPhone: boolean = true;
  @Input() distance: string = "";  
  constructor( private _Cart: CartService, private _FavoriteService: FavoriteService, private route: Router, _language: ConfigLanguage, configservice: ConfigService, ProductItemService: ProductItemService, CartService: CartService, AlertBuyService: AlertBuyProductService, private _util: UtilitiService, _ShareService: ShareService, private _HtmlToImg: HtmlToImgService, _HtmlToImgService: HtmlToImgService, private _ShareControler: ShareControlService, private _cdRef: ChangeDetectorRef) {
    this._configLanguage = _language;
    this._configservice = configservice;
    this._ProductItemService = ProductItemService;
    this._CartService = CartService;
    this._HtmlToImgService = _HtmlToImgService;
    this._AlertBuyService = AlertBuyService;
    this.Share = _ShareService;
    this._FavoriteService = _FavoriteService;

  }
  ngOnInit(): void {
    
    this.Mode();  
  }

  ImgError() {

  }





  ShareProduct(product: tblProduct, url:string) {
    this._ShareControler.GetFileBase64(product,url);
  }

  Route(routeValue: string) {  
    this.route.navigate([routeValue]);
  }


  IsFavorite(id: string) {

    var result = this._FavoriteService._favoritesList.filter(f => f.id == id);
    var exist = result.length > 0;

    // console.log("isfavo", result);
    if ((result != null && result != undefined) && exist) {
      return true;
    } else {
      return false;
    }

  }



  IsBuyCart(id: string) {

    // Pendiente

    if (this._CartService._listProductCart) {
      var exist = this._CartService._listProductCart.filter(f => f.idProduct == id);
      if (exist != null && exist.length > 0) {
        return true;
      }
    }
    return false;
   
    

  }



  FavoriteAdd(product: tblProduct) {

    this._FavoriteService.AddProductFavorite(product);

  }

  CartBuyAdd(product: tblProduct) {    
    this._CartService.AddProductCart(product);
  }

  FavoriteRemove(id: string) {
    this._FavoriteService.RemoveFavoriteById(id);

  }

  CartRemove(product: tblProduct) {
    this._CartService.RemoveCartById(product.id);
  }


  SentWhatsapp(idCompany: string) {

    this._ProductItemService._product

    //"https://api.whatsapp.com/send?phone=573228095355&text="
  }





  GetProjectId(id: string, product: tblProduct) {

    var result = this._ProductItemService.GetProjectById(id);


    result.subscribe((e) => {
      if (e.status) {
        console.log(e.data);
        var url = "https://api.whatsapp.com/send?phone=57" + e.data.mobileNumber + "&text=Me interesa este producto: " + product.name;
        window.open(url, '_blank');
      }

    });
    //(e) => {
    //  alert(e.status);
    //  console.log(e.data.mobileNumber);
    //  /* this._cdRef.detectChanges();*/
    //}


  }



  GetTicket(mode: string) {  
    if (this.product.availableDay != undefined && this.product.availableDay != null) {
      if (this.product.availableDay.name.trim().toLowerCase().includes(mode.trim().toLowerCase())) {
        return this.product.availableDay.name.toUpperCase();
      }
    }
    return "";
  }

  SelctProduct(productSelect: tblProduct) {
    var name = "";

    productSelect.name.split(" ").forEach((e) => {
      if (e != "") name += e + (e != "" ? "-" : "");
    })
    this.Route("select-product/" + productSelect.idTypeOfProduct + "/" + name + "/" + productSelect.id)
  }


  GetUrlProduct(productSelect: tblProduct) {
    var name = "";

    productSelect.name.split(" ").forEach((e) => {
      if (e != "") name += e + (e != "" ? "-" : "");
    })
    return this._configservice.GetBaseUrl()+"select-product/" + productSelect.idTypeOfProduct+ "/" + productSelect.id;
  }



  GetUrlImg(image: ImgItem, scaleTo: string) {   
    var url = this._configservice.GetUrlImgItem(image, scaleTo);

    var imgt = document.getElementById("img");
    if (imgt != null) imgt.setAttribute("src", url);
    return url;
  }

  GeNameConcepVista(value: any) {

    if (value != null && value != undefined) {

      return value.value;
    }
    else
      return "";
  }

  GeNameConcepNumberVista(value: any) {

    if (value != null && value != undefined) {

      return value.value;
    }
    else
      return 0;
  }

  IsService(product: tblProduct) {

    if (product.isProduct) return true;
    if (!product.isProduct) {
      if (product.actualPrice > 0)
        return true;
    }
    return false;
  }


  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);

  }

  languageTraslate(value: string) {
    return value;
  }


  // Verificar si se está ejecutando en un dispositivo móvil
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  Mode() {
    // Uso
    //if (this.isMobileDevice()) {
    //  this.isPhone = true;
    //  if (this._cdRef!=null) this._cdRef.detectChanges();
    //  //lert("La página se está ejecutando en un dispositivo móvil.");
    //} else {
    //  this.isPhone = false;
    //  //alert("La página no se está ejecutando en un dispositivo móvil.");
    //  if (this._cdRef != null) this._cdRef.detectChanges();
    //}
  }

}




