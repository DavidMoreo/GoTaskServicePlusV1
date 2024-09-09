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
exports.ListProduct = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_product_item_product_1 = require("../ProductItem/app.product-item-product");
var app_alert_buy_product_1 = require("../../Common/AlertBuyProduct/app.alert-buy-product");
var Coordinates_1 = require("../../../Models/Common/Coordinates");
var ListProduct = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-product-list-product',
            templateUrl: './app.product-list-product.component.html',
            styleUrls: ['app.product-list-product.css'],
            imports: [app_product_item_product_1.ItemProductView, app_common_loading_1.LoadingComponent, forms_1.FormsModule, app_alert_buy_product_1.AlertBuyProductComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ListProduct = _classThis = /** @class */ (function () {
        function ListProduct_1(_FavoriteService, _Cart, route, service, loading, AlertBuyService, Gps, permission, _CommonService) {
            this._FavoriteService = _FavoriteService;
            this._Cart = _Cart;
            this.route = route;
            this.Gps = Gps;
            this.permission = permission;
            this._CommonService = _CommonService;
            this.valueSeacrh = "";
            this._listProduct = new Array;
            this.counHttp = 0;
            this.limitHttp = 4;
            this._service = service;
            this._loading = loading;
            this._AlertBuyService = AlertBuyService;
        }
        ListProduct_1.prototype.ngOnInit = function () {
            if (this.permission.ValidationStatusLogin()) {
                this._FavoriteService.LoadFavorite();
                this._Cart.LoadCart();
            }
            this.GetAllProduct();
            this._loading.Loading(true);
            this.permission.ValidationLogin("list-product", false);
        };
        ListProduct_1.prototype.GetAllProduct = function () {
            var _this = this;
            this._loading.Loading(true);
            this._service.GetAllProduct("0").subscribe({
                next: function (e) {
                    if (e.status) {
                        _this._listProduct = e.data;
                        if (_this._listProduct.length <= 0)
                            _this._CommonService._AlertService.Alert("Tu negocio no tiene productos a mostrar, de crear y publicar un nuevo producto.");
                        _this._loading.Loading(false);
                    }
                },
                error: function () {
                    _this.ReloadHttp();
                }
            });
        };
        ListProduct_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ListProduct_1.prototype.ScrollOff = function () {
            var elemento = document.getElementById('scroll-list-product'); // Reemplaza 'tuElemento' con el ID de tu elemento HTML
            if (elemento != null) {
                elemento.classList.remove('scroll-container');
            }
        };
        ListProduct_1.prototype.GetListNull = function () {
            if (this._listProduct == undefined || this._listProduct.length <= 0)
                return true;
            return false;
        };
        ListProduct_1.prototype.GetDistanceProduct = function (concepts) {
            if (concepts == null || concepts == undefined)
                return "";
            var concept = concepts;
            2;
            if (concept == null || concept == undefined)
                return "";
            if (concept.value == null || concept.value == undefined)
                return "";
            var coordinates = concept.value;
            if (!coordinates.includes("lat"))
                return "";
            if (!coordinates.includes("lng"))
                return "";
            var gpsLat = coordinates.split(",")[0];
            var gpsLng = coordinates.split(",")[1];
            var gpsLatNumber = Number.parseFloat(gpsLat.replace("lat:", ""));
            var gpsLngNumber = Number.parseFloat(gpsLng.replace("lng:", ""));
            var cordinates = new Coordinates_1.Coordinates();
            var distance = this.Gps.GetDistance(gpsLatNumber, gpsLngNumber);
            return distance.toString();
        };
        ListProduct_1.prototype.ReloadHttp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timer;
                var _this = this;
                return __generator(this, function (_a) {
                    this.counHttp++;
                    this._loading._text = " Reintentando " + this.counHttp;
                    if (this.counHttp <= this.limitHttp) {
                        timer = setInterval(function () {
                            console.log("Reintentando");
                            if (_this._listProduct == undefined || _this._listProduct.length <= 0) {
                                clearInterval(timer);
                                _this.GetAllProduct();
                            }
                            else
                                clearInterval(timer);
                        }, (9000 + (this.counHttp * 100)));
                    }
                    return [2 /*return*/];
                });
            });
        };
        return ListProduct_1;
    }());
    __setFunctionName(_classThis, "ListProduct");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListProduct = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListProduct = _classThis;
}();
exports.ListProduct = ListProduct;
//# sourceMappingURL=app.product-list-product.js.map