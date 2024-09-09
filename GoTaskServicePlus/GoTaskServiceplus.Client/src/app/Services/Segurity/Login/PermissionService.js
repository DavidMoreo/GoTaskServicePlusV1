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
exports.PermissionService = void 0;
var core_1 = require("@angular/core");
var PermissionService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PermissionService = _classThis = /** @class */ (function () {
        function PermissionService_1(_CommonService, http, route, login, _configservice, _util, Register) {
            this._CommonService = _CommonService;
            this.http = http;
            this.route = route;
            this._util = _util;
            this.Register = Register;
            this.counter = 0;
            this._configservice = _configservice;
            this._route = route;
            this._login = login;
            this._http = http;
        }
        PermissionService_1.prototype.secretKey = function () { return 'miClaveSecreta'; };
        PermissionService_1.prototype.ValidationStatusLogin = function () {
            var keyActive = this._configservice.ValidationLogin();
            return keyActive;
        };
        PermissionService_1.prototype.ValidationLogin = function (page, mode) {
            if (mode === void 0) { mode = true; }
            this.Register.ValidateUserActive();
            if (mode) {
                try {
                    var keyActive = false;
                    if (page != "*")
                        keyActive = this._configservice.ValidationLogin();
                    this.ActionKey(keyActive);
                    if (!keyActive)
                        return false;
                    var rol = this._configservice.GetRols();
                    var isPublic = this.IsPublic(page);
                    //alert("isPublic :"+ isPublic);
                    if (isPublic)
                        return true;
                    var adminRol = this.IsAdmin(rol);
                    /*   alert("adminRol :" + adminRol);*/
                    if (adminRol)
                        return true;
                    var vendorVendor = this.IsVendor(rol, page);
                    /*alert("vendorMarker :" + vendorVendor);*/
                    if (vendorVendor)
                        return true;
                    var vendorMarker = this.IsMarker(rol, page);
                    //alert("vendorMarker :" + vendorMarker);
                    if (vendorMarker)
                        return true;
                    var vendorCustomer = this.IsCustomer(rol, page);
                    /*  alert("vendorCustomer :" + vendorCustomer);*/
                    if (vendorCustomer)
                        return true;
                    this._CommonService._AlertService.Alert("Su rol actualmente no tiene autorizacion para esta funcción");
                    this.RedirectPage(page);
                    return false;
                }
                catch (e) {
                    //alert("error");
                    this._configservice.DeleteBeareLogin();
                    this.route.navigate(["/login"]);
                }
                this.route.navigate(["/login"]);
                return false;
            }
            return true;
        };
        PermissionService_1.prototype.ActionKey = function (keyActive) {
            if (!keyActive) {
                this._configservice.DeleteBeareLogin();
                this.route.navigate(["/login"]);
            }
        };
        PermissionService_1.prototype.IsAdmin = function (rols) {
            var status = false;
            var exist = rols.find(function (s) { return s.isAdmin; });
            status = exist != null;
            return status;
        };
        PermissionService_1.prototype.IsPublic = function (page) {
            if (page == "*")
                return true;
            return false;
        };
        PermissionService_1.prototype.IsVendor = function (rols, page) {
            var exist = rols.filter(function (s) { return s.isVendor && s.permissionByRoll.page == page && s.permissionByRoll.read; });
            return (exist != null && exist.length > 0);
        };
        PermissionService_1.prototype.IsMarker = function (rols, page) {
            var exist = rols.filter(function (s) { return s.isMaker && s.permissionByRoll.page == page && s.permissionByRoll.read; });
            return (exist != null && exist.length > 0);
        };
        PermissionService_1.prototype.IsCustomer = function (rols, page) {
            var exist = rols.filter(function (s) { return s.isCustomer && s.permissionByRoll.page == page && s.permissionByRoll.read; });
            return (exist != null && exist.length > 0);
        };
        PermissionService_1.prototype.RedirectPage = function (page) {
            this.route.navigate(["/home-menu"]);
        };
        PermissionService_1.prototype.alertMsg = function (msg, status) {
            this._util.alertMsg(this.languageTraslate(msg));
        };
        PermissionService_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return PermissionService_1;
    }());
    __setFunctionName(_classThis, "PermissionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionService = _classThis;
}();
exports.PermissionService = PermissionService;
//# sourceMappingURL=PermissionService.js.map