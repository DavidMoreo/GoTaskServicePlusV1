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
exports.ItemRowProductView = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var common_1 = require("@angular/common");
var ItemRowProductView = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-item-row-product',
            templateUrl: 'app.product-item-row-product.component.html',
            styleUrls: ['app.product-item-row-product.css'],
            imports: [common_1.CommonModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _product_decorators;
    var _product_initializers = [];
    var _product_extraInitializers = [];
    var _isPhone_decorators;
    var _isPhone_initializers = [];
    var _isPhone_extraInitializers = [];
    var _distance_decorators;
    var _distance_initializers = [];
    var _distance_extraInitializers = [];
    var ItemRowProductView = _classThis = /** @class */ (function () {
        function ItemRowProductView_1(_Cart, _FavoriteService, route, _language, configservice, ProductItemService, CartService, AlertBuyService, _util, _ShareService, _HtmlToImg, _HtmlToImgService, _ShareControler, _cdRef) {
            this._Cart = _Cart;
            this._FavoriteService = _FavoriteService;
            this.route = route;
            this._util = _util;
            this._HtmlToImg = _HtmlToImg;
            this._ShareControler = _ShareControler;
            this._cdRef = _cdRef;
            this._valueSeacrh = "";
            this.product = __runInitializers(this, _product_initializers, new tblProduct_1.tblProduct());
            this.isPhone = (__runInitializers(this, _product_extraInitializers), __runInitializers(this, _isPhone_initializers, true));
            this.distance = (__runInitializers(this, _isPhone_extraInitializers), __runInitializers(this, _distance_initializers, ""));
            __runInitializers(this, _distance_extraInitializers);
            this._Cart = _Cart;
            this._FavoriteService = _FavoriteService;
            this.route = route;
            this._util = _util;
            this._HtmlToImg = _HtmlToImg;
            this._ShareControler = _ShareControler;
            this._cdRef = _cdRef;
            this._configLanguage = _language;
            this._configservice = configservice;
            this._ProductItemService = ProductItemService;
            this._CartService = CartService;
            this._HtmlToImgService = _HtmlToImgService;
            this._AlertBuyService = AlertBuyService;
            this.Share = _ShareService;
            this._FavoriteService = _FavoriteService;
        }
        ItemRowProductView_1.prototype.ngOnInit = function () {
            this.Mode();
        };
        ItemRowProductView_1.prototype.ImgError = function () {
        };
        ItemRowProductView_1.prototype.ShareProduct = function (product, url) {
            this._ShareControler.GetFileBase64(product, url);
        };
        ItemRowProductView_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ItemRowProductView_1.prototype.IsFavorite = function (id) {
            var result = this._FavoriteService._favoritesList.filter(function (f) { return f.id == id; });
            var exist = result.length > 0;
            // console.log("isfavo", result);
            if ((result != null && result != undefined) && exist) {
                return true;
            }
            else {
                return false;
            }
        };
        ItemRowProductView_1.prototype.IsBuyCart = function (id) {
            // Pendiente
            if (this._CartService._listProductCart) {
                var exist = this._CartService._listProductCart.filter(function (f) { return f.idProduct == id; });
                if (exist != null && exist.length > 0) {
                    return true;
                }
            }
            return false;
        };
        ItemRowProductView_1.prototype.FavoriteAdd = function (product) {
            this._FavoriteService.AddProductFavorite(product);
        };
        ItemRowProductView_1.prototype.CartBuyAdd = function (product) {
            this._CartService.AddProductCart(product);
        };
        ItemRowProductView_1.prototype.FavoriteRemove = function (id) {
            this._FavoriteService.RemoveFavoriteById(id);
        };
        ItemRowProductView_1.prototype.CartRemove = function (product) {
            this._CartService.RemoveCartById(product.id);
        };
        ItemRowProductView_1.prototype.SentWhatsapp = function (idCompany) {
            this._ProductItemService._product;
            //"https://api.whatsapp.com/send?phone=573228095355&text="
        };
        ItemRowProductView_1.prototype.GetProjectId = function (id, product) {
            var result = this._ProductItemService.GetProjectById(id);
            result.subscribe(function (e) {
                if (e.status) {
                    console.log(e.data);
                    var url = "https://api.whatsapp.com/send?phone=57" + e.data.mobileNumber + "&text=Me interesa este producto: " + product.name;
                    window.open(url, '_blank');
                }
            });
            //(e) => {
            //  alert(e.status);
            //  console.log(e.data.mobileNumber);
            //  /* this._cdRef.detectChanges();*/
            //}
        };
        ItemRowProductView_1.prototype.GetTicket = function (mode) {
            if (this.product.availableDay != undefined && this.product.availableDay != null) {
                if (this.product.availableDay.name.trim().toLowerCase().includes(mode.trim().toLowerCase())) {
                    return this.product.availableDay.name.toUpperCase();
                }
            }
            return "";
        };
        ItemRowProductView_1.prototype.SelctProduct = function (productSelect) {
            var name = "";
            productSelect.name.split(" ").forEach(function (e) {
                if (e != "")
                    name += e + (e != "" ? "-" : "");
            });
            this.Route("select-product/" + productSelect.idTypeOfProduct + "/" + name + "/" + productSelect.id);
        };
        ItemRowProductView_1.prototype.GetUrlProduct = function (productSelect) {
            var name = "";
            productSelect.name.split(" ").forEach(function (e) {
                if (e != "")
                    name += e + (e != "" ? "-" : "");
            });
            return this._configservice.GetBaseUrl() + "select-product/" + productSelect.idTypeOfProduct + "/" + productSelect.id;
        };
        ItemRowProductView_1.prototype.GetUrlImg = function (image, scaleTo) {
            var url = this._configservice.GetUrlImgItem(image, scaleTo);
            var imgt = document.getElementById("img");
            if (imgt != null)
                imgt.setAttribute("src", url);
            return url;
        };
        ItemRowProductView_1.prototype.GeNameConcepVista = function (value) {
            if (value != null && value != undefined) {
                return value.value;
            }
            else
                return "";
        };
        ItemRowProductView_1.prototype.GeNameConcepNumberVista = function (value) {
            if (value != null && value != undefined) {
                return value.value;
            }
            else
                return 0;
        };
        ItemRowProductView_1.prototype.IsService = function (product) {
            if (product.isProduct)
                return true;
            if (!product.isProduct) {
                if (product.actualPrice > 0)
                    return true;
            }
            return false;
        };
        ItemRowProductView_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ItemRowProductView_1.prototype.languageTraslate = function (value) {
            return value;
        };
        // Verificar si se está ejecutando en un dispositivo móvil
        ItemRowProductView_1.prototype.isMobileDevice = function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };
        ItemRowProductView_1.prototype.Mode = function () {
            // Uso
            //if (this.isMobileDevice()) {
            //  this.isPhone = true;
            //  if (this._cdRef!=null) this._cdRef.detectChanges();
            //  //lert("La página se está ejecutando en un dispositivo móvil.");
            //} else {
            //  this.isPhone = false;
            //  //alert("La página no se está ejecutando en un dispositivo móvil.");
            //  if (this._cdRef != null) this._cdRef.detectChanges();
            //}
        };
        return ItemRowProductView_1;
    }());
    __setFunctionName(_classThis, "ItemRowProductView");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _product_decorators = [(0, core_1.Input)()];
        _isPhone_decorators = [(0, core_1.Input)()];
        _distance_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _product_decorators, { kind: "field", name: "product", static: false, private: false, access: { has: function (obj) { return "product" in obj; }, get: function (obj) { return obj.product; }, set: function (obj, value) { obj.product = value; } }, metadata: _metadata }, _product_initializers, _product_extraInitializers);
        __esDecorate(null, null, _isPhone_decorators, { kind: "field", name: "isPhone", static: false, private: false, access: { has: function (obj) { return "isPhone" in obj; }, get: function (obj) { return obj.isPhone; }, set: function (obj, value) { obj.isPhone = value; } }, metadata: _metadata }, _isPhone_initializers, _isPhone_extraInitializers);
        __esDecorate(null, null, _distance_decorators, { kind: "field", name: "distance", static: false, private: false, access: { has: function (obj) { return "distance" in obj; }, get: function (obj) { return obj.distance; }, set: function (obj, value) { obj.distance = value; } }, metadata: _metadata }, _distance_initializers, _distance_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItemRowProductView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItemRowProductView = _classThis;
}();
exports.ItemRowProductView = ItemRowProductView;
//# sourceMappingURL=app.product-item-row-product.js.map