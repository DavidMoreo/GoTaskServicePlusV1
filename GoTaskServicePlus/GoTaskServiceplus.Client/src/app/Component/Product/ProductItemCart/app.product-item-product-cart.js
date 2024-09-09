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
exports.ItemCartComponet = void 0;
var core_1 = require("@angular/core");
var tblBuyerCustomer_1 = require("../../../Models/Structure/tblBuyerCustomer");
var ItemCartComponet = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-item-product-cart',
            templateUrl: 'app.product-item-product-cart.component.html',
            styleUrls: ['app.product-item-product-cart.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _product_decorators;
    var _product_initializers = [];
    var _product_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var ItemCartComponet = _classThis = /** @class */ (function () {
        function ItemCartComponet_1(route, _CommonService, _language, configservice, loginSevice, ProductItemService, CartService) {
            this.route = route;
            this._CommonService = _CommonService;
            this._valueSeacrh = "";
            /*  _language: Array<Language>;*/
            this.product = __runInitializers(this, _product_initializers, new tblBuyerCustomer_1.tblBuyerCustomer());
            this.quantity = (__runInitializers(this, _product_extraInitializers), __runInitializers(this, _quantity_initializers, 0));
            __runInitializers(this, _quantity_extraInitializers);
            this.route = route;
            this._CommonService = _CommonService;
            this._configLanguage = _language;
            this._loginSevice = loginSevice;
            this._configservice = configservice;
            this._ProductItemService = ProductItemService;
            this._CartService = CartService;
        }
        ItemCartComponet_1.prototype.ngOnInit = function () {
        };
        ItemCartComponet_1.prototype.ImgError = function () {
        };
        ItemCartComponet_1.prototype.QuantityProduct = function (mode, id) {
            // Pendiente
            var item = this._CartService._listProductCart.find(function (s) { return s.id == id; });
            if (item == null || item == undefined)
                return undefined;
            //this._CartService._listProductCart = this._CartService._listProductCart.filter(s => s.id != id);
            this._CartService.RemoveCartById(id);
            if (mode) {
                item.quantity++;
            }
            else {
                item.quantity--;
            }
            // this._CartService._listProductCart.push(item);
            // Pendiente
            return undefined;
        };
        ItemCartComponet_1.prototype.CartBuyAdd = function (product) {
            this._CartService.AddProductCart(product);
        };
        ItemCartComponet_1.prototype.DeleteBuyCart = function (id) {
            this._CartService.RemoveCartById(id);
            // Pendiente
        };
        ItemCartComponet_1.prototype.GetQuantity = function (id) {
            // Pendiente
            var item = this._CartService._listProductCart.find(function (s) { return s.id == id; });
            if (item == undefined || item == null)
                return 0;
            return item.quantity;
        };
        ItemCartComponet_1.prototype.SelctProduct = function (productSelect) {
            var name = "";
            productSelect.name.split(" ").forEach(function (e) {
                if (e != "")
                    name += e + (e != "" ? "-" : "");
            });
            // this.Route("select-product/" + productSelect.replace(" ", "-").replace(" ", "") + "/" + name + "/" + productSelect.id)
        };
        ItemCartComponet_1.prototype.GetUrlImg = function (image, idCompany, scaleTo) {
            var url = this._configservice.GetUrlImgAndIdCompany(image, idCompany, scaleTo);
            return url;
        };
        ItemCartComponet_1.prototype.GetPriceString = function (price) {
            return this._CommonService._UtilitiService.ConverCurrency(price);
        };
        ItemCartComponet_1.prototype.GeNameConcepNumberVista = function (value) {
            if (value != null && value != undefined) {
                return value.value;
            }
            else
                return 0;
        };
        ItemCartComponet_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ItemCartComponet_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return ItemCartComponet_1;
    }());
    __setFunctionName(_classThis, "ItemCartComponet");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _product_decorators = [(0, core_1.Input)()];
        _quantity_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _product_decorators, { kind: "field", name: "product", static: false, private: false, access: { has: function (obj) { return "product" in obj; }, get: function (obj) { return obj.product; }, set: function (obj, value) { obj.product = value; } }, metadata: _metadata }, _product_initializers, _product_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItemCartComponet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItemCartComponet = _classThis;
}();
exports.ItemCartComponet = ItemCartComponet;
//# sourceMappingURL=app.product-item-product-cart.js.map