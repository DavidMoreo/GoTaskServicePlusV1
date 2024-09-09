import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
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
import { ListBuyService } from "../../../Services/Customer/ListBuyService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { CommonModule } from "@angular/common";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { MovementType, tblBuyerCustomer } from "../../../Models/Structure/tblBuyerCustomer";
import { AdminBuyProductService } from "../../../Services/Admin/Customer/AdminBuyProductService";
import { PermissionComponent } from "../../Permission/app.permission";





@Component({
  standalone: true,
  selector: 'app-admin-list-buy',
  templateUrl: './app.admin-list-buy.component.html',
  styleUrls: ['app.admin-list-buy.css'],
  imports: [ItemCartComponet, LoadingComponent, FormsModule, CommonModule, PermissionComponent]
})


export class AdminListBuyComponet implements OnInit {
  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _param: ActivatedRoute;
  _ListBuyService: AdminBuyProductService;
  _listGuid: Array<string> = new Array<string>;

  _loading: LoadingServiceControl;
  _BuyProduct: BuyProductService;
  _configservice: ConfigService;
  _Permission: PermissionService

  idBuySelectDetail: string ="";

  constructor(private route: Router, titleService: Title, param: ActivatedRoute, ListBuyService: AdminBuyProductService, loading: LoadingServiceControl, buyProduct: BuyProductService, configservice: ConfigService, Permission: PermissionService, private _cdRef: ChangeDetectorRef) {
    this._param = param;
    this._titleService = titleService;
    this._ListBuyService = ListBuyService;
    this._loading = loading;
    this._BuyProduct = buyProduct;
    this._configservice = configservice;
    this._Permission = Permission;
  }
  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-buy");

    if (status) {
      this._titleService.setTitle('Mi carrito de compras');
      this._ListBuyService.stausBuy = "Compra en verificación";
      this.loadData();
     
    }
  }



  GetGroup(list: Array<tblBuyerCustomer>, group: string) {

    return list.filter(s => s.purchareId == group);

  }

  GetGroupPrice(list: Array<tblBuyerCustomer>, group: string) {

    var pricesList = list.filter(s => s.purchareId == group);

    var prices = 0;

    pricesList.forEach(e => {
      prices += (e.salePrice * e.quantity);
    })

    return this.converCurrency(prices);
  }

  async loadData() {
    this._loading.Loading(true);
    this._ListBuyService.GetAllBuyStatusAdmin(this._ListBuyService.stausBuy, "00000000-0000-0000-0000-000000000000");
  }


  SelectedDetail(id: string) {
    this.idBuySelectDetail = id;
    this._cdRef.detectChanges();
  }


  CancelBuy(id: string) {
 
    this._ListBuyService.ChangedStatusBuy(id, this._ListBuyService._movementType.purchaseCancelledByAdmin);
  }


  ChangedStatus(id: string, mode: string) {
 
    this._ListBuyService.ChangedStatusBuy(id, mode);
  }

  Delete(id:string) {
    this._ListBuyService.Delete(id);
  }


  GetNewStatus(status: string) {
    alert("");
    this._ListBuyService.stausBuy = status;
    this._ListBuyService.GetAllBuyStatusAdmin(status, "00000000-0000-0000-0000-000000000000");
  }


  GetUrlImg(name: tblBuyerCustomer, scaleTo: string) {
    var url = this._configservice.GetUrlImgBuy(name, scaleTo); 
    return url;
  }



  SetPhoneNumber(product: tblBuyerCustomer) {
    console.log(product);
    //var url = "https://api.whatsapp.com/send?phone=57" + product.mobileNumber + "&text=Me interesa este producto: " + product.name;
    //window.open(url, '_blank');
  }







  converCurrency(actualPrice: number) {
  /*  if (!isNaN(actualPrice)) {*/
      /*      this._product.actualPrice = this._price.price;*/
      let numberValue = Intl.NumberFormat('es-CO', { style: 'currency', currency: "COP", minimumFractionDigits: 0 }).format(actualPrice);
      var priceString = numberValue;
      
    /* }*/

    return priceString;
  }
}
