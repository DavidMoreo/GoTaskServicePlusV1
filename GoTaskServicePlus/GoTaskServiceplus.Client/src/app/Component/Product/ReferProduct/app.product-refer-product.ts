import { ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SelectFileComponent } from "../../Common/InputFile/app.common-input-file";
import { ProductService } from "../../../Services/Product/AddUpdateProduct";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { FormsModule } from "@angular/forms";
import { InputImgService } from "../../../Services/InputFile/InputFileService";

import { CommonModule, CurrencyPipe } from "@angular/common";
import { ImgItem, NameConcept, TypeConcepValue, tblCharacteristics, tblConcepValue, tblPrices, tblProduct } from "../../../Models/Structure/tblProduct";

import { ProductItemService } from "../../../Services/Product/ProductItem";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { ItemProductAddUpdate } from "../ProductAddUpdateItem/app.product-item-product-add";

import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";

import { FilterSearchService } from "../../../Services/Product/Util/FilterSearch";
import { FilterSearchIAt } from "../FilterSearchIA/app.product-filter-search-ia";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";

import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { CommonService } from "../../../Services/Common/CommonService";
import { BtnOnOffComponent } from "../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off";
import { ItemProductView } from "../ProductItem/app.product-item-product";
import { ReferService } from "../../../Services/Product/ReferProduct";
import { TypePrice, tblReferProduct } from "../../../Models/Product/ReferProduct";
import { InputTextComponent } from "../../Common/CustomControl/ImputText/app.common-input-text";
import { SelectInputComponent } from "../../Common/CustomControl/ImputSelect/app.common-input-select";



@Component({
  standalone: true,
  selector: 'app-refer-product',
  templateUrl: 'app.product-refer-product.component.html',
  styleUrls: ['app.product-refer-product.css'],
  imports: [LoadingComponent, PermissionComponent, FormsModule, CommonModule, MenuGridComponent, GridComponent, BtnOnOffComponent, InputTextComponent, SelectInputComponent]
})


export class ReferProduct implements OnInit, DoCheck {

  _configservice: ConfigService;
  tempRefer: tblReferProduct = new tblReferProduct();
  tempPrice: tblPrices = new tblPrices();
  listSelectType: Array<NameConcept> = new Array<NameConcept>;

  @ViewChild(SelectInputComponent) select: SelectInputComponent;

  constructor( private _CommonService: CommonService, private _Permission: PermissionService, private refer: ReferService) {

  }

  page: number = 0;
  addPrice: boolean = true;


  ngDoCheck(): void {  
    
  }

  LoadTypes() {

    var model = new TypePrice();
    this.listSelectType = new Array<NameConcept>;


    let data = new NameConcept();
    data.id = model.isACost;
    data.name = "Es un costo $";
    this.listSelectType.push(data);

    data = new NameConcept();
    data.id = model.isADiscount;
    data.name = "Es un descuento en moneda $";
    this.listSelectType.push(data);

    data = new NameConcept();
    data.id = model.isADiscountInPorcentage;
    data.name = "Es un descuento en %";
    this.listSelectType.push(data);   

    data = new NameConcept();
    data.id = model.isProfitInMoney;
    data.name = "Ganancia en $";
    this.listSelectType.push(data);

    data = new NameConcept();
    data.id = model.isProfitInPorcentage;
    data.name = "Ganancia en %";
    this.listSelectType.push(data);

    return this.listSelectType;

  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("refer-product");
    if (status) {
      this.LoadTypes();
      this.GetAll("all", 1);
    }
  }

  GetAllReferByCompanyId() {
    this.refer.GetAllReferByCompanyId();
  }

  GetAll(filter: string, page: number) {
    this.refer.GetAll(filter, page);
  }

  Save() {
    console.log("Save", this.tempRefer);
    this.tempRefer.price = this.Total(this.tempRefer);
    if (this.Validate(this.tempRefer)=="") {
      this.refer.Save(this.tempRefer);
      this.ClearNewRefer();
    }   
  }

  Validate(data: tblReferProduct) {
    var msg = "";
    if (!data) msg = "Todos los campos son requeridos";
    if (data.name=="") msg = "Nombre requerido";
    if (data.quantity == 0) data.quantity = 1;
    if (msg!="")
      this._CommonService._AlertService.Alert(msg, "#fd625e");
    return msg;
  }

  Delete(id: string) {
    this.refer.DeleteById(id);    
  }

  Edit(id: string) {
    var result =  this.refer.GetById(id);
    result.subscribe((e) => {
      this.tempRefer = e.data;
      this.addPrice = true;     
    });
  }

  Clone(id: string) {
    var result = this.refer.GetById(id);
    result.subscribe((e) => {
      this.tempRefer = e.data;
      this.tempRefer.id = this._CommonService._UtilitiService.GuidEmpty();
    });
  }

  Selection(item: tblReferProduct) {
    this.refer.rowSeletion = item;
    if (item.prices != undefined) {
      //this.allPrice = item.prices[0]
    }
    this.ActiveAddPrice(false);
  }

  OnSubmit() {
    //this.ClearNewPrice();
    //this.ActiveAddPrice(true);
    //this.ActiveAddPrice(false);
  }

  ClearData(id: string) {
    this.Clear();
  }

  Clear() {   
    this.refer.rowSeletion = new tblReferProduct();
    this.ClearNewRefer();
    this.ActiveAddPrice(true);
    this.ClearNewPrice();
  }

  ClearNewPrice() {   
    this.tempPrice = new tblPrices();   

  }

  ClearNewRefer() {
    this.tempRefer = new tblReferProduct();

  }


  ChangeMenu(id: any) {
    // this._util.scrollToBottom("scroll-product");
  }

  OnselectAvailable(event: any) {
    var id = event.target.value;

  }

  NullProductSelectId() {
   
    if (this.refer.rowSeletion) {
      if (this.refer.rowSeletion.id)
      if (this.refer.rowSeletion.id != this._CommonService._UtilitiService.GuidEmpty()) return true;      
    }
    return false;
  }

  IsSelection(item: tblReferProduct) {

    if (this.refer.rowSeletion)
      if (item.id == this.refer.rowSeletion.id)
        if (this.refer.rowSeletion.id != this._CommonService._UtilitiService.GuidEmpty())
        return true;

   
    return false;
  }

  //#Grid


  FilterProduct(filter: string) {

  }

  FilterCancel(filter: string) {

  }

  GoPage(count: number) {

  }

  GoBackPageData(count: number) {

  }

  //End Grid

  ChangedInputReferName(value: string) {
    this.tempRefer.name = value;
  }

  ChangedInputReferQuantity(value: string) {
    this.tempRefer.quantity = Number.parseInt(value);
  }

  ChangedInputRefer(value: string) {
    this.tempRefer.refer = value;
  }

 
  ChangedIsPercentage(value: boolean) {
    this.tempPrice.price
  }

  ChangedInputTypePrice(value: string) {
    this.tempPrice.typeAction = value;
  }


  // Price

  ChangedInputPrice(value: string) {
    this.tempPrice.price = Number.parseInt(value);
  }

 

  ChangedInputPriceName(value: string) {
    this.tempPrice.name = value;
  }



  ChangedDisble(mode: boolean) {
    this.tempPrice.isPublic = mode;   
  }

  AddPrice() {
    //this.LoadPriceModel();
    var data = this.refer.GetItemRefer(this.refer.rowSeletion);
    console.log("this.refer.rowSeletion", data);
    data?.prices.push(this.tempPrice);

    //data.price = this.Total(data?.prices);

    this.tempRefer = data;

    if (data != undefined)
      this.Save();


    this.ClearNewPrice();
  }


  RemovePrice(price: tblPrices) {
   
    this.LoadPriceModel();
    this.refer.rowSeletion.prices = this.refer.rowSeletion.prices.filter(s => s.id != price.id);

    this.tempRefer = this.refer.rowSeletion;
   
    this.Save();
    this.ClearNewPrice();
  }

  ActiveAddPrice(mode: boolean) {
    this.addPrice = mode;
  }


  LoadPriceModel() {
    if (this.refer.rowSeletion.prices == null) this.refer.rowSeletion.prices = new Array<tblPrices>;
  }

  //#Vista

  GetListRefer() {
    return this.refer.GetListRefer();
  }

  GetRefer() {
    return this.refer.GetListRefer();
  }

  GetReferRowSelect() {
    if (this.refer.rowSeletion)
      return this.refer.rowSeletion.id;
    else
      return "";
  }

  GetListPrice(referProduct: tblReferProduct) {
    this.LoadPriceModel();
    return referProduct.prices;
  }

  GetValueToString(value: number) {
    if (value)
      return value.toString();
    return "";
  }


  IsCost(prices: Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isACost && !s.isPublic);
    return list;
  }

  IsProfitInMoney(prices: Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isProfitInMoney);
    return list;
  }

  IsProfitInPorcentage(prices: Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isProfitInPorcentage);
    return list;
  }

  IsCostPublic(prices: Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isACost && s.isPublic);
    return list;
  }

  IsADiscount(prices:Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isADiscount);
    return list;
  }

  IsADiscountPorcentage(prices: Array<tblPrices>) {
    var type = new TypePrice();
    var list = prices.filter(s => s.typeAction == type.isADiscountInPorcentage );
    return list;
  }

  Total(refer: tblReferProduct) {
    var type = new TypePrice();
    var cost = this.IsCost(refer.prices);
    var costPublic = this.IsCostPublic(refer.prices);
    var discount = this.IsADiscount(refer.prices);
    var discountPorcentage = this.IsADiscountPorcentage(refer.prices);
    var profitInMoney = this.IsProfitInMoney(refer.prices);
    var profitInPorcentage = this.IsProfitInPorcentage(refer.prices);
  

    //Suma todo los valores 
    var total = 0;
    cost.forEach((s) => {
      total += s.price;
    });

    
    //Calcular valor del producto en base a los costos y cantidad
    if (total > 0) {
      total = (total / refer.quantity);
    };


    // Sumar el valor  a ganar 
    if (profitInMoney.length > 0) {
      let value = 0;
      profitInMoney.forEach((e) => {
        value += e.price;
      });
      total = total + value;
    }

    // Sumar el valor  a  en porcentaje 
    if (profitInPorcentage.length > 0) {
      let value = 0;
      profitInPorcentage.forEach((e) => {
        value += e.price;
      });
      total = total + ((total * value)/100);
    }

   
    //Si hay descuento se aplica 
    if (discount.length > 0) {
      let value = 0;
      discount.forEach((e) => {
        value += e.price;
      });
      console.log("Descuento", value);
      total = total - value;
    }

    // Resta el valor  a  en porcentaje 
    if (discountPorcentage.length > 0) {
      let value = 0;
      discountPorcentage.forEach((e) => {
        value += e.price;
      });
      total = total - ((total * value) / 100);
    }

    //Suma los costoas adicioanles como envio o demas
    costPublic.forEach((s) => {
      total += s.price;
    });

    let temp = this.GetPriceCurrency(total);
    return total;
  }

  IsNumber() {
    var type = new TypePrice();
    if (this.tempPrice != undefined) {
    if (this.tempPrice.typeAction == type.isADiscountInPorcentage) return true;
    if (this.tempPrice.typeAction == type.isProfitInPorcentage) return true;
    }


    return false;
  }

 

  GetPriceToString(value: any) {
    return value +"".toString();
  }

  GetPriceCurrency(value: number) {
    return this._CommonService._UtilitiService.ConverCurrency(value);
  }

  //#End Vista


  languageTraslate(value: string) {
    return value;
  }


}
