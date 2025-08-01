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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var app_common_scroll_info_component_1 = require("../Common/ScrollInfo/app.common-scroll-info.component");
var app_product_list_product_1 = require("../Product/ListProduct/app.product-list-product");
var app_common_loading_1 = require("../Common/Loading/app.common-loading");
var app_permission_1 = require("../Permission/app.permission");
var app_menu_phone_1 = require("../Common/MenuPhone/app.menu-phone");
var HomeComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-home-home",
            templateUrl: './app.home-home-component.html',
            styleUrls: ['app.home-home.css'],
            imports: [app_common_scroll_info_component_1.ControInfo, app_product_list_product_1.ListProduct, app_common_loading_1.LoadingComponent, app_permission_1.PermissionComponent, app_menu_phone_1.MenuPhone]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HomeComponent = _classThis = /** @class */ (function () {
        function HomeComponent_1(configservice, loading, route, http, Permission, Uitil, _ProductPartial, hub) {
            this.route = route;
            this.http = http;
            this.hub = hub;
            this._visibleItem = 0;
            this._configservice = configservice;
            this._loading = loading;
            this._route = route;
            this._http = http;
            this._Permission = Permission;
            this._Uitil = Uitil;
            this._ProductPartial = _ProductPartial;
        }
        HomeComponent_1.prototype.ngOnInit = function () {
            this.Load();
            this.loadAr();
        };
        HomeComponent_1.prototype.loadAr = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        HomeComponent_1.prototype.Load = function () {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._ProductPartial.GetAllProduct("0")];
                        case 1:
                            _a.sent();
                            this._Uitil.scrollToBottom("scrollAuto");
                            count = (0, rxjs_1.interval)(7000);
                            count.subscribe(function (item) {
                                _this._visibleItem++;
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        HomeComponent_1.prototype.GetVisible = function (number) {
            if (this._visibleItem > 2)
                this._visibleItem = 0;
            return this._visibleItem === number;
        };
        HomeComponent_1.prototype.intervalSlider = function () {
        };
        HomeComponent_1.prototype.searchProduct = function (routeValue) {
            this._route.navigate([routeValue]);
        };
        HomeComponent_1.prototype.scrollToBottom = function (Byid_1) {
            return __awaiter(this, arguments, void 0, function (Byid, scroll) {
                var container;
                if (scroll === void 0) { scroll = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Espera 1000 milisegundos (1 segundo)
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                        case 1:
                            // Espera 1000 milisegundos (1 segundo)
                            _a.sent();
                            container = document.getElementById(Byid);
                            if (container) {
                                container.scrollTo({
                                    top: (scroll == 0 ? (container.scrollHeight + container.scrollHeight) : scroll),
                                    behavior: 'smooth'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return HomeComponent_1;
    }());
    __setFunctionName(_classThis, "HomeComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeComponent = _classThis;
}();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=app.home-home.js.map