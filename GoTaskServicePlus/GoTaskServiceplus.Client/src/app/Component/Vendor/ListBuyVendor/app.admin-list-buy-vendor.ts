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
import { PopupMsgComponent } from "../../Common/PopupMsg/app.common-popup-msg";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { VendorAdminBuyProductService } from "../../../Services/Vendor/VendorAdminBuyProductService";





@Component({
  standalone: true,
  selector: 'app-admin-list-buy-vendor',
  templateUrl: './app.admin-list-buy-vendor.component.html',
  styleUrls: ['app.admin-list-buy-vendor.css'],
  imports: [ItemCartComponet, LoadingComponent, FormsModule, CommonModule, PermissionComponent, PopupMsgComponent, MenuGridComponent, GridComponent]
})


export class AdminListBuyVendorComponet implements OnInit {
  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _param: ActivatedRoute;
  _ListBuyService: VendorAdminBuyProductService;
  _listGuid: Array<string> = new Array<string>;
  _loading: LoadingServiceControl;
  _BuyProduct: BuyProductService;
  _configservice: ConfigService;
  _Permission: PermissionService

  idBuySelectDetail: string = "";
 
  constructor(private route: Router, titleService: Title, param: ActivatedRoute, ListBuyService: VendorAdminBuyProductService, loading: LoadingServiceControl, buyProduct: BuyProductService, configservice: ConfigService, Permission: PermissionService, private _cdRef: ChangeDetectorRef) {
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
      this._titleService.setTitle('Mis ventas');
      this._ListBuyService.stausBuy = this._ListBuyService._movementType.purchaseGenerated;
      this.loadData();
     
    }
  }



  GetGroup(list: Array<tblBuyerCustomer>, group: string) {
    return list.filter(s => s.purchareId == group);
  }

  GetGroupPrice( group: string) {

    var pricesList = this._ListBuyService._listProduct.filter(s => s.purchareId == group);

    var prices = 0;

    pricesList.forEach(e => {
      prices += (e.salePrice * e.quantity);
    })
    this._ListBuyService._movementType.purchaseCompleted
    return this.converCurrency(prices);
  }

  GetDateGroup(group: string) {
    var pricesList = this._ListBuyService._listProduct.find(s => s.purchareId == group);
    if (pricesList) {
     
      const fecha = new Date(pricesList.creationDate.split(" ")[0]);
      const fechaTexto = fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
      return pricesList.creationDate.split(" ")[0].toUpperCase();
    }
    return "-";
  }

  GetGroupDetail(group: string, name: string) {
    var data = "";
    var detail = this._ListBuyService._listProduct.find(s => s.purchareId == group);
    if (detail != undefined) {
      if (name == "user.Name") data = detail.user.name;
      if (name == "user.mobileNumber") data = detail.user.mobileNumber;
      if (name == "user.numberPurchase") data = detail.numberPurchase;
      if (name == "detail.id") data = detail.id;
      if (name == "detail.statusMovementItem") data = detail.statusMovementItem;
      
    }
    return data;
  }


  GetCountList(name: string) {
    if (this._ListBuyService.countBuy) {
      if (name == "quantityCancelByAdmin") return this._ListBuyService.countBuy.quantityCancelByAdmin;
      if (name == "purchaseCancelledByCustomer") return this._ListBuyService.countBuy.quantityCancelByCustomer;
      if (name == "purchaseCancelledByVendor") return this._ListBuyService.countBuy.quantityCancelByVendor;
      if (name == "purchaseCompleted") return this._ListBuyService.countBuy.quantityCompleted;
      if (name == "purchaseInDelivery") return this._ListBuyService.countBuy.quantityDelivery;
      if (name == "purchaseGenerated") return this._ListBuyService.countBuy.quantityGenerate;
      if (name == "purchaseInProcess") return this._ListBuyService.countBuy.quantityProcess;
    }
      return 0;
  }

  async loadData() {
    this._loading.Loading(true);
    this._ListBuyService.GetAllBuyStatus(this._ListBuyService.stausBuy);
  }


  SelectedDetail(id: string) {
    this.idBuySelectDetail = id;
    this._cdRef.detectChanges();
  }


  CancelBuy(id: string) {
    this._ListBuyService.ChangedStatusBuy(id, this._ListBuyService._movementType.purchaseCancelledByVendor);    
  }


  ChangedStatus(id: string, mode: string) {

    this._ListBuyService.ChangedStatusBuy(id, mode);
  }

  Delete(id:string) {
    this._ListBuyService.Delete(id);
  }


  GetNewStatus(status: string) {
   
    this._ListBuyService.stausBuy = status;
    this._ListBuyService.GetAllBuyStatus(status);
    this._cdRef.detectChanges();
  }

  StatusPage(page: string) {
   
    return (this._ListBuyService.stausBuy == page);
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


  GetRowSelect() {
    return this._ListBuyService.rowSeletion;
  }

  NullProductSelectId(id: string) {
    if (this._ListBuyService.rowSeletion == undefined) return false;
   

    return false;
  }

  Selection(id: string) {
    this._ListBuyService.rowSeletion = id;
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
