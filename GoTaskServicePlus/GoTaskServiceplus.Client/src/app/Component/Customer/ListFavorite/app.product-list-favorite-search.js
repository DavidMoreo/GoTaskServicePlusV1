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
exports.ListFavorite = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_product_item_product_1 = require("../../Product/ProductItem/app.product-item-product");
var app_menu_phone_1 = require("../../Common/MenuPhone/app.menu-phone");
var app_product_item_row_product_1 = require("../../Product/ProductItemRow/app.product-item-row-product");
var ListFavorite = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-product-list-favorite-search',
            templateUrl: './app.product-list-favorite-search.component.html',
            styleUrls: ['app.product-list-favorite-search.css'],
            imports: [app_product_item_product_1.ItemProductView, app_product_item_row_product_1.ItemRowProductView, app_common_loading_1.LoadingComponent, forms_1.FormsModule, app_menu_phone_1.MenuPhone]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ListFavorite = _classThis = /** @class */ (function () {
        function ListFavorite_1(route, titleService, param, search, productItemService) {
            this.route = route;
            this.type = "all";
            this.page = 0;
            this._param = param;
            this._titleService = titleService;
            this._search = search;
            this._productItemService = productItemService;
        }
        ListFavorite_1.prototype.ngOnInit = function () {
            this._titleService.setTitle('Mis Productos');
            this.Search();
        };
        ListFavorite_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ListFavorite_1.prototype.Search = function () {
            this._search.GetAllProductFavorite(this.page);
        };
        return ListFavorite_1;
    }());
    __setFunctionName(_classThis, "ListFavorite");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListFavorite = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListFavorite = _classThis;
}();
exports.ListFavorite = ListFavorite;
//# sourceMappingURL=app.product-list-favorite-search.js.map