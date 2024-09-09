import { Component, Host, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigLanguage } from "../../../Services/Common/LanguageService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ImgItem, tblProduct } from "../../../Models/Structure/tblProduct";






@Component({
  standalone: true,
  selector: 'app-item-product-add',
  templateUrl: 'app.product-item-product-add.component.html',
  styleUrls: ['app.product-item-product-add.css']

})


export class ItemProductAddUpdate implements OnInit {
  _valueSeacrh: string = "";
  _configLanguage: ConfigLanguage
  _productService: ProductItemService
  _configservice: ConfigService;
  /*  _language: Array<Language>;*/

  @Input() product: tblProduct = new tblProduct();
  @Input() distance: string = "";


  constructor(private route: Router, _language: ConfigLanguage, productItemService: ProductItemService, configservice: ConfigService) {
    this._configLanguage = _language;
    this._productService = productItemService;
    this._configservice = configservice;
    this._productService._product.firsImg.url = "logo.png";
  }
  ngOnInit(): void {
    this._productService._product = this.product;

    this._configLanguage.getLanguage("-item-product-product").then(result => {
      /*  this._language = result;*/

    })

    //var r = new Language();
    //r.key = "Name";
    //r.value = "Nombre";
    //this._language.push(r);
  }

  ImgError() {


  }


  GetUrl(imgName: ImgItem,mode:string) {
    var urL = this._configservice.GetUrlImgItem(imgName,mode);
    return urL;

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


  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);

  }

  languageTraslate(value: string) {
    return value;
  }

  GetUrlImg(name: string, scaleFrom: string, scaleTo: string) {
    var host = this._configservice.GetHostApi();
    var url = "";
    var productUrl = "Files/product/";
    var logo = "Files/product/";

    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl + name.replace("PC", scaleTo);

    return url;
  }

}
