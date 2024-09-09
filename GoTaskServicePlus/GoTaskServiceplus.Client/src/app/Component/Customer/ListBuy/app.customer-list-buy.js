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
exports.ListBuyComponet = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_product_item_product_cart_1 = require("../../Product/ProductItemCart/app.product-item-product-cart");
var common_1 = require("@angular/common");
var tblBuyerCustomer_1 = require("../../../Models/Structure/tblBuyerCustomer");
var app_menu_phone_1 = require("../../Common/MenuPhone/app.menu-phone");
var ListBuyComponet = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-customer-list-buy',
            templateUrl: './app.customer-list-buy.component.html',
            styleUrls: ['app.customer-list-buy.css'],
            imports: [app_product_item_product_cart_1.ItemCartComponet, app_common_loading_1.LoadingComponent, forms_1.FormsModule, common_1.CommonModule, app_menu_phone_1.MenuPhone]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ListBuyComponet = _classThis = /** @class */ (function () {
        function ListBuyComponet_1(route, titleService, param, ListBuyService, loading, buyProduct, configservice) {
            this.route = route;
            this.type = "all";
            this.page = 0;
            this._listGuid = new Array;
            this._movementType = new tblBuyerCustomer_1.MovementType();
            this._param = param;
            this._titleService = titleService;
            this._ListBuyService = ListBuyService;
            this._loading = loading;
            this._BuyProduct = buyProduct;
            this._configservice = configservice;
        }
        ListBuyComponet_1.prototype.ngOnInit = function () {
            this._titleService.setTitle('Mi carrito de compras');
            this.loadData();
        };
        ListBuyComponet_1.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._loading.Loading(true);
                    this._ListBuyService.GetAllProduct(0);
                    return [2 /*return*/];
                });
            });
        };
        ListBuyComponet_1.prototype.GetUrlImg = function (image, scaleTo) {
            var url = this._configservice.GetUrlImgBuy(image, scaleTo);
            return url;
        };
        ListBuyComponet_1.prototype.GetCity = function (list) {
            var data = Array();
            list.forEach(function (e) {
                data.push(e.value);
            });
            return data;
        };
        ListBuyComponet_1.prototype.CancelBuy = function (id) {
            this._ListBuyService.CancelBuy(id);
        };
        ListBuyComponet_1.prototype.GetGroup = function () {
            var data = this._ListBuyService._listProduct.map(function (s) { return s.purchareId; });
            var uniqueData = data.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            return uniqueData;
        };
        ListBuyComponet_1.prototype.GetGroupList = function (purchareId) {
            var t = new Array();
            t = JSON.parse(JSON.stringify(this._ListBuyService._listProduct));
            return t.filter(function (s, index, self) {
                return index === self.findIndex(function (t) { return t.purchareId === s.purchareId && t.purchareId === purchareId; });
            });
        };
        ListBuyComponet_1.prototype.GetGroupPrice = function (purchareId) {
            var pricesList = this._ListBuyService._listProduct.filter(function (s) { return s.purchareId == purchareId; });
            var prices = 0;
            pricesList.forEach(function (e) {
                prices += (e.salePrice * e.quantity);
            });
            return this.converCurrency(prices);
        };
        ListBuyComponet_1.prototype.converCurrency = function (actualPrice) {
            var numberValue = Intl.NumberFormat('es-CO', { style: 'currency', currency: "COP", minimumFractionDigits: 0 }).format(actualPrice);
            var priceString = numberValue;
            return priceString;
        };
        ListBuyComponet_1.prototype.GetExistPurcchare = function () {
            if (this._ListBuyService != undefined) {
                if (this._ListBuyService._listProduct == undefined)
                    return true;
                if (this._ListBuyService._listProduct == null)
                    return true;
                if (this._ListBuyService._listProduct.length <= 0)
                    return true;
            }
            return false;
        };
        return ListBuyComponet_1;
    }());
    __setFunctionName(_classThis, "ListBuyComponet");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListBuyComponet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListBuyComponet = _classThis;
}();
exports.ListBuyComponet = ListBuyComponet;
//# sourceMappingURL=app.customer-list-buy.js.map