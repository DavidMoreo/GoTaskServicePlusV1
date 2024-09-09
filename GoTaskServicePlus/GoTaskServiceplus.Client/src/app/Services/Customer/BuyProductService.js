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
exports.BuyProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var tblBuyerCustomer_1 = require("../../Models/Structure/tblBuyerCustomer");
var BuyProductService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BuyProductService = _classThis = /** @class */ (function () {
        function BuyProductService_1(_CommonService, http, host, loading, _Notifi, route, _CartService) {
            this._CommonService = _CommonService;
            this.http = http;
            this.host = host;
            this._Notifi = _Notifi;
            this.route = route;
            this._CartService = _CartService;
            this.isBuyProduct = false;
            this.buy = new tblBuyerCustomer_1.tblBuyerCustomerConcept();
            this._host = host;
            this._http = http;
            this._loading = loading;
        }
        // PurCharse
        BuyProductService_1.prototype.SaveBuyCountomer = function () {
            var _this = this;
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            var result = this._http.post(this._host.GetHostApi() + "BuyCustomer/AddBuyCustomer?", "");
            this._loading.Loading(true);
            result.subscribe(function (e) {
                if (e.status) {
                    //this._Notifi.showNotification("Compra realizada, nos comunicáremos contigo.");
                    _this._CommonService._AlertService.Alert("Tu compra fue guardada, muy pronto se pondrán en contacto contigo para programar la entrega, muchas gracias por tu compra.");
                    _this.isBuyProduct = false;
                    _this.buy = new tblBuyerCustomer_1.tblBuyerCustomerConcept();
                    _this.Route("product-buy");
                }
                _this._loading.Loading(false);
            });
            return result;
        };
        // End Purcharse
        //Cart
        BuyProductService_1.prototype.GetAllCart = function () {
            var _this = this;
            var movementType = new tblBuyerCustomer_1.MovementType();
            var result = this._http.get(this._host.GetHostApi() + "CartCustomer/GetAllCarByUser?page=0&statusMovement=" + movementType.cartActive);
            result.subscribe({
                next: function (e) {
                    console.log("All cart", e.data);
                    _this._listProduct = e.data;
                }
            });
        };
        BuyProductService_1.prototype.AddCart = function (product) {
        };
        BuyProductService_1.prototype.SaveTempCart = function (id) {
        };
        BuyProductService_1.prototype.DeleteCart = function (id) {
        };
        //End Cart 
        BuyProductService_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        return BuyProductService_1;
    }());
    __setFunctionName(_classThis, "BuyProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BuyProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BuyProductService = _classThis;
}();
exports.BuyProductService = BuyProductService;
//# sourceMappingURL=BuyProductService.js.map