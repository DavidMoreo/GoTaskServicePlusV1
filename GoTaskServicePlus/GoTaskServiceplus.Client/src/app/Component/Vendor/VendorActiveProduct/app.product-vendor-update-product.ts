import { Component, OnInit } from "@angular/core";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { PermissionComponent } from "../../Permission/app.permission";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ImgItem, NameConcept, tblProduct } from "../../../Models/Structure/tblProduct";
import { Router } from "@angular/router";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { VendorProductService } from "../../../Services/Vendor/VendorUpdateProduct";
import { LoadingPartialComponent } from "../../Common/LoadingPartial/app.common-loading-partial";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";



@Component({
  standalone: true,
  selector: 'app-vendor-active-product',
  templateUrl: 'app.product-vendor-update-product.component.html',
  styleUrls: ['app.product-vendor-update-product.css'],
  imports: [LoadingComponent, PermissionComponent, FormsModule, CommonModule, LoadingPartialComponent, MenuGridComponent, GridComponent]  
})


export class VendorUpdateProduct implements OnInit {

  _Configservice: ConfigService;
  _ProductService: VendorProductService;

  priceUnid: string;
  priceUnidInternal: string;

  counHttp: number = 0;
  limitHttp: number = 3;
  filter: string = "all";
  type: string = "all";
  page: number = 0;

  productSearch: { group: string, name: string, id: string };
  constructor(private route: Router, configservice: ConfigService, private _Permission: PermissionService, private _util: UtilitiService, _ProductService: VendorProductService) {

    this._Configservice = configservice; 
    this._ProductService = _ProductService; 
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("app-vendor-active-product");
    if (status) {
      this.loadPoduct();
       }
  }

  async loadPoduct() {
    this.ReloadHttp();
    this._ProductService.GetListStatusConcept();
    this._ProductService.GetAllProduct(this.filter, this.type, this.page);
  }


  Edit(id: string) {
    this._ProductService.SetLoading(true);
    this._ProductService.GetProductById(id).subscribe((e) => {    
      if (e.status) {      
        this.StastusProduct(e.data);
      }
    });
  }


  StastusProduct(product: tblProduct) {


    var privateConcept = this._ProductService._statusList.find(s => s.value == "private");
    var statusPrivate = this._util.GetNameConcept(privateConcept?.name, privateConcept?.value, privateConcept?.id);  


    var publicConcept = this._ProductService._statusList.find(s => s.value =="public");
    var statusPublic = this._util.GetNameConcept(publicConcept?.name, publicConcept?.value, publicConcept?.id);    


    if (product.isPublic) {
      product.status = statusPrivate;
    } else {
      product.status = statusPublic;
    }
       
    product.isPublic = (product?.status.value == "public");
   
    this._ProductService.UpdateProduct(product);
  }

 
  ProductNotNull(product: tblProduct): boolean {
    if (product == undefined) return false;
    if (product == null) return false;
    return true;
  }

  //Mostrar para editar fin




  OnselectStatus(event: any) {
    var id = event.target.value;
    var selected = this._ProductService._statusList.find(s => s.id == id);
  
    if (id != undefined && id != "0") {
      this._ProductService.product.status =
        this._util.GetNameConcept(selected?.name, selected?.value, selected?.id);
      this._ProductService.product.isPublic = (selected?.value == "public");
      
    }
  }



  GetPrduct() {
    return this._ProductService.listProduct;
  }



  GetListNull() {
    if (this.GetPrduct() == null || this.GetPrduct().length <= 0)
      return true;

    return false;
  }


  GetLoading() {
    return this._ProductService.loadingStatus;
  }


  async ReloadHttp() {
    this.counHttp++;
    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {
        if (this.GetListNull()) {
          clearInterval(timer);
          this.loadPoduct();         
        }
        else
          clearInterval(timer);
      }, 10000)
    }

  }


  GetUrl(imgName: ImgItem) {
   return  this._Configservice.GetUrlImgItem(imgName,"PHONE");
  }

 


  languageTraslate(value: string) {
    return value;
  }

 
 
}
