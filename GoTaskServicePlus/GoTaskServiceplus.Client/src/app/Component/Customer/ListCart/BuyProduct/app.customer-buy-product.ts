import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { LoadingComponent } from "../../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../../Common/Alert/app.common-alert";
import { ItemCartComponet } from "../../../Product/ProductItemCart/app.product-item-product-cart";
import { CartService } from "../../../../Services/Customer/CartService";
import { LoadingServiceControl } from "../../../../Services/Common/LoadingService";
import { ConceptProduct, tblProduct } from "../../../../Models/Structure/tblProduct";
import { BuyProductService } from "../../../../Services/Customer/BuyProductService";
import { tblBuyerCustomer, tblBuyerCustomerConcept } from "../../../../Models/Structure/tblBuyerCustomer";
import { NotificationComponent } from "../../../Common/Notificacion/app.common-notification";
import { CommonService } from "../../../../Services/Common/CommonService";






@Component({
  standalone: true,
  selector: 'app-customer-buy-product',
  templateUrl: './app.customer-buy-product.component.html',
  styleUrls: ['app.customer-buy-product.css'],
  imports: [ItemCartComponet, LoadingComponent, FormsModule]
})


export class BuyProductComponet implements OnInit {

  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _BuyProduct: BuyProductService;

  _listProductCart: Array<ConceptProduct>;
  _listGuid: Array<string> = new Array<string>;
  _loading: LoadingServiceControl;

  isBuyProduct: boolean = false;
  city: string = "";
  mobileNumber: number = 0;
  codeVerification: string = "";
  codeVerificationInput: string = "";

  constructor(private _CommonService : CommonService,private route: Router, private Cart: CartService, titleService: Title, param: ActivatedRoute, search: CartService, cartService: CartService, loading: LoadingServiceControl, BuyProduct: BuyProductService) {

    this._titleService = titleService;
    this._BuyProduct = BuyProduct;


    this._loading = loading;
  }
  ngOnInit(): void {
    this._titleService.setTitle('Mis compras');
  }


  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);
  }

  languageTraslate(value: string) {
    return value;
  }

  CancelBuyProduct() {
    this._BuyProduct.isBuyProduct = false;

  }

  BuyProduct() {

    if (this.GetValidate()) {

      this._BuyProduct.SaveBuyCountomer();

    } else {
      this._CommonService._AlertService.Alert("todos los campos son requeridos");
    }
  }


  async SetCodeVerification() {


  }



  BuyProductAlmacen() {
    var msg = this.GetValidateInPlace();
    if (msg == "") {
      this._BuyProduct.SaveBuyCountomer();
    } else {
      this._CommonService._AlertService.Alert(msg);
    }


  }





  onchangedCity(event: any) {
    var value = event.target.value;
    if (value != "0") {
      this.city = value;
    }
  }




  GetValidate() {
    var status = true;


    return status;
  }


  GetValidateInPlace() {
    var msg = "";
    if (this.Cart._listProductCart == undefined || this.Cart._listProductCart.length <= 0) msg = "Claro, puedes comprar cualquier cosa, pero primero debes agregar productos a tu carrito de compras.";
    return msg;
  }


  LoadInitialData() {
    if (this._BuyProduct.buy == undefined || this._BuyProduct.buy == null) this._BuyProduct.buy = new tblBuyerCustomerConcept();

  }

  GetProductString() {
    var data = new Array<tblBuyerCustomer>();
    this.Cart.GetAllProductCart();
    var list = this.Cart._listProductCart.map(s => s.name);
    return ("Saludos_me_interesan:_" + list[0].replace(" ", "_"));
  }



}
