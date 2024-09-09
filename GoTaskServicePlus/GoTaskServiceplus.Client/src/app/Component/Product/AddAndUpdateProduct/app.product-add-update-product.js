"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpdateProduct = void 0;
var core_1 = require("@angular/core");
var app_common_input_file_1 = require("../../Common/InputFile/app.common-input-file");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var app_product_item_product_add_1 = require("../ProductAddUpdateItem/app.product-item-product-add");
var app_permission_1 = require("../../Permission/app.permission");
var app_product_filter_search_ia_1 = require("../FilterSearchIA/app.product-filter-search-ia");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var app_custom_control_btn_on_off_1 = require("../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off");
var app_product_item_product_1 = require("../ProductItem/app.product-item-product");
var app_common_input_text_1 = require("../../Common/CustomControl/ImputText/app.common-input-text");
var AddUpdateProduct = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-add-update-product',
            templateUrl: 'app.product-add-update-product.component.html',
            styleUrls: ['app.product-add-update-product.css'],
            imports: [app_product_item_product_add_1.ItemProductAddUpdate, app_product_item_product_1.ItemProductView, app_common_input_file_1.SelectFileComponent, app_common_loading_1.LoadingComponent, app_permission_1.PermissionComponent, forms_1.FormsModule, common_1.CommonModule, app_product_filter_search_ia_1.FilterSearchIAt, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent, app_custom_control_btn_on_off_1.BtnOnOffComponent, app_common_input_text_1.InputTextComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AddUpdateProduct = _classThis = /** @class */ (function () {
        //
        function AddUpdateProduct_1(_file, _CommonService, productService, productItemService, configservice, http, Permission, _FilterSearch, _util, _GridCustom, _cdRef) {
            this._file = _file;
            this._CommonService = _CommonService;
            this._FilterSearch = _FilterSearch;
            this._util = _util;
            this._GridCustom = _GridCustom;
            this._cdRef = _cdRef;
            this._product = new tblProduct_1.tblProduct();
            this._listImge = new Array();
            this.listImgeLoading = false; // Para Buscar imagen 
            this._price = new tblProduct_1.tblPrices();
            this._cityList = new Array();
            this._contryList = new Array();
            this._adressList = new Array();
            this._availableList = new Array();
            this._statusList = new Array();
            this._deliveryList = new Array();
            this._typeProductList = new Array();
            this.filter = "all";
            this.type = "all";
            this.page = 1;
            this._productService = productService;
            this._configservice = configservice;
            this._http = http;
            this._Permission = Permission;
        }
        AddUpdateProduct_1.prototype.ngDoCheck = function () {
            this._cdRef.detectChanges();
        };
        AddUpdateProduct_1.prototype.ngOnInit = function () {
            this.ClearData("");
            var status = this._Permission.ValidationLogin("add-product");
            if (status) {
                this._productService.GetAllReferByCompanyId();
                this.loadPoduct();
                this.loadConcept();
            }
        };
        AddUpdateProduct_1.prototype.loadPoduct = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    /* this.InitilizeModel();*/
                    /*    this.LoadHeaderGrid();*/
                    this._product.disable = true;
                    this._productService.GetAllProduct(this.filter, this.type, this.page);
                    return [2 /*return*/];
                });
            });
        };
        AddUpdateProduct_1.prototype.GoPage = function (count) {
            this.page++;
            this.loadPoduct();
        };
        AddUpdateProduct_1.prototype.GoBackPageData = function (count) {
            if (this.page > 1)
                this.page--;
            this.loadPoduct();
        };
        AddUpdateProduct_1.prototype.loadConcept = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.GetListAvailableConcept(tblProduct_1.TypeConcepValue.AvailableDayConcept());
                    this.GetListStatusConcept(tblProduct_1.TypeConcepValue.StatusProductConcept());
                    this.GetListConceptStatus(tblProduct_1.TypeConcepValue.StatusProductConcept(), 0);
                    this.GetListConceptDelivery(tblProduct_1.TypeConcepValue.DeliveryModeConcept(), 0);
                    this.GetListConceptTypeProduct(tblProduct_1.TypeConcepValue.TypeProduct(), 0);
                    return [2 /*return*/];
                });
            });
        };
        AddUpdateProduct_1.prototype.DeleteImg = function (img, idProduct) {
            var _this = this;
            this._productService.deleteImgByUrl("DeleteFileByUrl", img.url, idProduct).subscribe(function (e) {
                if (e.status) {
                    _this._CommonService._AlertService.Alert("Eliminado");
                    if (idProduct != _this._util.GuidEmpty()) {
                        _this._product.imgList = _this._product.imgList.filter(function (f) { return f.url != img.url; });
                        if (_this._product.firsImg.url == img.url)
                            _this._product.firsImg.url = "";
                    }
                }
                else {
                    _this._CommonService._AlertService.Alert("No eliminado");
                }
            });
            if (idProduct == this._util.GuidEmpty()) {
                this._product.imgList = this._product.imgList.filter(function (f) { return f.url != img.url; });
                if (this._product.firsImg.url == img.url)
                    this._product.firsImg.url = "";
            }
        };
        AddUpdateProduct_1.prototype.saveAndUpdateProduct = function () {
            var _this = this;
            this.InitilizeModel();
            this._CommonService._AlertService.Alert("...");
            if (this._util.GuidIsEmpty(this._product.id)) {
                this._productService.savedProduct("Product/SaveProduct", this._product).subscribe(function (e) {
                    if (e.status) {
                        _this.ClearData("");
                        _this.ListProductAdd(e.data);
                        _this._CommonService._AlertService.Alert("Guardado");
                    }
                    else {
                        _this._CommonService._AlertService.Alert("No guardado");
                    }
                });
            }
            else {
                this._productService.updateProduct("Product/UpdateProduct", this._product).subscribe(function (e) {
                    if (e.status) {
                        _this._productService._listProduct = _this._productService._listProduct.filter(function (f) { return f.id != e.data.id; });
                        _this._productService._listProduct.push(e.data);
                        _this.ClearData("");
                        _this._CommonService._AlertService.Alert("Actualizado");
                    }
                    else {
                        _this._CommonService._AlertService.Alert("No actualizado");
                    }
                });
            }
        };
        AddUpdateProduct_1.prototype.Delete = function (id) {
            var _this = this;
            this._util.alertMsg(this.languageTraslate("Espere un momento"));
            this._productService.deleteProduct("Product/DeleteProduct", id).subscribe(function (e) {
                if (e.status) {
                    _this._CommonService._AlertService.Alert("Eliminado");
                    var item = _this._productService._listProduct.find(function (s) { return s.id == id; });
                    _this._productService._listProduct = _this._productService._listProduct.filter(function (s) { return s != item; });
                    _this.ClearData("");
                }
                else {
                    _this._CommonService._AlertService.Alert("No eliminado");
                }
            });
        };
        AddUpdateProduct_1.prototype.Edit = function (id) {
            var _this = this;
            this._productService.GetProductById(this._productService.rowSeletion).subscribe(function (e) {
                _this.ClearData("");
                if (e.status) {
                    _this._product = e.data;
                    _this._productService.product = e.data;
                    _this._productService.rowSeletion = e.data.id;
                    if (_this._product.characteristics != null && _this._product.characteristics.length > 0)
                        _this.EditDescriptionSave(_this._product.characteristics);
                    _this._FilterSearch.SetRagnge(_this._product.filterISearch);
                    _this.changedproduct();
                    _this._util.alertMsg(_this.languageTraslate("Listo para editar"));
                }
            });
        };
        AddUpdateProduct_1.prototype.EditComplement = function () {
            //this._file.listImg = this._product.imgList;
            //this._file.filesMax = this._file.listImg.length;
            this.EditDescriptionSave(this._product.characteristics);
        };
        AddUpdateProduct_1.prototype.Clone = function (id) {
            var _this = this;
            this._productService.GetProductById(this._productService.rowSeletion).subscribe(function (e) {
                _this.ClearData("");
                if (e.status) {
                    _this._product = e.data;
                    _this._product.imgList = new Array();
                    _this._product.firsImg = new tblProduct_1.ImgItem();
                    _this._product.id = "00000000-0000-0000-0000-000000000000";
                    _this._product.name = _this._product.name + "-Copia";
                    _this._productService.product = e.data;
                    _this._productService.rowSeletion = e.data.id;
                    if (_this._product.characteristics != null && _this._product.characteristics.length > 0)
                        _this.EditDescriptionSave(_this._product.characteristics);
                    _this.changedproduct();
                    _this._util.alertMsg(_this.languageTraslate("Listo para editar"));
                }
            });
        };
        AddUpdateProduct_1.prototype.ChangeMenu = function (id) {
            this._util.scrollToBottom("scroll-product");
        };
        AddUpdateProduct_1.prototype.Selection = function (id) {
            this.ClearData("");
            this.InitilizeModel();
            this._productService.rowSeletion = id;
        };
        AddUpdateProduct_1.prototype.onSelectChangeDelivery = function (event) {
            var id = event.target.value;
            if (id != "0") {
                var selected = this._deliveryList.find(function (s) { return s.id == id; });
                this._product.deliveryMode = this._util.GetNameConcept(selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.id);
                this.changedproduct();
            }
        };
        AddUpdateProduct_1.prototype.ChangedIsProduct = function (mode) {
            this._product.isProduct = mode;
            this.changedproduct();
        };
        AddUpdateProduct_1.prototype.ChangedDisble = function (mode) {
            this._product.disable = mode;
            this.changedproduct();
        };
        //Mostrar para editar 
        AddUpdateProduct_1.prototype.ProductNotNull = function (product) {
            if (product == undefined)
                return false;
            if (product == null)
                return false;
            return true;
        };
        //Mostrar para editar fin
        AddUpdateProduct_1.prototype.OnselectAvailable = function (event) {
            var id = event.target.value;
            if (id != "0") {
                var selected = this._availableList.find(function (s) { return s.id == id; });
                if (selected != undefined) {
                    this._product.availableDay =
                        this._util.GetNameConcept(selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.id);
                    this.changedproduct();
                }
            }
        };
        AddUpdateProduct_1.prototype.OnselectStatus = function (event) {
            var id = event.target.value;
            var selected = this._statusList.find(function (s) { return s.id == id; });
            if (id != undefined && id != "0") {
                this._product.status =
                    this._util.GetNameConcept(selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.value, selected === null || selected === void 0 ? void 0 : selected.id);
                this._product.isPublic = ((selected === null || selected === void 0 ? void 0 : selected.value) == "public");
                this.changedproduct();
            }
        };
        AddUpdateProduct_1.prototype.OnselectTypeProduct = function (event) {
            var id = event.target.value;
            var selected = this._typeProductList.find(function (s) { return s.id == id; });
            if (id != undefined && id != "0") {
                if (selected) {
                    this._product.idTypeOfProduct = selected.id;
                    this._product.typeProductName = selected.name;
                }
                this.changedproduct();
            }
        };
        AddUpdateProduct_1.prototype.onDeleteAdress = function (id) {
            var exist = this._product.adress;
            if (exist != null)
                // this._product.adress.splice(exist, 1);
                this.changedproduct();
        };
        AddUpdateProduct_1.prototype.validateProduct = function () {
            this.loadDataObj();
            var msg = "";
            if (this._product == undefined)
                msg = "Campos requeridos";
            else if (this._product.name == undefined || this._product.name == "")
                msg = "Nombre del producto requerido";
            else if ((this._product.isProduct) && (this._product.actualPrice == undefined || this._product.actualPrice <= 10))
                msg = "El precio por unidad es requerido";
            else if (this._product.availableDay == undefined || this._product.availableDay == null)
                msg = "Disponibidad de producto es requerido";
            else if (this._product.availableDay.name == undefined || this._product.availableDay.name == null)
                msg = "Disponibidad de producto es requerido";
            else if (this._product.idTypeOfProduct == undefined || this._product.idTypeOfProduct == null)
                msg = "Tipo de producto es requerido";
            else if (this._product.deliveryMode == undefined || this._product.deliveryMode == null)
                msg = "Modo de etrega de producto es requerido";
            else if (this._product.status == undefined || this._product.status == null)
                msg = "Estatus de producto es requerido";
            else if (this._product.adress == undefined || this._product.adress == null)
                msg = "Direccion  es requerido";
            else if (this._product.characteristics == undefined || this._product.characteristics.length <= 0)
                msg = "Descricción requerida";
            else
                //if (this._productItemService._product.imgList.length <= 0)
                //  msg = "Se requiere una imagen ";
                //else
                this.saveAndUpdateProduct();
            if (msg != "")
                this._CommonService._AlertService.Alert(msg);
        };
        AddUpdateProduct_1.prototype.loadDataObj = function () {
            this.InitilizeModel();
            this._product.characteristics = new Array();
            var description = new tblProduct_1.tblCharacteristics();
            description.description = this._returnAndWarrantyPolicy;
            description.name = "POLÍTICAS PARA DEVOLUCIÓN";
            if (this._returnAndWarrantyPolicy != "" && this._returnAndWarrantyPolicy != null)
                this._product.characteristics.push(description);
            description = new tblProduct_1.tblCharacteristics();
            description.description = this._technicalSpecifications;
            description.name = "ESPECIFICACIONES TÉCNICAS";
            if (this._technicalSpecifications != "" && this._technicalSpecifications != null)
                this._product.characteristics.push(description);
            description = new tblProduct_1.tblCharacteristics();
            description.description = this._instructionsforUse;
            description.name = "INSTRUCCIONES DE USO";
            if (this._instructionsforUse != "" && this._instructionsforUse != null)
                this._product.characteristics.push(description);
            description = new tblProduct_1.tblCharacteristics();
            description.description = this._description;
            if (this._description != "" && this._description != null)
                description.name = "DESCRIPCIÓN GENERAL";
            this._product.characteristics.push(description);
            this._product.filterISearch = this._FilterSearch.GetListFilter();
        };
        AddUpdateProduct_1.prototype.EditDescriptionSave = function (list) {
            if (list.length > 0) {
                var item = list.find(function (s) { return s.name.trim() == "DESCRIPCIÓN GENERAL"; });
                if (item != undefined)
                    this._description = item === null || item === void 0 ? void 0 : item.description;
                item = new tblProduct_1.tblCharacteristics();
                item = list.find(function (s) { return s.name.trim() == "ESPECIFICACIONES TÉCNICAS"; });
                if (item != undefined)
                    this._technicalSpecifications = item === null || item === void 0 ? void 0 : item.description;
                item = new tblProduct_1.tblCharacteristics();
                item = list.find(function (s) { return s.name.trim() == "INSTRUCCIONES DE USO"; });
                if (item != undefined)
                    this._instructionsforUse = item === null || item === void 0 ? void 0 : item.description;
                item = new tblProduct_1.tblCharacteristics();
                item = list.find(function (s) { return s.name.trim() == "POLÍTICAS PARA DEVOLUCIÓN"; });
                if (item != undefined)
                    this._returnAndWarrantyPolicy = item === null || item === void 0 ? void 0 : item.description;
            }
        };
        AddUpdateProduct_1.prototype.GetCleaner = function (text) {
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
        };
        AddUpdateProduct_1.prototype.GetListAvailableConcept = function (type) {
            var _this = this;
            this._availableList = new Array();
            var result = this._http.GetListByName("ALL", type, 0);
            result.subscribe(function (e) {
                _this._availableList = e.data;
                if (_this._cdRef != null)
                    _this._cdRef.detectChanges();
            });
        };
        AddUpdateProduct_1.prototype.GetListStatusConcept = function (type) {
            var _this = this;
            this._statusList = new Array();
            var result = this._http.GetListByName("ALL", type, 0);
            result.subscribe(function (e) {
                _this._statusList = e.data;
                if (_this._cdRef != null)
                    _this._cdRef.detectChanges();
            });
        };
        AddUpdateProduct_1.prototype.GetListConceptStatus = function (type, page) {
            var _this = this;
            this._statusList = new Array();
            var result = this._http.GetListByName("ALL", type, 0);
            result.subscribe(function (e) {
                _this._statusList = e.data;
                if (_this._cdRef != null)
                    _this._cdRef.detectChanges();
            });
        };
        AddUpdateProduct_1.prototype.GetListConceptTypeProduct = function (type, page) {
            var _this = this;
            this._typeProductList = new Array();
            var result = this._http.GetListByName("ALL", type, 0);
            result.subscribe(function (e) {
                _this._typeProductList = e.data;
                if (_this._cdRef != null)
                    _this._cdRef.detectChanges();
            });
        };
        AddUpdateProduct_1.prototype.GetListConceptDelivery = function (type, page) {
            var _this = this;
            this._deliveryList = new Array();
            this._http.GetListByName("ALL", type, 0).subscribe(function (e) {
                _this._deliveryList = e.data;
                if (_this._cdRef != null)
                    _this._cdRef.detectChanges();
            });
        };
        AddUpdateProduct_1.prototype.GetListReferProduct = function () {
            return this._productService.GetListReferProduct();
        };
        AddUpdateProduct_1.prototype.SearchImg = function (filter) {
            var _this = this;
            this.listImgeLoading = true;
            this._listImge = new Array();
            this._http.GetListImgByIdCompany(filter, 0).subscribe(function (e) {
                _this._listImge = e.data;
                _this.listImgeLoading = false;
            });
            if (this._cdRef != null)
                this._cdRef.detectChanges();
        };
        AddUpdateProduct_1.prototype.SelectImg = function (img) {
            this.InitilizeModel();
            if (this._product.imgList == null)
                return false;
            var exist = undefined;
            if (this._product.imgList)
                exist = this._product.imgList.find(function (s) { return s.id == img.id; });
            if (exist == undefined) {
                this._product.imgList.push(img);
            }
            return true;
        };
        AddUpdateProduct_1.prototype.setViewNewImg = function (mode) {
            this._file.Setvisible(mode);
            if (mode) {
                this.closeViewAddImg(!mode);
            }
        };
        AddUpdateProduct_1.prototype.closeViewAddImg = function (mode) {
            this._viewAddImg = mode;
            if (mode) {
                this.setViewNewImg(!mode);
            }
        };
        AddUpdateProduct_1.prototype.GetPriceToString = function (value) {
            return value.toString();
        };
        AddUpdateProduct_1.prototype.changedInputName = function (value) {
            var data = this.GetListReferProduct();
            var item = data.find(function (s) { return s.id == value; });
            if (item != undefined) {
                this._product.name = item.name;
                this._product.referNumber = item.id;
                this._product.actualPrice = item.price;
            }
            else {
                this._product.name = "";
            }
            this.changedproduct();
        };
        AddUpdateProduct_1.prototype.changedInputReferNumber = function (value) {
            this._product.referNumber = value;
            this.changedproduct();
        };
        AddUpdateProduct_1.prototype.changedImgSelect = function (img) {
            if (this._product == undefined)
                this._product = new tblProduct_1.tblProduct();
            this._product.firsImg = img;
            this.changedproduct();
            if (this._cdRef != undefined)
                this._cdRef.detectChanges();
        };
        AddUpdateProduct_1.prototype.changedproduct = function () {
            if (this._product != null && this._product != undefined)
                this._product.name = this._product.name.toUpperCase();
            this._FilterSearch.SetRagnge(this._product.filterISearch);
            //if (this._product.imgList != undefined)
            //  this._file.listImg = this._product.imgList;
            this._product.priceString = this.ConverCurrency(this._product.actualPrice);
            if (this._cdRef != null)
                this._cdRef.detectChanges();
        };
        AddUpdateProduct_1.prototype.GetLisImage = function () {
            return this._product.imgList;
        };
        AddUpdateProduct_1.prototype.GetFirsImage = function () {
            return this._CommonService._ConfigService.GetUrlImgItem(this._product.firsImg, "PHONE");
        };
        AddUpdateProduct_1.prototype.descriptionLoad = function () {
            this._product.characteristics = new Array();
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Descripción general";
            item.description = this._description;
            this._product.characteristics.push(item);
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Especificaciones técnicas";
            item.description = this._technicalSpecifications;
            this._product.characteristics.push(item);
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Instrucciones de uso";
            item.description = this._instructionsforUse;
            this._product.characteristics.push(item);
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Política de devolución y garantía";
            item.description = this._returnAndWarrantyPolicy;
            this._product.characteristics.push(item);
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Modo de entrega";
            item.description = this._product.deliveryMode.name;
            this._product.characteristics.push(item);
            var item = new tblProduct_1.tblCharacteristics();
            item.name = "Tiempos de entrega";
            item.description = this._deliveryTimes;
            this._product.characteristics.push(item);
        };
        AddUpdateProduct_1.prototype.GetUrl = function (imgName) {
            return this._configservice.GetUrlImgItem(imgName, "PHONE");
        };
        AddUpdateProduct_1.prototype.languageTraslate = function (value) {
            return value;
        };
        AddUpdateProduct_1.prototype.ConverCurrency = function (actualPrice) {
            if (isNaN(actualPrice))
                actualPrice = 0;
            var numberValue = this._util.ConverCurrency(actualPrice);
            return numberValue;
        };
        AddUpdateProduct_1.prototype.VisibleAgregateFilter = function () {
            this._FilterSearch.isVisible = true;
        };
        AddUpdateProduct_1.prototype.ListProductAdd = function (prodcut) {
            this._productService._listProduct.push(prodcut);
        };
        AddUpdateProduct_1.prototype.ListProductRemove = function (id) {
            (this._productService._listProduct != null);
            this._productService._listProduct = this._productService._listProduct.filter(function (s) { return s.id != id; });
        };
        AddUpdateProduct_1.prototype.FilterProduct = function (value) {
            //this._productService._listProduct = this._productService._listProduct.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
            this._productService.GetAllProduct(value, this.type, this.page);
        };
        AddUpdateProduct_1.prototype.FilterCancel = function (value) {
            this.page = 1;
            this.loadPoduct();
        };
        AddUpdateProduct_1.prototype.InitilizeModel = function () {
            if (this._productService.product == undefined)
                this._productService.product = new tblProduct_1.tblProduct();
            if (this._productService._listProduct == undefined)
                this._productService._listProduct = new Array;
            if (this._product.historyOfPrice == null)
                this._product.historyOfPrice = new Array;
            if (this._product.conceptCompany == undefined)
                this._product.conceptCompany = new tblProduct_1.NameConcept();
            if (this._product.conceptPrevious == undefined)
                this._product.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._product.conceptProject == undefined)
                this._product.conceptProject = new tblProduct_1.NameConcept();
            if (this._product.typeCurrency == undefined)
                this._product.typeCurrency = new tblProduct_1.tblConcepValue();
            if (this._product.typeCurrency.conceptProject == undefined)
                this._product.typeCurrency.conceptProject = new tblProduct_1.NameConcept();
            if (this._product.typeCurrency.conceptCompany == undefined)
                this._product.typeCurrency.conceptCompany = new tblProduct_1.NameConcept();
            if (this._product.typeCurrency.conceptPrevious == undefined)
                this._product.typeCurrency.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._product.typeCurrency == undefined)
                this._product.typeCurrency = new tblProduct_1.tblConcepValue();
            this._product.typeCurrency.id = this._util.GuidEmpty();
        };
        AddUpdateProduct_1.prototype.ClearData = function (id) {
            this._product = new tblProduct_1.tblProduct();
            this._FilterSearch.Clear();
            this._description = "";
            this._deliveryDeadlines = "";
            this._deliveryDeadlines = "";
            this._deliveryTimes = "";
            this._productService.product = new tblProduct_1.tblProduct();
            this._productService.rowSeletion = "";
            this._product.disable = true;
            this._technicalSpecifications = "";
            this._returnAndWarrantyPolicy = "";
            this._instructionsforUse = "";
            this._deliveryTimes = "";
            this._description = "";
            if (this._cdRef != undefined)
                this._cdRef.detectChanges();
        };
        AddUpdateProduct_1.prototype.NullProductSelectId = function (id) {
            if (this._productService.rowSeletion == undefined)
                return false;
            if (this._productService.rowSeletion == "")
                return false;
            if (id != "0") {
                if (this._productService.rowSeletion == id)
                    return true;
            }
            else {
                if (this._productService.rowSeletion != "")
                    return true;
            }
            return false;
        };
        AddUpdateProduct_1.prototype.ClearPricePublic = function () {
            if (this._product.priceString != "")
                this._product.priceString = "";
        };
        AddUpdateProduct_1.prototype.ClearPriceInternal = function () {
            if (this._priceUnidInternal != "")
                this._priceUnidInternal = "";
        };
        AddUpdateProduct_1.prototype.GetStatusProduct = function (product) {
            if (product.disable)
                return "En Verificación";
            if (product.isPublic)
                return "Publicado";
            return "Privado";
        };
        return AddUpdateProduct_1;
    }());
    __setFunctionName(_classThis, "AddUpdateProduct");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AddUpdateProduct = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AddUpdateProduct = _classThis;
}();
exports.AddUpdateProduct = AddUpdateProduct;
//# sourceMappingURL=app.product-add-update-product.js.map