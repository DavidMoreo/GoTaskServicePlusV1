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
exports.AdminBuyProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var tblBuyerCustomer_1 = require("../../../Models/Structure/tblBuyerCustomer");
var AdminBuyProductService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminBuyProductService = _classThis = /** @class */ (function () {
        function AdminBuyProductService_1(http, host, loading) {
            this.http = http;
            this.host = host;
            this._listBuyGroupByIdBuy = new Array;
            this.isBuyProduct = false;
            this.stausBuy = "";
            this._movementType = new tblBuyerCustomer_1.MovementType();
            this.buy = new tblBuyerCustomer_1.tblBuyerCustomerConcept();
            this._host = host;
            this._http = http;
            this._loading = loading;
        }
        AdminBuyProductService_1.prototype.GetAllBuyStatusAdmin = function (movementTypeItem, idProject) {
            var _this = this;
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            this.GetAllCartStorage();
            var list = this._listBuyStorageTemp;
            /*    alert(movementTypeItem);*/
            var result = this._http.get(this._host.GetHostApi() + "BuyCustomer/GetAllBuyStatusAdmin?idProject=".concat(idProject, "&movementTypeItem=").concat(movementTypeItem, "&page=0"));
            result.subscribe(function (e) {
                _this._listProduct = e.data;
                _this.LoadGroup();
                _this._loading.Loading(false);
            });
            return result;
        };
        AdminBuyProductService_1.prototype.GetAllBuyStatus = function (movementTypeItem) {
            var _this = this;
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            this.GetAllCartStorage();
            var list = this._listBuyStorageTemp;
            /*    alert(movementTypeItem);*/
            var result = this._http.get(this._host.GetHostApi() + "BuyCustomer/GetAllBuyStatus?movementTypeItem=".concat(movementTypeItem, "&page=0"));
            result.subscribe(function (e) {
                _this._listProduct = e.data;
                _this.LoadGroup();
                _this._loading.Loading(false);
            });
            return result;
        };
        AdminBuyProductService_1.prototype.LoadGroup = function () {
            var _this = this;
            this._listBuyGroupByIdBuy = new Array;
            if (this._listProduct != null) {
                this._listProduct.forEach(function (p) {
                    var exist = _this._listBuyGroupByIdBuy.find(function (s) { return s == p.purchareId; });
                    if (exist == null || exist == undefined) {
                        _this._listBuyGroupByIdBuy.push(p.purchareId);
                    }
                });
            }
        };
        AdminBuyProductService_1.prototype.Delete = function (id) {
            var _this = this;
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            var result = this._http.delete(this._host.GetHostApi() + "BuyCustomer/DeleteAdminBuyCustomer?id=".concat(id), { headers: headers1 });
            result.subscribe(function (e) {
                _this._loading.Loading(false);
                if (e.status) {
                    _this.GetAllBuyStatus(_this.stausBuy);
                    _this._listProduct = _this._listProduct.filter(function (s) { return s.id != id; });
                    /*  this.RemoveCartById(id);*/
                }
            });
            return result;
        };
        AdminBuyProductService_1.prototype.ChangedStatusBuy = function (id, status) {
            var _this = this;
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            var result = this._http.post(this._host.GetHostApi() + "BuyCustomer/CancelAdminBuyById?id=".concat(id, "&movementTypeItem=").concat(status), { headers: headers1 });
            result.subscribe(function (e) {
                _this._listBuyGroupByIdBuy = new Array;
                if (e.status) {
                    _this._listProduct = _this._listProduct.filter(function (s) { return s.id != id; });
                    _this.LoadGroup();
                }
                _this._loading.Loading(false);
            });
            return result;
        };
        AdminBuyProductService_1.prototype.GetAllCartStorage = function () {
            var list = window.localStorage.getItem("BuyList");
            if (list != null && list != undefined && list != "") {
                this._listBuyStorage = JSON.parse(list);
            }
            if (this._listBuyStorage == undefined)
                this._listBuyStorage = new Array;
        };
        AdminBuyProductService_1.prototype.AddProductCart = function (idBuy) {
            var resultD = this.GetCartById(idBuy);
            if (resultD == null || resultD == undefined) {
                this._listBuyStorage.push(idBuy);
                window.localStorage.setItem("BuyList", JSON.stringify(this._listBuyStorage));
            }
        };
        AdminBuyProductService_1.prototype.RemoveCartById = function (id) {
            this.GetAllCartStorage();
            this._listBuyStorage = this._listBuyStorage.filter(function (r) { return r != id; });
            alert("Remove");
            window.localStorage.setItem("BuyList", JSON.stringify(this._listBuyStorage));
        };
        AdminBuyProductService_1.prototype.GetCartById = function (id) {
            this.GetAllCartStorage();
            var exist = this._listBuyStorage.find(function (f) { return f == id; });
            return exist;
        };
        AdminBuyProductService_1.prototype.BuyProduct = function (mode) {
            this.isBuyProduct = true;
        };
        return AdminBuyProductService_1;
    }());
    __setFunctionName(_classThis, "AdminBuyProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBuyProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBuyProductService = _classThis;
}();
exports.AdminBuyProductService = AdminBuyProductService;
//# sourceMappingURL=AdminBuyProductService.js.map