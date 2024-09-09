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
exports.Register = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var Register = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-segurity-register",
            templateUrl: './app.segurity-register.component.html',
            styleUrls: ['app.segurity-register.css'],
            imports: [forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Register = _classThis = /** @class */ (function () {
        function Register_1(configservice, sanitizer, route) {
            this.sanitizer = sanitizer;
            this.route = route;
            this._map = '';
            this._mapActive = false;
            this._page = 0;
            this._user = new RegisterModel_1.tblUser();
            this._visibleItem = 0;
            this._configservice = configservice;
            this.baseApi = this._configservice.GetHostApi();
            this._route = this.route;
            this.sanitizerMode();
        }
        Register_1.prototype.ngOnInit = function () {
        };
        Register_1.prototype.sanitizerMode = function () {
            try {
                this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizer.sanitize(core_1.SecurityContext.URL, this._map.split('"')[1]) + "");
            }
            catch (e) { }
        };
        Register_1.prototype.changeMap = function () {
            if (!this._map.search("iframe")) {
                this._map = "";
                this._mapActive = false;
            }
            else {
                this._mapActive = true;
            }
            this.sanitizerMode();
        };
        Register_1.prototype.save = function () {
            this._page++;
        };
        return Register_1;
    }());
    __setFunctionName(_classThis, "Register");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Register = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Register = _classThis;
}();
exports.Register = Register;
//# sourceMappingURL=app.segurity-register.js.map