import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { ImgItem, tblConcepValue, tblProduct } from "../../../Models/Structure/tblProduct";
import { ItemProductView } from "../../Product/ProductItem/app.product-item-product";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { CartService } from "../../../Services/Customer/CartService";
import { ItemCartComponet } from "../../Product/ProductItemCart/app.product-item-product-cart";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { BuyProductService } from "../../../Services/Customer/BuyProductService";
import { ListBuyService } from "../../../Services/Customer/ListBuyService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { CommonModule } from "@angular/common";
import { MovementType, tblBuyerCustomer } from "../../../Models/Structure/tblBuyerCustomer";
import { MenuPhone } from "../../Common/MenuPhone/app.menu-phone";





@Component({
  standalone: true,
  selector: 'app-customer-list-buy',
  templateUrl: './app.customer-list-buy.component.html',
  styleUrls: ['app.customer-list-buy.css'],
  imports: [ItemCartComponet,  LoadingComponent, FormsModule, CommonModule, MenuPhone]
})


export class ListBuyComponet implements OnInit {

  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _param: ActivatedRoute;
  _ListBuyService: ListBuyService;
  _listGuid: Array<string> = new Array<string>;
  _loading: LoadingServiceControl;
  _BuyProduct: BuyProductService;
  _configservice: ConfigService;
  _movementType: MovementType = new MovementType();

  constructor(private route: Router, titleService: Title, param: ActivatedRoute, ListBuyService: ListBuyService, loading: LoadingServiceControl, buyProduct: BuyProductService, configservice: ConfigService) {
    this._param = param;
    this._titleService = titleService;
    this._ListBuyService = ListBuyService;
    this._loading = loading;
    this._BuyProduct = buyProduct;
    this._configservice = configservice;
  }
  ngOnInit(): void {

    this._titleService.setTitle('Mi carrito de compras');
    this.loadData();
    
  }

  async loadData() {
    this._loading.Loading(true);    
    this._ListBuyService.GetAllProduct(0);
  }

  GetUrlImg(image: tblBuyerCustomer, scaleTo: string) {   
    var url = this._configservice.GetUrlImgBuy(image, scaleTo);
    return url;
  }

  GetCity(list: Array<tblConcepValue>) {
    var data = Array();
    list.forEach((e) => {
      data.push(e.value);
    })
    return data;
  }

  CancelBuy(id: string) {    
    this._ListBuyService.CancelBuy(id);    
  }


  GetGroup() {
    var data = this._ListBuyService._listProduct.map(s => s.purchareId);
    var uniqueData = data.filter((value, index, self) =>
      self.indexOf(value) === index
    );
    return uniqueData;
  }

  GetGroupList(purchareId: string) {
    var t = new Array<tblBuyerCustomer>();

    t = JSON.parse(JSON.stringify(this._ListBuyService._listProduct));
   
    return t.filter((s, index, self) =>
      index === self.findIndex((t) => t.purchareId === s.purchareId && t.purchareId === purchareId)
    );



  }


  GetGroupPrice( purchareId: string) {

    var pricesList = this._ListBuyService._listProduct.filter(s => s.purchareId == purchareId);

    var prices = 0;

    pricesList.forEach(e => {
      prices += (e.salePrice * e.quantity);
    })

    return this.converCurrency(prices);
  }

  converCurrency(actualPrice: number) {
 
    let numberValue = Intl.NumberFormat('es-CO', { style: 'currency', currency: "COP", minimumFractionDigits: 0 }).format(actualPrice);
    var priceString = numberValue;
    
    return priceString;
  }

  GetExistPurcchare() {
    if (this._ListBuyService != undefined) {
      if (this._ListBuyService._listProduct == undefined) return true;
      if (this._ListBuyService._listProduct == null) return true;
      if (this._ListBuyService._listProduct.length <= 0) return true;
    }
    return false;
  }




}
