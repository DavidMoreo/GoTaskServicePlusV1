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
exports.CityFilterComponent = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var CityFilterComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: "app-common-city-filter",
            templateUrl: './app.common-city-filter.component.html',
            styleUrls: ['./app.common-city-filter.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CityFilterComponent = _classThis = /** @class */ (function () {
        function CityFilterComponent_1(_Route, CommonService, _search, cdRef, _StorageService, Register) {
            this._Route = _Route;
            this.CommonService = CommonService;
            this._search = _search;
            this.cdRef = cdRef;
            this._StorageService = _StorageService;
            this.Register = Register;
        }
        CityFilterComponent_1.prototype.ngOnInit = function () {
            this.LoadData();
        };
        CityFilterComponent_1.prototype.LoadData = function () {
            this.GetListConcept(tblProduct_1.TypeConcepValue.CityConcept());
        };
        CityFilterComponent_1.prototype.GetListConcept = function (type) {
            var _this = this;
            var response = this.CommonService._CityFilterFilterService.GetListByName(type, "");
            response.subscribe(function (e) {
                if (_this.CommonService._CityFilterFilterService.listCity == undefined)
                    _this.CommonService._CityFilterFilterService.listCity = new Array;
                _this.CommonService._CityFilterFilterService.listCity = e.data;
            });
        };
        CityFilterComponent_1.prototype.GetFIlter = function () {
            if (!this.CommonService._CityFilterFilterService.listCityFilter)
                return new Array;
            return this.CommonService._CityFilterFilterService.listCityFilter;
        };
        CityFilterComponent_1.prototype.ChangedFilterInput = function (event) {
            var value = event.target.value;
            if (this.CommonService._CityFilterFilterService.listCity && value) {
                var data = this.CommonService._CityFilterFilterService.listCity.filter(function (s) { return s.name.toLowerCase().includes(value.toLowerCase()); });
                this.CommonService._CityFilterFilterService.listCityFilter = data;
                if (this.cdRef != undefined)
                    this.cdRef.detectChanges();
            }
            else {
                this.CommonService._CityFilterFilterService.listCityFilter = new Array;
            }
        };
        CityFilterComponent_1.prototype.AddCityFilter = function (city) {
            var listCityFilter = new Array();
            var exist;
            var dataList = this._StorageService.GetCityFilter();
            if (listCityFilter && dataList) {
                listCityFilter = JSON.parse(dataList);
            }
            if (listCityFilter) {
                exist = listCityFilter.find(function (s) { return s.id == city.id; });
            }
            if (listCityFilter)
                listCityFilter = listCityFilter.filter(function (s) { return s.id != city.id; });
            if (!exist) {
                var item = new tblProduct_1.NameConcept();
                item.id = city.id;
                item.value = city.value;
                listCityFilter.push(item);
            }
            this._StorageService.SetCityFilter(JSON.stringify(listCityFilter));
        };
        CityFilterComponent_1.prototype.Remove = function (id) {
            var listCityFilter = new Array();
            var dataList = this._StorageService.GetCityFilter();
            if (listCityFilter && dataList) {
                listCityFilter = JSON.parse(dataList);
                listCityFilter = listCityFilter.filter(function (s) { return s.id != id; });
            }
            this._StorageService.SetCityFilter(JSON.stringify(listCityFilter));
        };
        CityFilterComponent_1.prototype.ExisteCity = function (id) {
            var listCityFilter = new Array();
            var exist;
            var dataList = this._StorageService.GetCityFilter();
            if (listCityFilter && dataList) {
                listCityFilter = JSON.parse(dataList);
            }
            if (listCityFilter) {
                exist = listCityFilter.find(function (s) { return s.id == id; });
            }
            if (exist) {
                return true;
            }
            return false;
        };
        CityFilterComponent_1.prototype.GetListFilter = function () {
            var dataList = this._StorageService.GetCityFilter();
            if (dataList) {
                var listCityFilter = JSON.parse(dataList);
                return listCityFilter;
            }
            return new Array;
        };
        CityFilterComponent_1.prototype.GetModeVisible = function () { return this.CommonService._CityFilterFilterService.GetModeVisible(); };
        CityFilterComponent_1.prototype.GetModeCity = function () { return this.CommonService._CityFilterFilterService.GetModeCity(); };
        CityFilterComponent_1.prototype.GetModeLogin = function () { return this.CommonService._CityFilterFilterService.GetModeLogin(); };
        CityFilterComponent_1.prototype.CloseModeVisible = function () {
            this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
            this._search.FilterProduct();
        };
        CityFilterComponent_1.prototype.SetIdUser = function () {
            this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
            this.Register.SetIdUser();
        };
        CityFilterComponent_1.prototype.SetRoute = function (name) {
            this._Route.navigateByUrl(name);
            this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
        };
        return CityFilterComponent_1;
    }());
    __setFunctionName(_classThis, "CityFilterComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CityFilterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CityFilterComponent = _classThis;
}();
exports.CityFilterComponent = CityFilterComponent;
//# sourceMappingURL=app.common-city-filter.js.map