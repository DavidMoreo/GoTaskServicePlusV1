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
exports.BtnBotMsg = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var BtnBotMsg = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-btn-chat',
            templateUrl: './app.btn-bot.component.html',
            styleUrls: ['app.btn-bot.css'],
            imports: [app_common_loading_1.LoadingComponent, forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _scrollContainer_decorators;
    var _scrollContainer_initializers = [];
    var _scrollContainer_extraInitializers = [];
    var BtnBotMsg = _classThis = /** @class */ (function () {
        function BtnBotMsg_1(route, chatBotService, configService) {
            this.route = route;
            this.mode = true;
            this.scrollContainer = __runInitializers(this, _scrollContainer_initializers, void 0);
            __runInitializers(this, _scrollContainer_extraInitializers);
            this.route = route;
            this._chatBotService = chatBotService;
            this._configService = configService;
        }
        BtnBotMsg_1.prototype.ngOnInit = function () {
            if (this._titleService != undefined)
                this._titleService.setTitle('Mis Productos');
        };
        BtnBotMsg_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        BtnBotMsg_1.prototype.detectarNavegador = function () {
            if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && 'caches' in window) {
                /* console.log('El navegador es compatible con PWA');*/
            }
            else {
                /*console.log('El navegador no es compatible con PWA');*/
                this.mode = false;
            }
        };
        return BtnBotMsg_1;
    }());
    __setFunctionName(_classThis, "BtnBotMsg");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scrollContainer_decorators = [(0, core_1.ViewChild)('scrollContainer')];
        __esDecorate(null, null, _scrollContainer_decorators, { kind: "field", name: "scrollContainer", static: false, private: false, access: { has: function (obj) { return "scrollContainer" in obj; }, get: function (obj) { return obj.scrollContainer; }, set: function (obj, value) { obj.scrollContainer = value; } }, metadata: _metadata }, _scrollContainer_initializers, _scrollContainer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BtnBotMsg = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BtnBotMsg = _classThis;
}();
exports.BtnBotMsg = BtnBotMsg;
//# sourceMappingURL=app.btn-bot.js.map