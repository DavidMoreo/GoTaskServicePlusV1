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
exports.ReferService = void 0;
var core_1 = require("@angular/core");
var ReferProduct_1 = require("../../Models/Product/ReferProduct");
var ReferService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReferService = _classThis = /** @class */ (function () {
        function ReferService_1(http, host, _CommonService) {
            this.http = http;
            this.host = host;
            this._CommonService = _CommonService;
            this.referList = new Array();
            this.referListByCompanyId = new Array();
            this._http = http;
        }
        ReferService_1.prototype.Save = function (refer) {
            var _this = this;
            var result = this._http.post(this._CommonService._ConfigService.GetHostApi() + "ReferProductControlle/SaveAndUpdateReferProduct", refer).subscribe(function (e) {
                if (e.status) {
                    if (refer.id == _this._CommonService._UtilitiService.GuidEmpty()) {
                        _this.referList.push(e.data);
                        _this.Clear();
                    }
                    else {
                        _this.referList = _this.referList.filter(function (s) { return s.id != refer.id; });
                        _this.referList.push(e.data);
                        _this.rowSeletion = e.data;
                    }
                    _this._CommonService._AlertService.AlertApi(e.msg);
                }
            });
            return result;
        };
        ReferService_1.prototype.GetAll = function (filter, page) {
            var _this = this;
            var result = this._http.get(this._CommonService._ConfigService.GetHostApi() + "ReferProductControlle/GetAllReferProduct?filter=".concat(filter, "&page=").concat(page));
            result.subscribe(function (e) {
                _this.referList = e.data;
            });
            return result;
        };
        ReferService_1.prototype.GetAllReferByCompanyId = function () {
            var _this = this;
            var result = this._http.get(this._CommonService._ConfigService.GetHostApi() + "ReferProductControlle/GetAllConceptReferProductByCompany");
            result.subscribe(function (e) {
                _this.referList = e.data;
            });
            return result;
        };
        ReferService_1.prototype.GetById = function (id) {
            var result = this._http.get(this._CommonService._ConfigService.GetHostApi() + "ReferProductControlle/GetReferProductById?id=".concat(id));
            return result;
        };
        ReferService_1.prototype.DeleteById = function (id) {
            var _this = this;
            var result = this._http.delete(this._CommonService._ConfigService.GetHostApi() + "ReferProductControlle/DeleteRefeProduct?id=".concat(id));
            result.subscribe(function (e) {
                if (e.status) {
                    _this.referList = _this.referList.filter(function (s) { return s.id != id; });
                }
                _this._CommonService._AlertService.AlertApi(e.msg);
                _this.Clear();
            });
            return result;
        };
        ReferService_1.prototype.Clear = function () {
            this.rowSeletion = new ReferProduct_1.tblReferProduct();
        };
        ReferService_1.prototype.RemovePrice = function (item) {
            var data = this.GetItemRefer(item.id);
            this.referList = this.referList.filter(function (s) { return s != data; });
            if (data != undefined)
                this.Save(data);
        };
        ReferService_1.prototype.GetItemRefer = function (refer) {
            var dataTemp = JSON.stringify(refer);
            return JSON.parse(dataTemp);
        };
        //#Property
        ReferService_1.prototype.GetListRefer = function () {
            if (this.referList == undefined)
                this.referList = new Array;
            return this.referList;
        };
        return ReferService_1;
    }());
    __setFunctionName(_classThis, "ReferService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReferService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReferService = _classThis;
}();
exports.ReferService = ReferService;
//# sourceMappingURL=ReferProduct.js.map