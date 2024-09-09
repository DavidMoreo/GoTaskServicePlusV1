import { Component, DoCheck, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { tblProduct } from "../../../Models/Structure/tblProduct";
import { ItemProductView } from "../../Product/ProductItem/app.product-item-product";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { CartService } from "../../../Services/Customer/CartService";
import { ItemCartComponet } from "../../Product/ProductItemCart/app.product-item-product-cart";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { BuyProductService } from "../../../Services/Customer/BuyProductService";
import { BuyProductComponet } from "./BuyProduct/app.customer-buy-product";
import { MenuPhone } from "../../Common/MenuPhone/app.menu-phone";
import { NotificationComponent } from "../../Common/Notificacion/app.common-notification";
import { NotificationService } from "../../../Services/Admin/Notification/NotificationService";
import { tblBuyerCustomer } from "../../../Models/Structure/tblBuyerCustomer";
import { CommonService } from "../../../Services/Common/CommonService";
import { AlertBuyProductService } from "../../../Services/Customer/AlertBuyProductService";




@Component({
  standalone: true,
  selector: 'app-customer-list-cart',
  templateUrl: './app.customer-list-cart.component.html',
  styleUrls: ['app.customer-list-cart.css'],
  imports: [ItemCartComponet, LoadingComponent, FormsModule, BuyProductComponet, MenuPhone]
})


export class ListCartComponet implements OnInit, DoCheck {

  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _param: ActivatedRoute;
  _CartService: CartService;

  _loading: LoadingServiceControl;
  _BuyProduct: BuyProductService;



  constructor(private _AlertBuyService: AlertBuyProductService, private route: Router, private _CommonService: CommonService, titleService: Title, param: ActivatedRoute, search: CartService, cartService: CartService, loading: LoadingServiceControl, buyProduct: BuyProductService, private _Notifi: NotificationService) {
    this._param = param;
    this._titleService = titleService;
    this._CartService = search;
    this._CartService = cartService;
    this._loading = loading;
    this._BuyProduct = buyProduct;

  }
    ngDoCheck(): void {
   /*   this.loadData();*/
    }
  ngOnInit(): void {

    this._titleService.setTitle('Mi carrito de compras');

    this.loadData();


  }



  async loadData() {
    this._AlertBuyService.product =null;
    this._CartService.GetAllProductCart();
    //this._loading.Loading(false);
    // Pendiente

  

    
  }



  GetListProduct() {
    if (!this._CartService._listProductCart) return new Array<tblBuyerCustomer>();
    return this._CartService._listProductCart;
  }





  loadProductCart() {

  }


  SumValuesProduct() {
    var total = 0;
    // Pendiente
    this.GetListProduct().forEach((e) => {     
      total += (e?.salePrice * (e.quantity == 0 ? 1 : e.quantity));
    });

    return total
  }



  BuyProduct(mode: boolean) {

    this._BuyProduct.isBuyProduct = mode;

  }

  GetPriceString(price: number) {
    return this._CommonService._UtilitiService.ConverCurrency(price);
  }


}
