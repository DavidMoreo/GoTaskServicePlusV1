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
exports.VendorProductService = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../Models/Structure/tblProduct");
var VendorProductService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VendorProductService = _classThis = /** @class */ (function () {
        function VendorProductService_1(http, Configservice, _Concept) {
            this.http = http;
            this.Configservice = Configservice;
            this._Concept = _Concept;
            this._statusList = new Array();
            this.loadingStatus = false;
            this._Configservice = Configservice;
            this._http = http;
        }
        VendorProductService_1.prototype.UpdateProduct = function (product) {
            var _this = this;
            var url = "Product/UpdateProduct";
            var result = this._http.post(this._Configservice.GetHostApi() + url, product);
            result.subscribe(function (e) {
                var product = e.data;
                _this.listProduct.forEach(function (p) {
                    if (product.id == p.id) {
                        p.isPublic = product.isPublic;
                        p.status = product.status;
                    }
                    _this.SetLoading(false);
                });
            });
            return result;
        };
        VendorProductService_1.prototype.GetAllProduct = function (filter, type, page) {
            var _this = this;
            this.listProduct = new Array;
            var result = this._http.get(this._Configservice.GetHostApi() + "Product/GetProductByProject?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            result.subscribe(function (e) {
                _this.listProduct = e.data;
                if (_this.listProduct == undefined)
                    _this.listProduct = new Array;
            });
            return result;
        };
        VendorProductService_1.prototype.GetProductById = function (id) {
            var result = this._http.get(this._Configservice.GetHostApi() + "Product/GetProductById?id=".concat(id));
            return result;
        };
        VendorProductService_1.prototype.GetListStatusConcept = function () {
            var _this = this;
            var type = tblProduct_1.TypeConcepValue.StatusProductConcept();
            var result = this._Concept.GetListByName("ALL", type, 0);
            result.subscribe(function (e) {
                _this._statusList = e.data;
            });
        };
        VendorProductService_1.prototype.GetUrl = function (imgName) {
            return this._Configservice.GetUrlImg(imgName, "PHONE");
        };
        VendorProductService_1.prototype.SetLoading = function (mode) {
            this.loadingStatus = mode;
        };
        return VendorProductService_1;
    }());
    __setFunctionName(_classThis, "VendorProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VendorProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VendorProductService = _classThis;
}();
exports.VendorProductService = VendorProductService;
//# sourceMappingURL=VendorUpdateProduct.js.map