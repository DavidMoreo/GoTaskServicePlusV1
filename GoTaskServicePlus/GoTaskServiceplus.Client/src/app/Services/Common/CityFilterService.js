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
exports.CityFilterFilterService = void 0;
var core_1 = require("@angular/core");
var CityFilterFilterService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CityFilterFilterService = _classThis = /** @class */ (function () {
        function CityFilterFilterService_1(http, ConceptService, _StorageService) {
            this.ConceptService = ConceptService;
            this._StorageService = _StorageService;
            this.visible = false;
            this.modeCity = false;
            this.modeLogin = false;
            this._ConceptService = ConceptService;
        }
        CityFilterFilterService_1.prototype.GetListByName = function (type, countryId) {
            var response = this._ConceptService.GetListByCountry(type, "0");
            return response;
        };
        CityFilterFilterService_1.prototype.ActiveMode = function (visible, modeLogin, modeCity) {
            if (visible === void 0) { visible = true; }
            if (modeLogin === void 0) { modeLogin = false; }
            if (modeCity === void 0) { modeCity = true; }
            this.visible = visible;
            this.modeCity = modeCity;
            this.modeLogin = modeLogin;
        };
        CityFilterFilterService_1.prototype.GetModeActiveFilter = function () { return this.visible; };
        CityFilterFilterService_1.prototype.GetModeVisible = function () { return this.visible; };
        CityFilterFilterService_1.prototype.GetModeCity = function () { return this.modeCity; };
        CityFilterFilterService_1.prototype.GetModeLogin = function () { return this.modeLogin; };
        CityFilterFilterService_1.prototype.GetStatusFilterCity = function () {
            var dataList = this._StorageService.GetCityFilter();
            if (dataList) {
                var listCityFilter = JSON.parse(dataList);
                if (listCityFilter.length > 0)
                    return true;
            }
            return false;
        };
        CityFilterFilterService_1.prototype.GetListFilterCity = function () {
            var dataList = this._StorageService.GetCityFilter();
            var list = new Array;
            if (dataList) {
                var listCityFilter = JSON.parse(dataList);
                if (listCityFilter)
                    list = listCityFilter;
            }
            return list;
        };
        return CityFilterFilterService_1;
    }());
    __setFunctionName(_classThis, "CityFilterFilterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CityFilterFilterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CityFilterFilterService = _classThis;
}();
exports.CityFilterFilterService = CityFilterFilterService;
//# sourceMappingURL=CityFilterService.js.map