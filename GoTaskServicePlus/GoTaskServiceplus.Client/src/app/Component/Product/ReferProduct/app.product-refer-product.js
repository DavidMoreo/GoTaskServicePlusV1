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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferProduct = void 0;
var core_1 = require("@angular/core");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var app_permission_1 = require("../../Permission/app.permission");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var app_custom_control_btn_on_off_1 = require("../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off");
var ReferProduct_1 = require("../../../Models/Product/ReferProduct");
var app_common_input_text_1 = require("../../Common/CustomControl/ImputText/app.common-input-text");
var app_common_input_select_1 = require("../../Common/CustomControl/ImputSelect/app.common-input-select");
var ReferProduct = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-refer-product',
            templateUrl: 'app.product-refer-product.component.html',
            styleUrls: ['app.product-refer-product.css'],
            imports: [app_common_loading_1.LoadingComponent, app_permission_1.PermissionComponent, forms_1.FormsModule, common_1.CommonModule, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent, app_custom_control_btn_on_off_1.BtnOnOffComponent, app_common_input_text_1.InputTextComponent, app_common_input_select_1.SelectInputComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _select_decorators;
    var _select_initializers = [];
    var _select_extraInitializers = [];
    var ReferProduct = _classThis = /** @class */ (function () {
        function ReferProduct_2(_CommonService, _Permission, refer) {
            this._CommonService = _CommonService;
            this._Permission = _Permission;
            this.refer = refer;
            this.tempRefer = new ReferProduct_1.tblReferProduct();
            this.tempPrice = new tblProduct_1.tblPrices();
            this.listSelectType = new Array;
            this.select = __runInitializers(this, _select_initializers, void 0);
            this.page = (__runInitializers(this, _select_extraInitializers), 0);
            this.addPrice = true;
        }
        ReferProduct_2.prototype.ngDoCheck = function () {
        };
        ReferProduct_2.prototype.LoadTypes = function () {
            var model = new ReferProduct_1.TypePrice();
            this.listSelectType = new Array;
            var data = new tblProduct_1.NameConcept();
            data.id = model.isACost;
            data.name = "Es un costo $";
            this.listSelectType.push(data);
            data = new tblProduct_1.NameConcept();
            data.id = model.isADiscount;
            data.name = "Es un descuento en moneda $";
            this.listSelectType.push(data);
            data = new tblProduct_1.NameConcept();
            data.id = model.isADiscountInPorcentage;
            data.name = "Es un descuento en %";
            this.listSelectType.push(data);
            data = new tblProduct_1.NameConcept();
            data.id = model.isProfitInMoney;
            data.name = "Ganancia en $";
            this.listSelectType.push(data);
            data = new tblProduct_1.NameConcept();
            data.id = model.isProfitInPorcentage;
            data.name = "Ganancia en %";
            this.listSelectType.push(data);
            return this.listSelectType;
        };
        ReferProduct_2.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("refer-product");
            if (status) {
                this.LoadTypes();
                this.GetAll("all", 1);
            }
        };
        ReferProduct_2.prototype.GetAllReferByCompanyId = function () {
            this.refer.GetAllReferByCompanyId();
        };
        ReferProduct_2.prototype.GetAll = function (filter, page) {
            this.refer.GetAll(filter, page);
        };
        ReferProduct_2.prototype.Save = function () {
            console.log("Save", this.tempRefer);
            this.tempRefer.price = this.Total(this.tempRefer);
            if (this.Validate(this.tempRefer) == "") {
                this.refer.Save(this.tempRefer);
                this.ClearNewRefer();
            }
        };
        ReferProduct_2.prototype.Validate = function (data) {
            var msg = "";
            if (!data)
                msg = "Todos los campos son requeridos";
            if (data.name == "")
                msg = "Nombre requerido";
            if (data.quantity == 0)
                data.quantity = 1;
            if (msg != "")
                this._CommonService._AlertService.Alert(msg, "#fd625e");
            return msg;
        };
        ReferProduct_2.prototype.Delete = function (id) {
            this.refer.DeleteById(id);
        };
        ReferProduct_2.prototype.Edit = function (id) {
            var _this = this;
            var result = this.refer.GetById(id);
            result.subscribe(function (e) {
                _this.tempRefer = e.data;
                _this.addPrice = true;
            });
        };
        ReferProduct_2.prototype.Clone = function (id) {
            var _this = this;
            var result = this.refer.GetById(id);
            result.subscribe(function (e) {
                _this.tempRefer = e.data;
                _this.tempRefer.id = _this._CommonService._UtilitiService.GuidEmpty();
            });
        };
        ReferProduct_2.prototype.Selection = function (item) {
            this.refer.rowSeletion = item;
            if (item.prices != undefined) {
                //this.allPrice = item.prices[0]
            }
            this.ActiveAddPrice(false);
        };
        ReferProduct_2.prototype.OnSubmit = function () {
            //this.ClearNewPrice();
            //this.ActiveAddPrice(true);
            //this.ActiveAddPrice(false);
        };
        ReferProduct_2.prototype.ClearData = function (id) {
            this.Clear();
        };
        ReferProduct_2.prototype.Clear = function () {
            this.refer.rowSeletion = new ReferProduct_1.tblReferProduct();
            this.ClearNewRefer();
            this.ActiveAddPrice(true);
            this.ClearNewPrice();
        };
        ReferProduct_2.prototype.ClearNewPrice = function () {
            this.tempPrice = new tblProduct_1.tblPrices();
        };
        ReferProduct_2.prototype.ClearNewRefer = function () {
            this.tempRefer = new ReferProduct_1.tblReferProduct();
        };
        ReferProduct_2.prototype.ChangeMenu = function (id) {
            // this._util.scrollToBottom("scroll-product");
        };
        ReferProduct_2.prototype.OnselectAvailable = function (event) {
            var id = event.target.value;
        };
        ReferProduct_2.prototype.NullProductSelectId = function () {
            if (this.refer.rowSeletion) {
                if (this.refer.rowSeletion.id)
                    if (this.refer.rowSeletion.id != this._CommonService._UtilitiService.GuidEmpty())
                        return true;
            }
            return false;
        };
        ReferProduct_2.prototype.IsSelection = function (item) {
            if (this.refer.rowSeletion)
                if (item.id == this.refer.rowSeletion.id)
                    if (this.refer.rowSeletion.id != this._CommonService._UtilitiService.GuidEmpty())
                        return true;
            return false;
        };
        //#Grid
        ReferProduct_2.prototype.FilterProduct = function (filter) {
        };
        ReferProduct_2.prototype.FilterCancel = function (filter) {
        };
        ReferProduct_2.prototype.GoPage = function (count) {
        };
        ReferProduct_2.prototype.GoBackPageData = function (count) {
        };
        //End Grid
        ReferProduct_2.prototype.ChangedInputReferName = function (value) {
            this.tempRefer.name = value;
        };
        ReferProduct_2.prototype.ChangedInputReferQuantity = function (value) {
            this.tempRefer.quantity = Number.parseInt(value);
        };
        ReferProduct_2.prototype.ChangedInputRefer = function (value) {
            this.tempRefer.refer = value;
        };
        ReferProduct_2.prototype.ChangedIsPercentage = function (value) {
            this.tempPrice.price;
        };
        ReferProduct_2.prototype.ChangedInputTypePrice = function (value) {
            this.tempPrice.typeAction = value;
        };
        // Price
        ReferProduct_2.prototype.ChangedInputPrice = function (value) {
            this.tempPrice.price = Number.parseInt(value);
        };
        ReferProduct_2.prototype.ChangedInputPriceName = function (value) {
            this.tempPrice.name = value;
        };
        ReferProduct_2.prototype.ChangedDisble = function (mode) {
            this.tempPrice.isPublic = mode;
        };
        ReferProduct_2.prototype.AddPrice = function () {
            //this.LoadPriceModel();
            var data = this.refer.GetItemRefer(this.refer.rowSeletion);
            console.log("this.refer.rowSeletion", data);
            data === null || data === void 0 ? void 0 : data.prices.push(this.tempPrice);
            //data.price = this.Total(data?.prices);
            this.tempRefer = data;
            if (data != undefined)
                this.Save();
            this.ClearNewPrice();
        };
        ReferProduct_2.prototype.RemovePrice = function (price) {
            this.LoadPriceModel();
            this.refer.rowSeletion.prices = this.refer.rowSeletion.prices.filter(function (s) { return s.id != price.id; });
            this.tempRefer = this.refer.rowSeletion;
            this.Save();
            this.ClearNewPrice();
        };
        ReferProduct_2.prototype.ActiveAddPrice = function (mode) {
            this.addPrice = mode;
        };
        ReferProduct_2.prototype.LoadPriceModel = function () {
            if (this.refer.rowSeletion.prices == null)
                this.refer.rowSeletion.prices = new Array;
        };
        //#Vista
        ReferProduct_2.prototype.GetListRefer = function () {
            return this.refer.GetListRefer();
        };
        ReferProduct_2.prototype.GetRefer = function () {
            return this.refer.GetListRefer();
        };
        ReferProduct_2.prototype.GetReferRowSelect = function () {
            if (this.refer.rowSeletion)
                return this.refer.rowSeletion.id;
            else
                return "";
        };
        ReferProduct_2.prototype.GetListPrice = function (referProduct) {
            this.LoadPriceModel();
            return referProduct.prices;
        };
        ReferProduct_2.prototype.GetValueToString = function (value) {
            if (value)
                return value.toString();
            return "";
        };
        ReferProduct_2.prototype.IsCost = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isACost && !s.isPublic; });
            return list;
        };
        ReferProduct_2.prototype.IsProfitInMoney = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isProfitInMoney; });
            return list;
        };
        ReferProduct_2.prototype.IsProfitInPorcentage = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isProfitInPorcentage; });
            return list;
        };
        ReferProduct_2.prototype.IsCostPublic = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isACost && s.isPublic; });
            return list;
        };
        ReferProduct_2.prototype.IsADiscount = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isADiscount; });
            return list;
        };
        ReferProduct_2.prototype.IsADiscountPorcentage = function (prices) {
            var type = new ReferProduct_1.TypePrice();
            var list = prices.filter(function (s) { return s.typeAction == type.isADiscountInPorcentage; });
            return list;
        };
        ReferProduct_2.prototype.Total = function (refer) {
            var type = new ReferProduct_1.TypePrice();
            var cost = this.IsCost(refer.prices);
            var costPublic = this.IsCostPublic(refer.prices);
            var discount = this.IsADiscount(refer.prices);
            var discountPorcentage = this.IsADiscountPorcentage(refer.prices);
            var profitInMoney = this.IsProfitInMoney(refer.prices);
            var profitInPorcentage = this.IsProfitInPorcentage(refer.prices);
            //Suma todo los valores 
            var total = 0;
            cost.forEach(function (s) {
                total += s.price;
            });
            //Calcular valor del producto en base a los costos y cantidad
            if (total > 0) {
                total = (total / refer.quantity);
            }
            ;
            // Sumar el valor  a ganar 
            if (profitInMoney.length > 0) {
                var value_1 = 0;
                profitInMoney.forEach(function (e) {
                    value_1 += e.price;
                });
                total = total + value_1;
            }
            // Sumar el valor  a  en porcentaje 
            if (profitInPorcentage.length > 0) {
                var value_2 = 0;
                profitInPorcentage.forEach(function (e) {
                    value_2 += e.price;
                });
                total = total + ((total * value_2) / 100);
            }
            //Si hay descuento se aplica 
            if (discount.length > 0) {
                var value_3 = 0;
                discount.forEach(function (e) {
                    value_3 += e.price;
                });
                console.log("Descuento", value_3);
                total = total - value_3;
            }
            // Resta el valor  a  en porcentaje 
            if (discountPorcentage.length > 0) {
                var value_4 = 0;
                discountPorcentage.forEach(function (e) {
                    value_4 += e.price;
                });
                total = total - ((total * value_4) / 100);
            }
            //Suma los costoas adicioanles como envio o demas
            costPublic.forEach(function (s) {
                total += s.price;
            });
            var temp = this.GetPriceCurrency(total);
            return total;
        };
        ReferProduct_2.prototype.IsNumber = function () {
            var type = new ReferProduct_1.TypePrice();
            if (this.tempPrice != undefined) {
                if (this.tempPrice.typeAction == type.isADiscountInPorcentage)
                    return true;
                if (this.tempPrice.typeAction == type.isProfitInPorcentage)
                    return true;
            }
            return false;
        };
        ReferProduct_2.prototype.GetPriceToString = function (value) {
            return value + "".toString();
        };
        ReferProduct_2.prototype.GetPriceCurrency = function (value) {
            return this._CommonService._UtilitiService.ConverCurrency(value);
        };
        //#End Vista
        ReferProduct_2.prototype.languageTraslate = function (value) {
            return value;
        };
        return ReferProduct_2;
    }());
    __setFunctionName(_classThis, "ReferProduct");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _select_decorators = [(0, core_1.ViewChild)(app_common_input_select_1.SelectInputComponent)];
        __esDecorate(null, null, _select_decorators, { kind: "field", name: "select", static: false, private: false, access: { has: function (obj) { return "select" in obj; }, get: function (obj) { return obj.select; }, set: function (obj, value) { obj.select = value; } }, metadata: _metadata }, _select_initializers, _select_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReferProduct = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReferProduct = _classThis;
}();
exports.ReferProduct = ReferProduct;
//# sourceMappingURL=app.product-refer-product.js.map