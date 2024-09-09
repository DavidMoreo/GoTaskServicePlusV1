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
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var ProductService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductService = _classThis = /** @class */ (function () {
        function ProductService_1(_ReferService, http, host, _CommonService) {
            this._ReferService = _ReferService;
            this.http = http;
            this.host = host;
            this._CommonService = _CommonService;
            this._host = host;
            this._http = http;
        }
        ProductService_1.prototype.savedProduct = function (url, product) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            var result = this._http.post(this._host.GetHostApi() + url, product);
            return result;
        };
        ProductService_1.prototype.updateProduct = function (url, product) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            console.log("Update", product);
            var result = this._http.post(this._host.GetHostApi() + url, product);
            return result;
        };
        ProductService_1.prototype.deleteProduct = function (url, id) {
            var result = this._http.delete(this._host.GetHostApi() + url + "?id=" + id);
            return result;
        };
        ProductService_1.prototype.deleteImgByUrl = function (url, nameUrlImage, idProduct) {
            var result = this._http.delete(this._host.GetHostApi() + url + "?url=" + nameUrlImage + "&idProduct=" + idProduct);
            return result;
        };
        ProductService_1.prototype.saveAndUpdate = function (url, product) {
            var result = new rxjs_1.Observable();
            if (product.id != undefined && product.id != "00000000-0000-0000-0000-000000000000" && product.id.length == ("00000000-0000-0000-0000-000000000000").length)
                result = this.updateProduct(url, product);
            else
                result = this.savedProduct(url, product);
            return result;
        };
        ProductService_1.prototype.GetAllProduct = function (filter, type, page) {
            var _this = this;
            this._listProduct = new Array;
            var result = this._http.get(this._host.GetHostApi() + "Product/GetProductByProject?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            result.subscribe(function (e) {
                _this._listProduct = e.data;
                if (_this._listProduct == undefined)
                    _this._listProduct = new Array;
                if (_this._listProduct.length <= 0)
                    _this._CommonService._AlertService.Alert("Tu negocio no tiene productos a mostrar, de crear y publicar un nuevo producto.");
            });
            this.GetAllReferByCompanyId();
            return result;
        };
        ProductService_1.prototype.GetProductById = function (id) {
            var result = this._http.get(this._host.GetHostApi() + "Product/GetProductById?id=".concat(id));
            return result;
        };
        ProductService_1.prototype.GetAllReferByCompanyId = function () {
            this._ReferService.GetAllReferByCompanyId();
        };
        ProductService_1.prototype.GetListReferProduct = function () {
            return this._ReferService.GetListRefer();
        };
        return ProductService_1;
    }());
    __setFunctionName(_classThis, "ProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductService = _classThis;
}();
exports.ProductService = ProductService;
//# sourceMappingURL=AddUpdateProduct.js.map