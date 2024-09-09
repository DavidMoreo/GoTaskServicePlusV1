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
exports.NavMenuComponent = void 0;
var core_1 = require("@angular/core");
var NavMenuComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-common-menu',
            templateUrl: './app.common-menu.component.html',
            styleUrls: ['app.common-menu.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _imputSearch_decorators;
    var _imputSearch_initializers = [];
    var _imputSearch_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var NavMenuComponent = _classThis = /** @class */ (function () {
        function NavMenuComponent_1(_CommonService, route, search, login, cdRef, loading) {
            this._CommonService = _CommonService;
            this.route = route;
            this.valueSeacrh = "";
            this.isExpanded = false;
            this.filter = "all";
            this.page = 0;
            this.imputSearch = __runInitializers(this, _imputSearch_initializers, void 0);
            this.search = (__runInitializers(this, _imputSearch_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            __runInitializers(this, _search_extraInitializers);
            this._CommonService = _CommonService;
            this.route = route;
            this._search = search;
            this._login = login;
            this._cdRef = cdRef;
            this._loading = loading;
        }
        NavMenuComponent_1.prototype.ngDoCheck = function () {
            // console.log(this._LoginStatus);
        };
        NavMenuComponent_1.prototype.ngOnInit = function () {
            this.ValidateLogin();
        };
        NavMenuComponent_1.prototype.GetNameProject = function () {
            var project = this._CommonService._StorageService.GetProject();
            var user = this._CommonService._StorageService.GetIUser();
            if (project != undefined && project != null && project != "")
                return project;
            return "Go Task Service";
        };
        NavMenuComponent_1.prototype.GetNameUser = function () {
            var user = this._CommonService._StorageService.GetNameUser();
            /*    console.log("user", user);*/
            if (user != undefined && user != null)
                return user;
            return "";
        };
        NavMenuComponent_1.prototype.collapse = function () {
            this.isExpanded = false;
        };
        NavMenuComponent_1.prototype.toggle = function (mode) {
            if (mode === void 0) { mode = false; }
            this.isExpanded = mode;
        };
        NavMenuComponent_1.prototype.toggleCloseSession = function () {
            this.isExpanded = !this.isExpanded;
            this.CloseSession();
        };
        NavMenuComponent_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        NavMenuComponent_1.prototype.searchProductValue = function (routeValue) {
            /*  this._loading.Loading(true);*/
            var search = "";
            if (this.filter != "") {
                this.filter.split(" ").forEach(function (e) {
                    if (e != "")
                        search += e + "-";
                });
                this.imputSearch.nativeElement.value = "";
                this.route.navigate([routeValue + "/" + search]);
            }
            else {
            }
            this.filter = "";
        };
        NavMenuComponent_1.prototype.OnchangeInputSearch = function (event) {
            this.filter = event.target.value;
            this.clean = "";
            this._cdRef.detectChanges();
        };
        NavMenuComponent_1.prototype.CloseSession = function () {
            var status = this._CommonService._ConfigService.DeleteBeareLogin();
            if (status)
                this._CommonService._NavMenuService.StatusLogin(false);
        };
        NavMenuComponent_1.prototype.ValidateLogin = function () {
            var status = this._CommonService._ConfigService.ValidationLogin();
            this._CommonService._NavMenuService.StatusLogin(status);
        };
        NavMenuComponent_1.prototype.Search = function () {
            this._search.GetAllProduct(this.filter, this.page);
        };
        NavMenuComponent_1.prototype.GetStatusLogin = function () {
            return this._CommonService._NavMenuService.GetStatusLogin();
        };
        return NavMenuComponent_1;
    }());
    __setFunctionName(_classThis, "NavMenuComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _imputSearch_decorators = [(0, core_1.ViewChild)('imputSearch')];
        _search_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _imputSearch_decorators, { kind: "field", name: "imputSearch", static: false, private: false, access: { has: function (obj) { return "imputSearch" in obj; }, get: function (obj) { return obj.imputSearch; }, set: function (obj, value) { obj.imputSearch = value; } }, metadata: _metadata }, _imputSearch_initializers, _imputSearch_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NavMenuComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NavMenuComponent = _classThis;
}();
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=app.common-menu.js.map