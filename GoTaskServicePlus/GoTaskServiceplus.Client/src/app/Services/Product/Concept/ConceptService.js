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
exports.ConceptService = void 0;
var core_1 = require("@angular/core");
var ConceptService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConceptService = _classThis = /** @class */ (function () {
        function ConceptService_1(http, host, loginSevice) {
            this.http = http;
            this.host = host;
            this._cityList = new Array();
            this._contryList = new Array();
            this._adressList = new Array();
            this._conceptList = new Array();
            this._configService = host;
            this._http = http;
            this._login = loginSevice;
        }
        ConceptService_1.prototype.GetListProdutByfiler = function (filter, type, page) {
            var response = this._http.get(this._configService.GetHostApi() + "Concept/GetAllConcept?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            /*this.LoadKeyRefresh(response);*/
            return response;
        };
        ConceptService_1.prototype.SaveAndUpdateConcept = function (data) {
            var response = this._http.post(this._configService.GetHostApi() + "Concept/SaveAndUpdateConcept", data);
            /* this.LoadKeyRefresh(response);*/
            return response;
        };
        ConceptService_1.prototype.DeleteConcept = function (id) {
            var response = this._http.delete(this._configService.GetHostApi() + "Concept/DeleteConcept" + "?id=" + id);
            return response;
        };
        ConceptService_1.prototype.GetListByName = function (filter, type, page) {
            var response = this._http.get(this._configService.GetHostApi() + "Concept/GetAllConcept?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            /*this.LoadKeyRefresh(response);*/
            return response;
        };
        ConceptService_1.prototype.GetListByCountry = function (type, countryId) {
            var response = this._http.get(this._configService.GetHostApi() + "Concept/GetAllConceptByCountry?type=".concat(type, "&countryId=").concat(countryId));
            return response;
        };
        ConceptService_1.prototype.GetListById = function (id) {
            var response = this._http.get(this._configService.GetHostApi() + "Concept/GetConceptById?id=".concat(id));
            /* this.LoadKeyRefresh(response);*/
            return response;
        };
        ConceptService_1.prototype.GetListImgByIdCompany = function (filter, page) {
            var response = this._http.get(this._configService.GetHostApi() + "Product/GetImgByByComapny?filter=".concat(filter, "&page=").concat(page));
            return response;
        };
        ConceptService_1.prototype.LoadKeyRefresh = function (response) {
            var _this = this;
            response.subscribe(function (e) {
                if (e.keyRefresh != undefined) {
                    _this._login.SavedStatusLogin(e.keyRefresh);
                }
            });
        };
        return ConceptService_1;
    }());
    __setFunctionName(_classThis, "ConceptService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConceptService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConceptService = _classThis;
}();
exports.ConceptService = ConceptService;
//# sourceMappingURL=ConceptService.js.map