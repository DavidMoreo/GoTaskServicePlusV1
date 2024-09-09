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
exports.PermissionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_btn_bot_1 = require("../Common/BtnBot/app.btn-bot");
var PermissionComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-permission",
            templateUrl: './app.permission-component.html',
            styleUrls: ['app.permission.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_btn_bot_1.BtnBotMsg]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _enable_decorators;
    var _enable_initializers = [];
    var _enable_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _scrollName_decorators;
    var _scrollName_initializers = [];
    var _scrollName_extraInitializers = [];
    var _cardContentHeader_decorators;
    var _cardContentHeader_initializers = [];
    var _cardContentHeader_extraInitializers = [];
    var PermissionComponent = _classThis = /** @class */ (function () {
        function PermissionComponent_1(location, cdRef, router, Permission, _configservice) {
            this.location = location;
            this.router = router;
            this._configservice = _configservice;
            this._visible = false;
            this.enable = __runInitializers(this, _enable_initializers, true);
            this.page = (__runInitializers(this, _enable_extraInitializers), __runInitializers(this, _page_initializers, void 0));
            this.scrollName = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _scrollName_initializers, ""));
            this.cardContentHeader = (__runInitializers(this, _scrollName_extraInitializers), __runInitializers(this, _cardContentHeader_initializers, void 0));
            this._location = __runInitializers(this, _cardContentHeader_extraInitializers);
            this._location = location;
            this._router = router;
            this._Permission = Permission;
            this._cdRef = cdRef;
        }
        PermissionComponent_1.prototype.ngOnInit = function () {
            if (this.enable) {
                var status = this._Permission.ValidationLogin(this.page);
                this._visible = status;
                var currentUrl = this._location.path();
            }
            else {
                this._visible = true;
            }
        };
        PermissionComponent_1.prototype.Route = function (name) {
        };
        return PermissionComponent_1;
    }());
    __setFunctionName(_classThis, "PermissionComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [(0, core_1.Input)()];
        _page_decorators = [(0, core_1.Input)()];
        _scrollName_decorators = [(0, core_1.Input)()];
        _cardContentHeader_decorators = [(0, core_1.ContentChild)("header")];
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: function (obj) { return "enable" in obj; }, get: function (obj) { return obj.enable; }, set: function (obj, value) { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _enable_extraInitializers);
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _scrollName_decorators, { kind: "field", name: "scrollName", static: false, private: false, access: { has: function (obj) { return "scrollName" in obj; }, get: function (obj) { return obj.scrollName; }, set: function (obj, value) { obj.scrollName = value; } }, metadata: _metadata }, _scrollName_initializers, _scrollName_extraInitializers);
        __esDecorate(null, null, _cardContentHeader_decorators, { kind: "field", name: "cardContentHeader", static: false, private: false, access: { has: function (obj) { return "cardContentHeader" in obj; }, get: function (obj) { return obj.cardContentHeader; }, set: function (obj, value) { obj.cardContentHeader = value; } }, metadata: _metadata }, _cardContentHeader_initializers, _cardContentHeader_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionComponent = _classThis;
}();
exports.PermissionComponent = PermissionComponent;
//# sourceMappingURL=app.permission.js.map