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
exports.UtilitiService = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../Models/Structure/tblProduct");
var UtilitiService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UtilitiService = _classThis = /** @class */ (function () {
        function UtilitiService_1(titleService, _viewAlert, Login, _Alert) {
            this._viewAlert = _viewAlert;
            this.Login = Login;
            this._Alert = _Alert;
            this._titleService = titleService;
        }
        UtilitiService_1.prototype.GetLocalStorage = function (name) {
            try {
                var item = window.localStorage.getItem(name);
                return item !== null && item != undefined ? item : "";
            }
            catch (e) {
                return undefined;
            }
        };
        UtilitiService_1.prototype.SetLocalStorage = function (name, value) {
            window.localStorage.setItem(name, value);
        };
        UtilitiService_1.prototype.SetTitle = function (title, obj) {
            obj._titleService.setTitle('Más Herramientas');
        };
        UtilitiService_1.prototype.scrollToBottom = function (Byid_1) {
            return __awaiter(this, arguments, void 0, function (Byid, scroll) {
                var container;
                if (scroll === void 0) { scroll = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Espera 1000 milisegundos (1 segundo)
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 800); })];
                        case 1:
                            // Espera 1000 milisegundos (1 segundo)
                            _a.sent();
                            container = document.getElementById(Byid);
                            if (container) {
                                container.scrollTo({
                                    top: scroll == 0 ? (container.scrollHeight + container.scrollHeight) : (scroll),
                                    behavior: 'smooth'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UtilitiService_1.prototype.scrollTop = function (Byid_1) {
            return __awaiter(this, arguments, void 0, function (Byid, scroll) {
                var container;
                if (scroll === void 0) { scroll = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Espera 1000 milisegundos (1 segundo)
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 800); })];
                        case 1:
                            // Espera 1000 milisegundos (1 segundo)
                            _a.sent();
                            container = document.getElementById(Byid);
                            if (container) {
                                container.scrollTo({
                                    top: scroll > 1 ? (container.scrollHeight + container.scrollHeight) : (scroll),
                                    behavior: 'smooth'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UtilitiService_1.prototype.GuidIsEmpty = function (guid) {
            return guid == "00000000-0000-0000-0000-000000000000";
        };
        UtilitiService_1.prototype.GuidEmpty = function () {
            return "00000000-0000-0000-0000-000000000000";
        };
        UtilitiService_1.prototype.GetNameConcept = function (name, value, id) {
            var data = new tblProduct_1.NameConcept();
            data.name = name != null ? name : "";
            data.value = value != null ? value : "";
            data.id = id != null ? id : "";
            return data;
        };
        UtilitiService_1.prototype.ConverCurrency = function (actualPrice, currency, currencyName, style) {
            if (currency === void 0) { currency = "es-CO"; }
            if (currencyName === void 0) { currencyName = "COP"; }
            if (style === void 0) { style = "currency"; }
            if (isNaN(actualPrice))
                actualPrice = 0;
            var numberValue = Intl.NumberFormat(currency, { currency: currencyName, minimumFractionDigits: 0 }).format(actualPrice);
            return numberValue;
        };
        UtilitiService_1.prototype.alertMsg = function (msg) {
            this._Alert.Alert(msg);
        };
        UtilitiService_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return UtilitiService_1;
    }());
    __setFunctionName(_classThis, "UtilitiService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UtilitiService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UtilitiService = _classThis;
}();
exports.UtilitiService = UtilitiService;
//# sourceMappingURL=UtilitisService.js.map