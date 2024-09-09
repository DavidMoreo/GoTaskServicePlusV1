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
exports.ConceptStoreTrackingService = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var ConceptStoreTrackingService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConceptStoreTrackingService = _classThis = /** @class */ (function () {
        function ConceptStoreTrackingService_1(http, _CommonService, Gps) {
            this.http = http;
            this._CommonService = _CommonService;
            this.Gps = Gps;
            this.conceptList = new Array();
            this.concept = new tblProduct_1.tblConcepValue();
            this.rowSeletion = new tblProduct_1.tblConcepValue();
            this._http = http;
        }
        ConceptStoreTrackingService_1.prototype.SaveAndUpdateConcept = function (data) {
            var response = this._http.post(this._CommonService._ConfigService.GetHostApi() + "Concept/SaveAndUpdateConcept", data);
            /* this.LoadKeyRefresh(response);*/
            return response;
        };
        ConceptStoreTrackingService_1.prototype.DeleteConcept = function (id) {
            var _this = this;
            var response = this._http.delete(this._CommonService._ConfigService.GetHostApi() + "Concept/DeleteConcept" + "?id=" + id);
            response.subscribe({
                next: function (e) {
                    if (e.status) {
                        _this.conceptList = _this.conceptList.filter(function (s) { return s.id != id; });
                    }
                }
            });
            this.ClearData();
            return response;
        };
        ConceptStoreTrackingService_1.prototype.GetListByName = function (filter, type, page) {
            var _this = this;
            var response = this._http.get(this._CommonService._ConfigService.GetHostApi() + "Concept/GetAllConcept?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            response.subscribe(function (e) {
                _this.conceptList = e.data;
            });
            return response;
        };
        ConceptStoreTrackingService_1.prototype.GetListById = function (id) {
            var _this = this;
            var response = this._http.get(this._CommonService._ConfigService.GetHostApi() + "Concept/GetConceptById?id=".concat(id));
            response.subscribe({
                next: function (e) {
                    if (e.status) {
                        _this.concept = e.data;
                    }
                }
            });
            this.ClearData();
            return response;
        };
        ConceptStoreTrackingService_1.prototype.LoadGps = function () {
            var result = this.Gps.GetGps();
            this.concept.value = "lat:   " + result.latitud + "   ,   " + "lng:   " + result.longitud;
        };
        ConceptStoreTrackingService_1.prototype.ClearData = function () {
            this.concept.concept = new tblProduct_1.tblConcepValue();
            this.rowSeletion = new tblProduct_1.tblConcepValue();
            this.concept = new tblProduct_1.tblConcepValue();
        };
        return ConceptStoreTrackingService_1;
    }());
    __setFunctionName(_classThis, "ConceptStoreTrackingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConceptStoreTrackingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConceptStoreTrackingService = _classThis;
}();
exports.ConceptStoreTrackingService = ConceptStoreTrackingService;
//# sourceMappingURL=ConceptStoreTrackingService.js.map