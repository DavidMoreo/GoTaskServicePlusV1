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
exports.ItemProductAddUpdate = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var ItemProductAddUpdate = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-item-product-add',
            templateUrl: 'app.product-item-product-add.component.html',
            styleUrls: ['app.product-item-product-add.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _product_decorators;
    var _product_initializers = [];
    var _product_extraInitializers = [];
    var _distance_decorators;
    var _distance_initializers = [];
    var _distance_extraInitializers = [];
    var ItemProductAddUpdate = _classThis = /** @class */ (function () {
        function ItemProductAddUpdate_1(route, _language, productItemService, configservice) {
            this.route = route;
            this._valueSeacrh = "";
            /*  _language: Array<Language>;*/
            this.product = __runInitializers(this, _product_initializers, new tblProduct_1.tblProduct());
            this.distance = (__runInitializers(this, _product_extraInitializers), __runInitializers(this, _distance_initializers, ""));
            __runInitializers(this, _distance_extraInitializers);
            this.route = route;
            this._configLanguage = _language;
            this._productService = productItemService;
            this._configservice = configservice;
            this._productService._product.firsImg.url = "logo.png";
        }
        ItemProductAddUpdate_1.prototype.ngOnInit = function () {
            this._productService._product = this.product;
            this._configLanguage.getLanguage("-item-product-product").then(function (result) {
                /*  this._language = result;*/
            });
            //var r = new Language();
            //r.key = "Name";
            //r.value = "Nombre";
            //this._language.push(r);
        };
        ItemProductAddUpdate_1.prototype.ImgError = function () {
        };
        ItemProductAddUpdate_1.prototype.GetUrl = function (imgName, mode) {
            var urL = this._configservice.GetUrlImgItem(imgName, mode);
            return urL;
        };
        ItemProductAddUpdate_1.prototype.GeNameConcepVista = function (value) {
            if (value != null && value != undefined) {
                return value.value;
            }
            else
                return "";
        };
        ItemProductAddUpdate_1.prototype.GeNameConcepNumberVista = function (value) {
            if (value != null && value != undefined) {
                return value.value;
            }
            else
                return 0;
        };
        ItemProductAddUpdate_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ItemProductAddUpdate_1.prototype.languageTraslate = function (value) {
            return value;
        };
        ItemProductAddUpdate_1.prototype.GetUrlImg = function (name, scaleFrom, scaleTo) {
            var host = this._configservice.GetHostApi();
            var url = "";
            var productUrl = "Files/product/";
            var logo = "Files/product/";
            if (name == "")
                url = host + "Img/logo.png";
            else
                url = host + productUrl + name.replace("PC", scaleTo);
            return url;
        };
        return ItemProductAddUpdate_1;
    }());
    __setFunctionName(_classThis, "ItemProductAddUpdate");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _product_decorators = [(0, core_1.Input)()];
        _distance_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _product_decorators, { kind: "field", name: "product", static: false, private: false, access: { has: function (obj) { return "product" in obj; }, get: function (obj) { return obj.product; }, set: function (obj, value) { obj.product = value; } }, metadata: _metadata }, _product_initializers, _product_extraInitializers);
        __esDecorate(null, null, _distance_decorators, { kind: "field", name: "distance", static: false, private: false, access: { has: function (obj) { return "distance" in obj; }, get: function (obj) { return obj.distance; }, set: function (obj, value) { obj.distance = value; } }, metadata: _metadata }, _distance_initializers, _distance_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItemProductAddUpdate = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItemProductAddUpdate = _classThis;
}();
exports.ItemProductAddUpdate = ItemProductAddUpdate;
//# sourceMappingURL=app.product-item-product-add.js.map