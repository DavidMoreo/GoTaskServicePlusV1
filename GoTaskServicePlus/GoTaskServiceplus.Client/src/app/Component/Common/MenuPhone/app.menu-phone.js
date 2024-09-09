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
exports.MenuPhone = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_btn_bot_1 = require("../BtnBot/app.btn-bot");
var MenuPhone = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-menu-phone',
            templateUrl: './app.menu-phone.component.html',
            styleUrls: ['app.menu-phone.css'],
            imports: [app_common_loading_1.LoadingComponent, forms_1.FormsModule, app_btn_bot_1.BtnBotMsg]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MenuPhone = _classThis = /** @class */ (function () {
        function MenuPhone_1(route, chatBotService, configService, _cdRef, Gps) {
            this.route = route;
            this._cdRef = _cdRef;
            this.Gps = Gps;
            this.mode = true;
            this.classMode = "div-menu-phone-dafaul";
            this._configService = configService;
        }
        MenuPhone_1.prototype.ngDoCheck = function () {
            this.detectarNavegador();
        };
        MenuPhone_1.prototype.ngOnInit = function () {
            if (this._titleService != undefined)
                this._titleService.setTitle('Mis Productos');
        };
        MenuPhone_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        MenuPhone_1.prototype.GpsLoad = function () {
            this.Gps.SetCordinates();
        };
        MenuPhone_1.prototype.detectarNavegador = function () {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && 'caches' in window) {
            }
            else {
                this.mode = false;
            }
            var esChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            if (esChrome) {
                this.classMode = "div-menu-phone";
                this._cdRef.detectChanges();
            }
            else {
                this.classMode = "div-menu-phone-dafaul";
                this._cdRef.detectChanges();
            }
        };
        return MenuPhone_1;
    }());
    __setFunctionName(_classThis, "MenuPhone");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MenuPhone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MenuPhone = _classThis;
}();
exports.MenuPhone = MenuPhone;
//# sourceMappingURL=app.menu-phone.js.map