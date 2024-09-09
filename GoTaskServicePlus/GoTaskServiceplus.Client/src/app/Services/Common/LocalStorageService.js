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
exports.LocalStorageService = void 0;
var core_1 = require("@angular/core");
var crypto_js_1 = require("crypto-js");
var LocalStorageService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LocalStorageService = _classThis = /** @class */ (function () {
        function LocalStorageService_1() {
        }
        LocalStorageService_1.prototype.secretKey = function () { return 'miClaveSecreta'; };
        LocalStorageService_1.prototype.SetKeyUser = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("key", value);
        };
        LocalStorageService_1.prototype.GetKeyUser = function () {
            var data = localStorage.getItem("key");
            if (data)
                data = this.DecryptData(data);
            if (data) {
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearKeyUser = function () {
            localStorage.setItem("key", "");
        };
        LocalStorageService_1.prototype.SetRol = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("rol", value);
        };
        LocalStorageService_1.prototype.GetRol = function () {
            var data = localStorage.getItem("rol");
            if (data)
                data = this.DecryptData(data);
            if (data) {
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearRol = function () {
            localStorage.setItem("rol", "");
        };
        LocalStorageService_1.prototype.SetProject = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("project", value);
        };
        LocalStorageService_1.prototype.GetProject = function () {
            var data = localStorage.getItem("project");
            if (data)
                data = this.DecryptData(data);
            if (data) {
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearProject = function () {
            localStorage.setItem("project", "");
        };
        LocalStorageService_1.prototype.SetNameUser = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("user", value);
        };
        LocalStorageService_1.prototype.GetNameUser = function () {
            var data = localStorage.getItem("user");
            if (data)
                data = this.DecryptData(data);
            if (data) {
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearNameUser = function () {
            localStorage.setItem("user", "");
        };
        LocalStorageService_1.prototype.SetCityFilter = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("cityFilter", value);
        };
        LocalStorageService_1.prototype.GetCityFilter = function () {
            var data = localStorage.getItem("cityFilter");
            if (data)
                data = this.DecryptData(data);
            if (data)
                data = this.DecryptData(data);
            if (data) {
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearCityFilter = function () {
            localStorage.setItem("cityFilter", "");
        };
        LocalStorageService_1.prototype.SetIUser = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("idUSer", value);
        };
        LocalStorageService_1.prototype.GetIUser = function () {
            var data = localStorage.getItem("idUSer");
            if (data) {
                data = this.DecryptData(data);
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.SetGps = function (value) {
            /*value = this.EncryptData(value);*/
            localStorage.setItem("GPS", value);
        };
        LocalStorageService_1.prototype.GetGps = function () {
            var data = localStorage.getItem("GPS");
            if (data) {
                /* data = this.DecryptData(data);*/
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearIP = function () {
            localStorage.setItem("IP", "");
        };
        LocalStorageService_1.prototype.SetIP = function (value) {
            value = this.EncryptData(value);
            localStorage.setItem("IP", value);
        };
        LocalStorageService_1.prototype.GetIP = function () {
            var data = localStorage.getItem("IP");
            if (data) {
                data = this.DecryptData(data);
                return data;
            }
            else {
                return "";
            }
        };
        LocalStorageService_1.prototype.ClearGps = function () {
            /*value = this.EncryptData(value);*/
            localStorage.setItem("GPS", "");
        };
        LocalStorageService_1.prototype.EncryptData = function (data) {
            var encrypted = crypto_js_1.default.AES.encrypt(data, this.secretKey()).toString();
            return encrypted;
        };
        // Función para descifrar texto
        LocalStorageService_1.prototype.DecryptData = function (ciphertext) {
            try {
                var bytes = crypto_js_1.default.AES.decrypt(ciphertext, this.secretKey());
                var originalText = bytes.toString(crypto_js_1.default.enc.Latin1);
                return originalText;
            }
            catch (e) {
                return "";
            }
        };
        return LocalStorageService_1;
    }());
    __setFunctionName(_classThis, "LocalStorageService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocalStorageService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocalStorageService = _classThis;
}();
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=LocalStorageService.js.map