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
exports.ChangedPasswordUser = void 0;
var core_1 = require("@angular/core");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var forms_1 = require("@angular/forms");
var LoginModel_1 = require("../../../Models/Segurity/Login/LoginModel");
var ChangedPasswordUser = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-segurity-changed-password-user",
            templateUrl: './app.segurity-changed-password-user.component.html',
            styleUrls: ['app.segurity-changed-password-user.css'],
            imports: [forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChangedPasswordUser = _classThis = /** @class */ (function () {
        function ChangedPasswordUser_1(_LoginSevice, configservice, _ComonService, route, service, _Key, _Encrypt) {
            this._LoginSevice = _LoginSevice;
            this._ComonService = _ComonService;
            this.route = route;
            this._Key = _Key;
            this._Encrypt = _Encrypt;
            this._map = '';
            this._mapActive = false;
            this._page = 0;
            this._user = new RegisterModel_1.tblUser();
            this.codeVerification = "";
            this.codeVerificationInput = "";
            this._visibleItem = 0;
            this._configservice = configservice;
            this._service = service;
            this._route = this.route;
        }
        ChangedPasswordUser_1.prototype.ngOnInit = function () {
        };
        ChangedPasswordUser_1.prototype.save = function () {
            this._ComonService._AlertService.Alert("Espere un momento");
            var changed = new LoginModel_1.ChangePassword();
            changed.code = this.codeVerificationInput;
            changed.password = this._user.password;
            changed.email = this._user.email;
            var response = this._LoginSevice.GetChangedPassword(changed);
        };
        ChangedPasswordUser_1.prototype.SetCodeVerification = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._user.email != "")) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._LoginSevice.GetKeyVerification(this._user.email.toString())];
                        case 1:
                            result = _a.sent();
                            result.subscribe({
                                next: function (e) {
                                    _this._ComonService._AlertService.Alert(e.msg + " " + _this._user.email);
                                    /*   this._loading.Loading(false);*/
                                },
                                error: function (error) {
                                    /*this._loading.Loading(false);*/
                                }
                            });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ChangedPasswordUser_1.prototype.GenerateKey = function () {
            var key = this._Encrypt.GenerateKey();
            this._user.password = key;
        };
        ChangedPasswordUser_1.prototype.Validation = function () {
            if (this.codeVerificationInput != "" && this._user.password.trim() != "")
                this.save();
            else
                this._ComonService._AlertService.Alert("Clave requerida");
        };
        ChangedPasswordUser_1.prototype.ValidationNumber = function () {
            if (this._user.email == null)
                return false;
            if (this._user.email == undefined)
                return false;
            if (this._user.email == "")
                return false;
            if (this._user.email.length < 10)
                return false;
            return true;
        };
        ChangedPasswordUser_1.prototype.ValidationCode = function () {
            if (!this.ValidationNumber())
                return false;
            if (this._user.password.trim() == "")
                return false;
            if (this._user.password.length < 8)
                return false;
            return true;
        };
        ChangedPasswordUser_1.prototype.CodeVerificationInput = function () {
            if (!this.ValidationCode())
                return false;
            if (!this.ValidationNumber())
                return false;
            if (this.codeVerificationInput == "")
                return false;
            if (this.codeVerificationInput.length < 4)
                return false;
            return true;
        };
        return ChangedPasswordUser_1;
    }());
    __setFunctionName(_classThis, "ChangedPasswordUser");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChangedPasswordUser = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChangedPasswordUser = _classThis;
}();
exports.ChangedPasswordUser = ChangedPasswordUser;
//# sourceMappingURL=app.segurity-changed-password-user.js.map