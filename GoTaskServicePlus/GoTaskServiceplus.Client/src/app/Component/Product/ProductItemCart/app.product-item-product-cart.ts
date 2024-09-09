import { Component, Host, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigLanguage } from "../../../Services/Common/LanguageService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ImgItem, tblProduct } from "../../../Models/Structure/tblProduct";
import { LoginSevice } from "../../../Services/Segurity/Login/LoginService";
import { CartService } from "../../../Services/Customer/CartService";
import { tblBuyerCustomer } from "../../../Models/Structure/tblBuyerCustomer";
import { CommonService } from "../../../Services/Common/CommonService";






@Component({
  standalone: true,
  selector: 'app-item-product-cart',
  templateUrl: 'app.product-item-product-cart.component.html',
  styleUrls: ['app.product-item-product-cart.css']

})


export class ItemCartComponet implements OnInit {
  _valueSeacrh: string = "";
  _configLanguage: ConfigLanguage
  _configservice: ConfigService;
  _loginSevice: LoginSevice;
  _ProductItemService: ProductItemService;
  _CartService: CartService;

  /*  _language: Array<Language>;*/

  @Input() product: tblBuyerCustomer = new tblBuyerCustomer();
  @Input() quantity: number = 0;

  constructor(private route: Router, private _CommonService: CommonService, _language: ConfigLanguage, configservice: ConfigService, loginSevice: LoginSevice, ProductItemService: ProductItemService, CartService: CartService) {
    this._configLanguage = _language;
    this._loginSevice = loginSevice;
    this._configservice = configservice;
    this._ProductItemService = ProductItemService;
    this._CartService = CartService;

  }
  ngOnInit(): void {

 


  }

  ImgError() {
  }


  QuantityProduct(mode: boolean, id: string) {
 
    // Pendiente
    var item = this._CartService._listProductCart.find(s => s.id == id)
    if (item == null || item == undefined) return undefined;

    //this._CartService._listProductCart = this._CartService._listProductCart.filter(s => s.id != id);
    this._CartService.RemoveCartById(id);

    if (mode) {
      item.quantity++;
    } else {
      item.quantity--;
    }
   
    // this._CartService._listProductCart.push(item);

 

 
    // Pendiente
   
    return undefined;
  }

  CartBuyAdd(product: tblProduct) {

    this._CartService.AddProductCart(product);

  }

  DeleteBuyCart(id: string) {
    
    this._CartService.RemoveCartById(id);
    // Pendiente
  
  }

  GetQuantity(id:string) {
    // Pendiente
    var item = this._CartService._listProductCart.find(s => s.id == id);
    if (item == undefined || item == null) return 0;
    return item.quantity;
  }

  SelctProduct(productSelect: tblProduct) {
    var name = "";
    productSelect.name.split(" ").forEach((e) => {
      if (e != "") name += e + (e != "" ? "-" : "");
    })

   // this.Route("select-product/" + productSelect.replace(" ", "-").replace(" ", "") + "/" + name + "/" + productSelect.id)
  }


  GetUrlImg(image: string,idCompany:string, scaleTo: string) {
    var url = this._configservice.GetUrlImgAndIdCompany(image, idCompany, scaleTo);
    return url;
  }

  GetPriceString(price: number) {
    return this._CommonService._UtilitiService.ConverCurrency(price);
  }


  GeNameConcepNumberVista(value: any) {

    if (value != null && value != undefined) {

      return value.value;
    }
    else
      return 0;
  }
  Route(routeValue: string) {
    this.route.navigate([routeValue]);

  }

  languageTraslate(value: string) {
    return value;
  }

}
