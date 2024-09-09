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
exports.EncryptService = void 0;
var core_1 = require("@angular/core");
var crypto_js_1 = require("crypto-js");
var EncryptService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EncryptService = _classThis = /** @class */ (function () {
        function EncryptService_1(_host) {
            this._host = _host;
        }
        // Función para cifrar texto
        EncryptService_1.prototype.EncryptData = function (data) {
            var encrypted = crypto_js_1.default.AES.encrypt(data, this._host.secretKey()).toString();
            return encrypted;
        };
        // Función para descifrar texto
        EncryptService_1.prototype.DecryptData = function (ciphertext) {
            try {
                var bytes = crypto_js_1.default.AES.decrypt(ciphertext, this._host.secretKey());
                var originalText = bytes.toString(crypto_js_1.default.enc.Latin1);
                return originalText;
            }
            catch (e) {
                return "";
            }
        };
        EncryptService_1.prototype.KeyCrypt = function (palabra, numero) {
            if (numero === void 0) { numero = 10; }
            var caracteres = palabra.split('');
            for (var i = 0; i < caracteres.length; i++) {
                caracteres[i] = String.fromCharCode(caracteres[i].charCodeAt(0) + numero);
            }
            return caracteres.join('');
        };
        EncryptService_1.prototype.KeyDesCrypt = function (palabra, numero) {
            if (numero === void 0) { numero = 10; }
            var caracteres = palabra.split('');
            for (var i = 0; i < caracteres.length; i++) {
                caracteres[i] = String.fromCharCode(caracteres[i].charCodeAt(0) - numero);
            }
            return caracteres.join('');
        };
        EncryptService_1.prototype.GenerateKey = function () {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_$#';
            var result = '';
            var charactersLength = characters.length;
            for (var i = 0; i < 10; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        return EncryptService_1;
    }());
    __setFunctionName(_classThis, "EncryptService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EncryptService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EncryptService = _classThis;
}();
exports.EncryptService = EncryptService;
//# sourceMappingURL=EncryptService%20.js.map