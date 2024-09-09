import { ChangeDetectorRef, Component, DoCheck, OnInit } from "@angular/core";
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
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { prod } from "@tensorflow/tfjs";
import { GridCustomService } from "../../../Services/Common/CustomControl/GridCustomService";
import { GridItem } from "../../../Models/Common/GridModel";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { CommonService } from "../../../Services/Common/CommonService";
import { BtnOnOffComponent } from "../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off";
import { ItemProductView } from "../ProductItem/app.product-item-product";
import { InputTextComponent } from "../../Common/CustomControl/ImputText/app.common-input-text";



@Component({
  standalone: true,
  selector: 'app-add-update-product',
  templateUrl: 'app.product-add-update-product.component.html',
  styleUrls: ['app.product-add-update-product.css'],
  imports: [ItemProductAddUpdate, ItemProductView, SelectFileComponent, LoadingComponent, PermissionComponent, FormsModule, CommonModule, FilterSearchIAt, MenuGridComponent, GridComponent, BtnOnOffComponent, InputTextComponent]



})


export class AddUpdateProduct implements OnInit, DoCheck {

  _configservice: ConfigService;

  _product: tblProduct = new tblProduct();
  _listImge: Array<ImgItem> = new Array<ImgItem>();
  listImgeLoading: boolean = false; // Para Buscar imagen 

  

  _viewAddImg: boolean; // Mostrar Control add imagen

  _productService: ProductService;



  _priceUnid: string;
  _priceUnidInternal: string;
  _description: string;
  _instructionsforUse: string;
  _deliveryDeadlines: string;
  _technicalSpecifications: string;
  _returnAndWarrantyPolicy: string;
  _deliveryTimes: string;

  _price: tblPrices = new tblPrices();

  _cityList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _contryList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _adressList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _availableList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _statusList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _deliveryList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _typeProductList: Array<tblConcepValue> = new Array<tblConcepValue>();

  _Permission: PermissionService

  _http: ConceptService;

  filter: string = "all";
  type: string = "all";
  page: number = 1;

  productSearch: { group: string, name: string, id: string };
  //
  constructor(private _file: InputImgService, private _CommonService: CommonService, productService: ProductService, productItemService: ProductItemService, configservice: ConfigService, http: ConceptService, Permission: PermissionService, private _FilterSearch: FilterSearchService, private _util: UtilitiService, private _GridCustom: GridCustomService, private _cdRef: ChangeDetectorRef) {

    this._productService = productService; 
    this._configservice = configservice;
    this._http = http;
    this._Permission = Permission;

  }
  ngDoCheck(): void {
    this._cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.ClearData("");
    var status = this._Permission.ValidationLogin("add-product");
    if (status) {
      this._productService.GetAllReferByCompanyId();
      this.loadPoduct();
      this.loadConcept();
    }
  }

  async loadPoduct() {
    /* this.InitilizeModel();*/
    /*    this.LoadHeaderGrid();*/
    this._product.disable = true;
    this._productService.GetAllProduct(this.filter, this.type, this.page);
  }

  GoPage(count: number) {
    this.page++;
    this.loadPoduct();
  }

  GoBackPageData(count: number) {

    if (this.page > 1) this.page--;
    this.loadPoduct();
  }


  async loadConcept() {

    this.GetListAvailableConcept(TypeConcepValue.AvailableDayConcept());
    this.GetListStatusConcept(TypeConcepValue.StatusProductConcept());
    this.GetListConceptStatus(TypeConcepValue.StatusProductConcept(), 0);
    this.GetListConceptDelivery(TypeConcepValue.DeliveryModeConcept(), 0);
    this.GetListConceptTypeProduct(TypeConcepValue.TypeProduct(), 0);
  }

  public DeleteImg(img: ImgItem, idProduct: string) {


    this._productService.deleteImgByUrl("DeleteFileByUrl", img.url, idProduct).subscribe((e) => {
      if (e.status) {
        this._CommonService._AlertService.Alert("Eliminado");
        if (idProduct != this._util.GuidEmpty()) {
          this._product.imgList = this._product.imgList.filter(f => f.url != img.url);         
          if (this._product.firsImg.url == img.url) this._product.firsImg.url = "";
        }
      } else {
        this._CommonService._AlertService.Alert("No eliminado");
      }
    });

    if (idProduct == this._util.GuidEmpty()) {
      this._product.imgList = this._product.imgList.filter(f => f.url != img.url);     
      if (this._product.firsImg.url == img.url) this._product.firsImg.url = "";
    }
  }

  public saveAndUpdateProduct() {
    this.InitilizeModel();

    this._CommonService._AlertService.Alert("...");
    if (this._util.GuidIsEmpty(this._product.id)) {
      this._productService.savedProduct("Product/SaveProduct", this._product).subscribe((e) => {
        if (e.status) {
          this.ClearData("");
          this.ListProductAdd(e.data);
          this._CommonService._AlertService.Alert("Guardado");
        } else {
          this._CommonService._AlertService.Alert("No guardado");
        }
      });
    } else {
      this._productService.updateProduct("Product/UpdateProduct", this._product).subscribe((e) => {
        if (e.status) {
          this._productService._listProduct = this._productService._listProduct.filter(f => f.id != e.data.id);
          this._productService._listProduct.push(e.data);
          this.ClearData("");
          this._CommonService._AlertService.Alert("Actualizado");

        } else {
          this._CommonService._AlertService.Alert("No actualizado");
        }
      });
    }
  }

  Delete(id: string) {
    this._util.alertMsg(this.languageTraslate("Espere un momento"));
    this._productService.deleteProduct("Product/DeleteProduct", id).subscribe((e) => {
      if (e.status) {
        this._CommonService._AlertService.Alert("Eliminado");
        var item = this._productService._listProduct.find(s => s.id == id);
        this._productService._listProduct = this._productService._listProduct.filter(s => s != item);
        this.ClearData("");
      } else {
        this._CommonService._AlertService.Alert("No eliminado");
      }
    });
  }

  Edit(id: string) {

    this._productService.GetProductById(this._productService.rowSeletion).subscribe((e) => {
      this.ClearData("");
      if (e.status) {
        this._product = e.data;
        this._productService.product = e.data;
        this._productService.rowSeletion = e.data.id;
        if (this._product.characteristics != null && this._product.characteristics.length > 0) this.EditDescriptionSave(this._product.characteristics);
        this._FilterSearch.SetRagnge(this._product.filterISearch);
       
        this.changedproduct();
        this._util.alertMsg(this.languageTraslate("Listo para editar"));
      }
    });
  }

  EditComplement() {  
    //this._file.listImg = this._product.imgList;
    //this._file.filesMax = this._file.listImg.length;
    this.EditDescriptionSave(this._product.characteristics)   
  }


  Clone(id: string) {


    this._productService.GetProductById(this._productService.rowSeletion).subscribe((e) => {
      this.ClearData("");
      if (e.status) {
        this._product = e.data;

        this._product.imgList = new Array<ImgItem>();
        this._product.firsImg = new ImgItem();
        this._product.id = "00000000-0000-0000-0000-000000000000";
        this._product.name = this._product.name + "-Copia";
        this._productService.product = e.data;
        this._productService.rowSeletion = e.data.id;
        if (this._product.characteristics != null && this._product.characteristics.length > 0) this.EditDescriptionSave(this._product.characteristics);
        this.changedproduct();
        this._util.alertMsg(this.languageTraslate("Listo para editar"));
      }
    });




  }

  ChangeMenu(id: any) {
    this._util.scrollToBottom("scroll-product");


  }

  Selection(id: any) {
    this.ClearData("");
    this.InitilizeModel();
    this._productService.rowSeletion = id;

  }

  onSelectChangeDelivery(event: any) {
    var id = event.target.value;
    if (id != "0") {
      var selected = this._deliveryList.find(s => s.id == id);
      this._product.deliveryMode = this._util.GetNameConcept(selected?.name, selected?.name, selected?.id);
      this.changedproduct();
    }
  }


  ChangedIsProduct(mode: boolean) {

    this._product.isProduct = mode;
    this.changedproduct();

  }

  ChangedDisble(mode: boolean) {
    this._product.disable = mode;
    this.changedproduct();
  }


  //Mostrar para editar 

  ProductNotNull(product: tblProduct): boolean {
    if (product == undefined) return false;
    if (product == null) return false;
    return true;
  }

  //Mostrar para editar fin


  OnselectAvailable(event: any) {

    var id = event.target.value;
    if (id != "0") {
      var selected = this._availableList.find(s => s.id == id);

      if (selected != undefined) {
        this._product.availableDay =
          this._util.GetNameConcept(selected?.name, selected?.name, selected?.id);
        this.changedproduct();
      }
    }
  }

  OnselectStatus(event: any) {
    var id = event.target.value;
    var selected = this._statusList.find(s => s.id == id);

    if (id != undefined && id != "0") {

      this._product.status =
        this._util.GetNameConcept(selected?.name, selected?.value, selected?.id);

      this._product.isPublic = (selected?.value == "public");

      this.changedproduct();
    }
  }


  OnselectTypeProduct(event: any) {
    var id = event.target.value;
   
    var selected = this._typeProductList.find(s => s.id == id);

    if (id != undefined && id != "0") {

      if (selected) {
        this._product.idTypeOfProduct = selected.id;
        this._product.typeProductName = selected.name;
      }


      this.changedproduct();
    }
  }


  onDeleteAdress(id: string) {
    let exist = this._product.adress;
    if (exist != null)
      // this._product.adress.splice(exist, 1);
      this.changedproduct();
  }


  validateProduct() {

    this.loadDataObj();

    var msg = "";

    if (this._product == undefined)
      msg = "Campos requeridos";
    else
      if (this._product.name == undefined || this._product.name == "")
        msg = "Nombre del producto requerido";
      else
        if ((this._product.isProduct) && (this._product.actualPrice == undefined || this._product.actualPrice <= 10))
          msg = "El precio por unidad es requerido";
        else
          if (this._product.availableDay == undefined || this._product.availableDay == null)
            msg = "Disponibidad de producto es requerido";
          else
            if (this._product.availableDay.name == undefined || this._product.availableDay.name == null)
              msg = "Disponibidad de producto es requerido";
            else
              if (this._product.idTypeOfProduct == undefined || this._product.idTypeOfProduct == null)
                msg = "Tipo de producto es requerido";
              else
                if (this._product.deliveryMode == undefined || this._product.deliveryMode == null)
                  msg = "Modo de etrega de producto es requerido";
                else
                  if (this._product.status == undefined || this._product.status == null)
                    msg = "Estatus de producto es requerido";
                  else
                    if (this._product.adress == undefined || this._product.adress == null)
                      msg = "Direccion  es requerido";
                    else                     
                        if (this._product.characteristics == undefined || this._product.characteristics.length <= 0)
                          msg = "Descricción requerida";
                        else
                          //if (this._productItemService._product.imgList.length <= 0)
                          //  msg = "Se requiere una imagen ";
                          //else
                            this.saveAndUpdateProduct();


    if (msg != "")
      this._CommonService._AlertService.Alert(msg);


  }


  loadDataObj() {


    this.InitilizeModel();

    

    this._product.characteristics = new Array<tblCharacteristics>();
    var description = new tblCharacteristics();
    description.description = this._returnAndWarrantyPolicy;
    description.name = "POLÍTICAS PARA DEVOLUCIÓN";
    if (this._returnAndWarrantyPolicy != "" && this._returnAndWarrantyPolicy != null) this._product.characteristics.push(description);

    description = new tblCharacteristics();
    description.description = this._technicalSpecifications;
    description.name = "ESPECIFICACIONES TÉCNICAS";
    if (this._technicalSpecifications != "" && this._technicalSpecifications != null) this._product.characteristics.push(description);

    description = new tblCharacteristics();
    description.description = this._instructionsforUse;
    description.name = "INSTRUCCIONES DE USO";
    if (this._instructionsforUse != "" && this._instructionsforUse != null) this._product.characteristics.push(description);

    description = new tblCharacteristics();
    description.description = this._description;
    if (this._description != "" && this._description != null) description.name = "DESCRIPCIÓN GENERAL";
    this._product.characteristics.push(description);

    this._product.filterISearch = this._FilterSearch.GetListFilter();

  }




  EditDescriptionSave(list: Array<tblCharacteristics>) {
   
    if (list.length > 0) {

      var item = list.find(s => s.name.trim() == "DESCRIPCIÓN GENERAL");
      if (item != undefined)
        this._description = item?.description;

      item = new tblCharacteristics();
      item = list.find(s => s.name.trim() == "ESPECIFICACIONES TÉCNICAS");
      if (item != undefined)
        this._technicalSpecifications = item?.description;

      item = new tblCharacteristics();
      item = list.find(s => s.name.trim() == "INSTRUCCIONES DE USO");
      if (item != undefined)
        this._instructionsforUse = item?.description;


      item = new tblCharacteristics();
      item = list.find(s => s.name.trim() == "POLÍTICAS PARA DEVOLUCIÓN");
      if (item != undefined)
        this._returnAndWarrantyPolicy = item?.description;


    }

  }


  GetCleaner(text: string) {
   
    text = text.replace("#", "");
    text = text.replace("/", "");
    text = text.replace("*", "");
    text = text.replace("+", "");
    text = text.replace(".", "");
    text = text.replace("¬", "");
    text = text.replace("|", "");
    text = text.replace("<", "");
    text = text.replace(">", "");
    text = text.replace("_", "");
    text = text.replace("_", "");
   

    return text;

  }




  GetListAvailableConcept(type: string) {
    this._availableList = new Array<tblConcepValue>();
    var result = this._http.GetListByName("ALL", type, 0);

    result.subscribe(
      (e) => {

        this._availableList = e.data;

        if (this._cdRef != null) this._cdRef.detectChanges();

      }

    );

  }

  GetListStatusConcept(type: string) {
    this._statusList = new Array<tblConcepValue>();
    var result = this._http.GetListByName("ALL", type, 0);

    result.subscribe(
      (e) => {


        this._statusList = e.data;
        if (this._cdRef != null) this._cdRef.detectChanges();

      }

    );

  }


  GetListConceptStatus(type: string, page: number) {
    this._statusList = new Array<tblConcepValue>();
    var result = this._http.GetListByName("ALL", type, 0);

    result.subscribe(
      (e) => {

        this._statusList = e.data;
        if (this._cdRef != null) this._cdRef.detectChanges();

      }

    );

  }

  GetListConceptTypeProduct(type: string, page: number) {
    this._typeProductList = new Array<tblConcepValue>();
    var result = this._http.GetListByName("ALL", type, 0);
    result.subscribe(
      (e) => {

        this._typeProductList = e.data;
        if (this._cdRef != null) this._cdRef.detectChanges();

      }

    );
  }

  GetListConceptDelivery(type: string, page: number) {
    this._deliveryList = new Array<tblConcepValue>();
    this._http.GetListByName("ALL", type, 0).subscribe(
      (e) => {

        this._deliveryList = e.data;
        if (this._cdRef != null) this._cdRef.detectChanges();

      }

    );
  }


  GetListReferProduct() {
   
    return this._productService.GetListReferProduct();
  }



  SearchImg(filter: string) {
    this.listImgeLoading = true;
    this._listImge = new Array<ImgItem>();
    this._http.GetListImgByIdCompany(filter, 0).subscribe(
      (e) => {
        this._listImge = e.data;
        this.listImgeLoading = false;
      }

    );

    if (this._cdRef != null) this._cdRef.detectChanges();
  }

  SelectImg(img: ImgItem) {

    this.InitilizeModel();
    if (this._product.imgList == null) return false;
  
    var exist = undefined;

    if (this._product.imgList)
      exist = this._product.imgList.find(s => s.id == img.id);

    if (exist == undefined) {
      this._product.imgList.push(img);     
    }

    return true;
  }

  setViewNewImg(mode: boolean) {
    this._file.Setvisible(mode);
    if (mode) { this.closeViewAddImg(!mode); }
  }

  closeViewAddImg(mode: boolean) {
    this._viewAddImg = mode;
    if (mode) {
      this.setViewNewImg(!mode);
    }
  }




 

  GetPriceToString(value: number) { 
    return value.toString();   
  }


  changedInputName(value: string) {
    var data = this.GetListReferProduct();
    let item = data.find(s => s.id == value);

    if (item != undefined) {
      this._product.name = item.name;
      this._product.referNumber = item.id;
      this._product.actualPrice = item.price;
    } else {
      this._product.name = "";
    }

    this.changedproduct();
  }

  changedInputReferNumber(value: string) {
   this._product.referNumber = value;  
    this.changedproduct();
  }
  

  changedImgSelect(img: ImgItem) {
    if (this._product == undefined) this._product = new tblProduct();
   
    this._product.firsImg = img;

    this.changedproduct();
    if (this._cdRef != undefined) this._cdRef.detectChanges();
  }

  changedproduct() {

    if (this._product != null && this._product != undefined)
      this._product.name = this._product.name.toUpperCase();

    this._FilterSearch.SetRagnge(this._product.filterISearch);

    //if (this._product.imgList != undefined)
    //  this._file.listImg = this._product.imgList;

    this._product.priceString = this.ConverCurrency(this._product.actualPrice);  

    if (this._cdRef != null) this._cdRef.detectChanges();

   
  }

  GetLisImage() {
    return this._product.imgList;
  }

  GetFirsImage() {

    return this._CommonService._ConfigService.GetUrlImgItem(this._product.firsImg, "PHONE");
  
  }

  descriptionLoad() {
    this._product.characteristics = new Array<tblCharacteristics>();
    var item = new tblCharacteristics();
    item.name = "Descripción general";
    item.description = this._description;
    this._product.characteristics.push(item);

    var item = new tblCharacteristics();
    item.name = "Especificaciones técnicas";
    item.description = this._technicalSpecifications;
    this._product.characteristics.push(item);

    var item = new tblCharacteristics();
    item.name = "Instrucciones de uso";
    item.description = this._instructionsforUse;
    this._product.characteristics.push(item);

    var item = new tblCharacteristics();
    item.name = "Política de devolución y garantía";
    item.description = this._returnAndWarrantyPolicy;
    this._product.characteristics.push(item);

    var item = new tblCharacteristics();
    item.name = "Modo de entrega";
    item.description = this._product.deliveryMode.name;
    this._product.characteristics.push(item);


    var item = new tblCharacteristics();
    item.name = "Tiempos de entrega";
    item.description = this._deliveryTimes;
    this._product.characteristics.push(item);




  }

  GetUrl(imgName: ImgItem) {
    return this._configservice.GetUrlImgItem(imgName, "PHONE");
  }
  
  languageTraslate(value: string) {
    return value;
  }

  ConverCurrency(actualPrice: number) {
    if (isNaN(actualPrice)) actualPrice = 0;
    let numberValue = this._util.ConverCurrency(actualPrice);
    return numberValue;
  }

  VisibleAgregateFilter() {
    this._FilterSearch.isVisible = true;
  }

  ListProductAdd(prodcut: tblProduct) {
    this._productService._listProduct.push(prodcut);
  }

  ListProductRemove(id: string) {
    (this._productService._listProduct != null)
    this._productService._listProduct = this._productService._listProduct.filter(s => s.id != id);
  }



  FilterProduct(value: string) {
    //this._productService._listProduct = this._productService._listProduct.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
    this._productService.GetAllProduct(value, this.type, this.page);

  }

  FilterCancel(value: string) {
    this.page = 1;
    this.loadPoduct();
  }


  InitilizeModel() {

    if (this._productService.product == undefined) this._productService.product = new tblProduct();

    if (this._productService._listProduct == undefined)
      this._productService._listProduct = new Array<tblProduct>;

    if (this._product.historyOfPrice == null) this._product.historyOfPrice = new Array<tblPrices>;
    if (this._product.conceptCompany == undefined) this._product.conceptCompany = new NameConcept();
    if (this._product.conceptPrevious == undefined) this._product.conceptPrevious = new NameConcept();
    if (this._product.conceptProject == undefined) this._product.conceptProject = new NameConcept();

    if (this._product.typeCurrency == undefined) this._product.typeCurrency = new tblConcepValue();
    if (this._product.typeCurrency.conceptProject == undefined) this._product.typeCurrency.conceptProject = new NameConcept();
    if (this._product.typeCurrency.conceptCompany == undefined) this._product.typeCurrency.conceptCompany = new NameConcept();
    if (this._product.typeCurrency.conceptPrevious == undefined) this._product.typeCurrency.conceptPrevious = new NameConcept();

    if (this._product.typeCurrency == undefined) this._product.typeCurrency = new tblConcepValue();
    this._product.typeCurrency.id = this._util.GuidEmpty();

   
  }

  ClearData(id: string) {
    this._product = new tblProduct();   
    this._FilterSearch.Clear();
    this._description = "";
    this._deliveryDeadlines = "";
    this._deliveryDeadlines = "";
    this._deliveryTimes = "";
    this._productService.product = new tblProduct();
    this._productService.rowSeletion = "";
    this._product.disable = true;
    this._technicalSpecifications = "";
    this._returnAndWarrantyPolicy = "";
    this._instructionsforUse = "";
    this._deliveryTimes = "";
    this._description = "";

    if (this._cdRef != undefined) this._cdRef.detectChanges();

  }

  NullProductSelectId(id: string) {
    if (this._productService.rowSeletion == undefined) return false;
    if (this._productService.rowSeletion == "") return false;
    if (id != "0") {
      if (this._productService.rowSeletion == id) return true;
    } else {
      if (this._productService.rowSeletion != "") return true;
    }
    return false;
  }


  ClearPricePublic() {
    if (this._product.priceString != "") this._product.priceString = "";
  }

  ClearPriceInternal() {
    if (this._priceUnidInternal != "") this._priceUnidInternal = "";
  }



  GetStatusProduct(product: tblProduct) {
    if (product.disable) return "En Verificación";
    if (product.isPublic) return "Publicado";
    return "Privado";

  }

}
