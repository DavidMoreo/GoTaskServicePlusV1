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
exports.ProductItemService = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../Models/Structure/tblProduct");
var ProductItemService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductItemService = _classThis = /** @class */ (function () {
        function ProductItemService_1(http, host, util) {
            this.http = http;
            this.host = host;
            this._listFavorites = new Array;
            this._product = new tblProduct_1.tblProduct();
            this._configservice = host;
            this._http = http;
            this._util = util;
        }
        ProductItemService_1.prototype.GetProjectById = function (id) {
            var result = this._http.get(this._configservice.GetHostApi() + "Project/GetMobilNumberByProject?id=".concat(id));
            return result;
        };
        ProductItemService_1.prototype.GetCompanyById = function (id) {
            var result = this._http.get(this._configservice.GetHostApi() + "Company/GetCompanyById?id=".concat(id));
            return result;
        };
        ProductItemService_1.prototype.FavoriteAdd = function (id) {
            var result = this.GetFavorite(id);
            var exist = result.find(function (s) { return s == id; });
            if (result == null || result == undefined || exist == null) {
                this._listFavorites.push(id);
                this._util.SetLocalStorage("favorites", JSON.stringify(this._listFavorites));
            }
        };
        ProductItemService_1.prototype.FavoriteRemove = function (id) {
            this._listFavorites = this._listFavorites.filter(function (r) { return r != id; });
            this._util.SetLocalStorage("favorites", JSON.stringify(this._listFavorites));
        };
        ProductItemService_1.prototype.GetFavorite = function (id) {
            var list = this._util.GetLocalStorage("favorites");
            if (list != null && list != undefined && list != "") {
                this._listFavorites = JSON.parse(list);
                var exist = this._listFavorites.find(function (f) { return f == id; });
            }
            return this._listFavorites;
        };
        ProductItemService_1.prototype.GetAllFavorite = function () {
            var list = this._util.GetLocalStorage("favorites");
            this._listFavorites = JSON.parse(list);
            return this._listFavorites;
        };
        return ProductItemService_1;
    }());
    __setFunctionName(_classThis, "ProductItemService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductItemService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductItemService = _classThis;
}();
exports.ProductItemService = ProductItemService;
//# sourceMappingURL=ProductItem.js.map