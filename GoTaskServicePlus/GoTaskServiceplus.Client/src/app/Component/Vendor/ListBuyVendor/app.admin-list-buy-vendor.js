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
exports.AdminListBuyVendorComponet = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_product_item_product_cart_1 = require("../../Product/ProductItemCart/app.product-item-product-cart");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var app_common_popup_msg_1 = require("../../Common/PopupMsg/app.common-popup-msg");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var AdminListBuyVendorComponet = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-admin-list-buy-vendor',
            templateUrl: './app.admin-list-buy-vendor.component.html',
            styleUrls: ['app.admin-list-buy-vendor.css'],
            imports: [app_product_item_product_cart_1.ItemCartComponet, app_common_loading_1.LoadingComponent, forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent, app_common_popup_msg_1.PopupMsgComponent, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminListBuyVendorComponet = _classThis = /** @class */ (function () {
        function AdminListBuyVendorComponet_1(route, titleService, param, ListBuyService, loading, buyProduct, configservice, Permission, _cdRef) {
            this.route = route;
            this._cdRef = _cdRef;
            this.type = "all";
            this.page = 0;
            this._listGuid = new Array;
            this.idBuySelectDetail = "";
            this._param = param;
            this._titleService = titleService;
            this._ListBuyService = ListBuyService;
            this._loading = loading;
            this._BuyProduct = buyProduct;
            this._configservice = configservice;
            this._Permission = Permission;
        }
        AdminListBuyVendorComponet_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("admin-buy");
            if (status) {
                this._titleService.setTitle('Mis ventas');
                this._ListBuyService.stausBuy = this._ListBuyService._movementType.purchaseGenerated;
                this.loadData();
            }
        };
        AdminListBuyVendorComponet_1.prototype.GetGroup = function (list, group) {
            return list.filter(function (s) { return s.purchareId == group; });
        };
        AdminListBuyVendorComponet_1.prototype.GetGroupPrice = function (group) {
            var pricesList = this._ListBuyService._listProduct.filter(function (s) { return s.purchareId == group; });
            var prices = 0;
            pricesList.forEach(function (e) {
                prices += (e.salePrice * e.quantity);
            });
            this._ListBuyService._movementType.purchaseCompleted;
            return this.converCurrency(prices);
        };
        AdminListBuyVendorComponet_1.prototype.GetDateGroup = function (group) {
            var pricesList = this._ListBuyService._listProduct.find(function (s) { return s.purchareId == group; });
            if (pricesList) {
                var fecha = new Date(pricesList.creationDate.split(" ")[0]);
                var fechaTexto = fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return pricesList.creationDate.split(" ")[0].toUpperCase();
            }
            return "-";
        };
        AdminListBuyVendorComponet_1.prototype.GetGroupDetail = function (group, name) {
            var data = "";
            var detail = this._ListBuyService._listProduct.find(function (s) { return s.purchareId == group; });
            if (detail != undefined) {
                if (name == "user.Name")
                    data = detail.user.name;
                if (name == "user.mobileNumber")
                    data = detail.user.mobileNumber;
                if (name == "user.numberPurchase")
                    data = detail.numberPurchase;
                if (name == "detail.id")
                    data = detail.id;
                if (name == "detail.statusMovementItem")
                    data = detail.statusMovementItem;
            }
            return data;
        };
        AdminListBuyVendorComponet_1.prototype.GetCountList = function (name) {
            if (this._ListBuyService.countBuy) {
                if (name == "quantityCancelByAdmin")
                    return this._ListBuyService.countBuy.quantityCancelByAdmin;
                if (name == "purchaseCancelledByCustomer")
                    return this._ListBuyService.countBuy.quantityCancelByCustomer;
                if (name == "purchaseCancelledByVendor")
                    return this._ListBuyService.countBuy.quantityCancelByVendor;
                if (name == "purchaseCompleted")
                    return this._ListBuyService.countBuy.quantityCompleted;
                if (name == "purchaseInDelivery")
                    return this._ListBuyService.countBuy.quantityDelivery;
                if (name == "purchaseGenerated")
                    return this._ListBuyService.countBuy.quantityGenerate;
                if (name == "purchaseInProcess")
                    return this._ListBuyService.countBuy.quantityProcess;
            }
            return 0;
        };
        AdminListBuyVendorComponet_1.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._loading.Loading(true);
                    this._ListBuyService.GetAllBuyStatus(this._ListBuyService.stausBuy);
                    return [2 /*return*/];
                });
            });
        };
        AdminListBuyVendorComponet_1.prototype.SelectedDetail = function (id) {
            this.idBuySelectDetail = id;
            this._cdRef.detectChanges();
        };
        AdminListBuyVendorComponet_1.prototype.CancelBuy = function (id) {
            this._ListBuyService.ChangedStatusBuy(id, this._ListBuyService._movementType.purchaseCancelledByVendor);
        };
        AdminListBuyVendorComponet_1.prototype.ChangedStatus = function (id, mode) {
            this._ListBuyService.ChangedStatusBuy(id, mode);
        };
        AdminListBuyVendorComponet_1.prototype.Delete = function (id) {
            this._ListBuyService.Delete(id);
        };
        AdminListBuyVendorComponet_1.prototype.GetNewStatus = function (status) {
            this._ListBuyService.stausBuy = status;
            this._ListBuyService.GetAllBuyStatus(status);
            this._cdRef.detectChanges();
        };
        AdminListBuyVendorComponet_1.prototype.StatusPage = function (page) {
            return (this._ListBuyService.stausBuy == page);
        };
        AdminListBuyVendorComponet_1.prototype.GetUrlImg = function (name, scaleTo) {
            var url = this._configservice.GetUrlImgBuy(name, scaleTo);
            return url;
        };
        AdminListBuyVendorComponet_1.prototype.SetPhoneNumber = function (product) {
            console.log(product);
            //var url = "https://api.whatsapp.com/send?phone=57" + product.mobileNumber + "&text=Me interesa este producto: " + product.name;
            //window.open(url, '_blank');
        };
        AdminListBuyVendorComponet_1.prototype.GetRowSelect = function () {
            return this._ListBuyService.rowSeletion;
        };
        AdminListBuyVendorComponet_1.prototype.NullProductSelectId = function (id) {
            if (this._ListBuyService.rowSeletion == undefined)
                return false;
            return false;
        };
        AdminListBuyVendorComponet_1.prototype.Selection = function (id) {
            this._ListBuyService.rowSeletion = id;
        };
        AdminListBuyVendorComponet_1.prototype.converCurrency = function (actualPrice) {
            /*  if (!isNaN(actualPrice)) {*/
            /*      this._product.actualPrice = this._price.price;*/
            var numberValue = Intl.NumberFormat('es-CO', { style: 'currency', currency: "COP", minimumFractionDigits: 0 }).format(actualPrice);
            var priceString = numberValue;
            /* }*/
            return priceString;
        };
        return AdminListBuyVendorComponet_1;
    }());
    __setFunctionName(_classThis, "AdminListBuyVendorComponet");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminListBuyVendorComponet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminListBuyVendorComponet = _classThis;
}();
exports.AdminListBuyVendorComponet = AdminListBuyVendorComponet;
//# sourceMappingURL=app.admin-list-buy-vendor.js.map