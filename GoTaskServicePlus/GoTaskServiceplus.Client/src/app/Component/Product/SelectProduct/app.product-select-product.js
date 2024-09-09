"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.SelectProduct = void 0;
var core_1 = require("@angular/core");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var common_1 = require("@angular/common");
var app_common_mapa_1 = require("../../Common/Mapa/app.common-mapa");
var SelectProduct = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-product-select-product',
            templateUrl: './app.product-select-product-component.html',
            styleUrls: ['app.product-select-product.css'],
            imports: [app_common_loading_1.LoadingComponent, common_1.CommonModule, app_common_mapa_1.MapComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _zoom_decorators;
    var _zoom_initializers = [];
    var _zoom_extraInitializers = [];
    var _onClick_decorators;
    var SelectProduct = _classThis = /** @class */ (function () {
        function SelectProduct_1(routeActivate, render, service, param, configservice, cdRef, CartService, ProductItemService, BuyProduct, _Util) {
            this.routeActivate = (__runInitializers(this, _instanceExtraInitializers), routeActivate);
            this.render = render;
            this._Util = _Util;
            this.id = "0";
            this.zoom = __runInitializers(this, _zoom_initializers, void 0);
            this.globalListenFunc = __runInitializers(this, _zoom_extraInitializers);
            this.counHttp = 0;
            this.isDragging = false;
            this.startX = 0;
            this.startY = 0;
            this.positionX = 0;
            this.positionY = 0;
            this.scale = 1;
            this.zoomOrigin = 1;
            this._service = service;
            this._param = param;
            this._cdRef = cdRef;
            this._configservice = configservice;
            this._CartService = CartService;
            this._BuyProduct = BuyProduct;
            this._ProductItemService = ProductItemService;
        }
        SelectProduct_1.prototype.onClick = function (btn) {
        };
        SelectProduct_1.prototype.GetUrlImg = function (image) {
            var url = this._configservice.GetUrlImgItem(image, "PC");
            return url;
        };
        SelectProduct_1.prototype.GetUrlImgSelect = function (image) {
            var url = "";
            if (this._imgSelect == undefined || this._imgSelect == null) {
                url = this._configservice.GetUrlImgItem(image, "PC");
            }
            else {
                url = this._configservice.GetUrlImgItem(this._imgSelect, "PC");
            }
            return url;
        };
        SelectProduct_1.prototype.ngOnInit = function () {
            var _this = this;
            this._param.params.subscribe(function (param) {
                _this.id = param["id"];
                _this.Search();
            });
        };
        SelectProduct_1.prototype.SelectionImg = function (img) {
            this._imgSelect = img;
            this._cdRef.detectChanges();
        };
        SelectProduct_1.prototype.Search = function () {
            var _this = this;
            this.ReloadHttp();
            this._service.GetProductById(this.id).subscribe(function (e) {
                _this._product = e.data;
                _this._Util.scrollToBottom("scrollSelect", 400);
                _this.LoadMap();
            });
        };
        SelectProduct_1.prototype.ReloadHttp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timer;
                var _this = this;
                return __generator(this, function (_a) {
                    this.counHttp++;
                    if (this.counHttp <= 8) {
                        timer = setInterval(function () {
                            if (_this._product == undefined) {
                                clearInterval(timer);
                                _this.Search();
                            }
                            else {
                                clearInterval(timer);
                            }
                        }, 50000);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SelectProduct_1.prototype.offZoon = function () {
            var zoomItem = this.zoom.nativeElement;
            this.render.addClass(zoomItem, "img-zoom-off");
            this.render.removeClass(zoomItem, "img-zoom-on");
        };
        SelectProduct_1.prototype.onZoon = function (url) {
            var zoomItem = this.zoom.nativeElement;
            this.render.addClass(zoomItem, "img-zoom-on");
            this.render.removeClass(zoomItem, "img-zoom-off");
        };
        SelectProduct_1.prototype.CartBuyAdd = function () {
            this._CartService.AddProductCart(this._product, 1, false);
        };
        SelectProduct_1.prototype.CartRemove = function () {
            this._CartService.RemoveCartById(this._product.id);
        };
        SelectProduct_1.prototype.IsBuyCart = function () {
            // Pendiente
            var _this = this;
            if (this._CartService._listProductCart) {
                var exist = this._CartService._listProductCart.filter(function (f) { return f.idProduct == _this._product.id; });
                if (exist != null && exist.length > 0) {
                    return true;
                }
            }
            return false;
        };
        SelectProduct_1.prototype.CartProduct = function () {
            this.CartBuyAdd();
            this._BuyProduct.product = null;
            this._BuyProduct.BuyProduct("product-cart");
        };
        SelectProduct_1.prototype.onDragStart = function (event) {
            event.preventDefault();
            this.isDragging = true;
            var clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
            var clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
            this.startX = clientX - this.positionX;
            this.startY = clientY - this.positionY;
        };
        SelectProduct_1.prototype.onDrag = function (event) {
            if (this.isDragging) {
                var clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
                var clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
                // Calcular la diferencia entre la posición actual y la nueva posición
                var deltaX = (clientX - this.startX) - this.positionX;
                var deltaY = (clientY - this.startY) - this.positionY;
                // Definir una velocidad de suavizado
                var smoothness = 0.29; // Puedes ajustar este valor según la velocidad de suavizado deseada
                // Aplicar suavizado para hacer movimientos lentos y suaves
                this.positionX += deltaX - smoothness;
                this.positionY += deltaY - smoothness;
            }
        };
        SelectProduct_1.prototype.onDragEnd = function () {
            this.isDragging = false;
        };
        SelectProduct_1.prototype.Zoon = function (mode) {
            if (mode) {
                this.zoomOrigin = 2.5;
                /*      alert(this.zoomOrigin);*/
            }
            else {
                this.zoomOrigin = 1;
            }
            this.positionX = 0;
            this.positionY = 0;
            this._cdRef.detectChanges();
        };
        SelectProduct_1.prototype.languageTraslate = function (value) {
            return value;
        };
        SelectProduct_1.prototype.IsService = function (product) {
            if (product.isProduct)
                return true;
            if (!product.isProduct) {
                if (product.actualPrice > 0)
                    return true;
            }
            return false;
        };
        SelectProduct_1.prototype.GetMap = function (product, name) {
            if (name === void 0) { name = ""; }
            var data = "";
            if (!product.adress)
                return "";
            var coordinates = product.adress.value;
            if (!coordinates)
                return "";
            if (name === "Lat") {
                data = coordinates.replace("lat:", "").split(',')[0].replaceAll(" ", "");
            }
            else if (name === "Lng") {
                data = coordinates.replace("lng:", "").split(',')[1].replaceAll(" ", "");
            }
            else {
                data = coordinates.trim().replace("lat:", "").replace("lng:", "").replace(" ", "");
            }
            return data;
        };
        SelectProduct_1.prototype.LoadMap = function () {
            var _this = this;
            console.log("Load map");
            var timer = setInterval(function () {
                //const iframe = this.map.nativeElement;
                var lat = _this.GetMap(_this._product, "Lat");
                var lng = _this.GetMap(_this._product, "Lng");
                var url = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3976.312870821943!2d" + lng + "!3d" + lat + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwNDInNTYuMiJOIDc0wrAxMycyNC42Ilc!5e0!3m2!1ses!2sco!4v1719853653479!5m2!1ses!2sco";
                // iframe.src = url;
                clearInterval(timer);
                // console.log("Map", this.map);
            }, 1100);
        };
        SelectProduct_1.prototype.ngAfterViewInit = function () {
            /* this.LoadMap();*/
        };
        return SelectProduct_1;
    }());
    __setFunctionName(_classThis, "SelectProduct");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _zoom_decorators = [(0, core_1.ViewChild)('zoom')];
        _onClick_decorators = [(0, core_1.HostListener)('mouseover', ['$event.target'])];
        __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: function (obj) { return "onClick" in obj; }, get: function (obj) { return obj.onClick; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _zoom_decorators, { kind: "field", name: "zoom", static: false, private: false, access: { has: function (obj) { return "zoom" in obj; }, get: function (obj) { return obj.zoom; }, set: function (obj, value) { obj.zoom = value; } }, metadata: _metadata }, _zoom_initializers, _zoom_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectProduct = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectProduct = _classThis;
}();
exports.SelectProduct = SelectProduct;
//# sourceMappingURL=app.product-select-product.js.map