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
exports.NotLoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var NotLoginComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-not-login",
            templateUrl: './app.not-login-component.html',
            styleUrls: ['app.not-login.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _cardContentHeader_decorators;
    var _cardContentHeader_initializers = [];
    var _cardContentHeader_extraInitializers = [];
    var NotLoginComponent = _classThis = /** @class */ (function () {
        function NotLoginComponent_1(location, configservice, cdRef, router) {
            this.location = location;
            this.router = router;
            this.cardContentHeader = __runInitializers(this, _cardContentHeader_initializers, void 0);
            this._location = __runInitializers(this, _cardContentHeader_extraInitializers);
            this._configservice = configservice;
            this._location = location;
            this._router = router;
            /*    this._autenticate = autenticate;*/
        }
        NotLoginComponent_1.prototype.ngOnInit = function () {
            var status = this._configservice.ValidationLogin();
            var currentUrl = this._location.path();
            if (!status) {
                this._isNotLlogin = false;
            }
            else {
                this._isNotLlogin = true;
            }
        };
        NotLoginComponent_1.prototype.Route = function (name) {
            this._router.navigate([name]);
        };
        return NotLoginComponent_1;
    }());
    __setFunctionName(_classThis, "NotLoginComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _cardContentHeader_decorators = [(0, core_1.ContentChild)("header")];
        __esDecorate(null, null, _cardContentHeader_decorators, { kind: "field", name: "cardContentHeader", static: false, private: false, access: { has: function (obj) { return "cardContentHeader" in obj; }, get: function (obj) { return obj.cardContentHeader; }, set: function (obj, value) { obj.cardContentHeader = value; } }, metadata: _metadata }, _cardContentHeader_initializers, _cardContentHeader_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotLoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotLoginComponent = _classThis;
}();
exports.NotLoginComponent = NotLoginComponent;
//# sourceMappingURL=app.not-login.js.map