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
exports.ShareService = void 0;
var core_1 = require("@angular/core");
var ShareService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ShareService = _classThis = /** @class */ (function () {
        function ShareService_1(http, configservice) {
            this.http = http;
            this.shareActive = false;
        }
        ShareService_1.prototype.shareData = function (title, text, url) {
            // Lógica para compartir datos utilizando la API de navegador
            // Por ejemplo, puedes usar navigator.share si está disponible en el navegador
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: url
                }).then(function () {
                    console.log('Datos compartidos exitosamente');
                }).catch(function (error) {
                    console.error('Error al compartir:', error);
                });
            }
            else {
                console.error('La API de compartir no está soportada en este navegador');
            }
        };
        ShareService_1.prototype.shareFile = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var blob, fileArray;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.shareActive = true;
                            if (!navigator.share) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.readFileAsBlob(file)];
                        case 1:
                            blob = _a.sent();
                            fileArray = [new File([blob], file.name, { type: blob.type })];
                            navigator.share({
                                files: fileArray
                            }).then(function () {
                                _this.shareActive = false;
                                console.log('Archivo compartido exitosamente');
                            }).catch(function (error) {
                                _this.shareActive = false;
                                console.error('Error al compartir archivo:', error);
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            this.shareActive = false;
                            console.error('La API de compartir no está soportada en este navegador');
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ShareService_1.prototype.readFileAsBlob = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.onload = function () {
                                if (reader.result instanceof ArrayBuffer) {
                                    resolve(new Blob([new Uint8Array(reader.result)], { type: file.type }));
                                }
                                else {
                                    reject(new Error('Error al leer el archivo'));
                                }
                            };
                            reader.onerror = function () {
                                reject(new Error('Error al leer el archivo'));
                            };
                            reader.readAsArrayBuffer(file);
                        })];
                });
            });
        };
        ShareService_1.prototype.shareFileFromUrl = function (blob, url) {
            return __awaiter(this, void 0, void 0, function () {
                var file, shareData;
                var _this = this;
                return __generator(this, function (_a) {
                    if (navigator.share) {
                        this.shareActive = true;
                        file = new File([blob], "Producto.png", { type: blob.type });
                        shareData = {
                            url: url,
                            title: "Producto",
                            text: "Compra o vende productos",
                            files: [file]
                        };
                        if (navigator.canShare(shareData)) {
                            navigator.share(shareData)
                                .then(function () { _this.shareActive = false; })
                                .catch(function (error) {
                                console.error('Error al compartir archivo:', error);
                                _this.shareActive = false;
                            });
                        }
                        else {
                            this.shareActive = false;
                            alert("no se puede compartir");
                        }
                    }
                    else {
                        this.shareActive = false;
                        console.error('La API de compartir no está soportada en este navegador');
                    }
                    return [2 /*return*/];
                });
            });
        };
        ShareService_1.prototype.getFileNameFromUrl = function (url) {
            // Extraer el nombre del archivo de la URL
            var parts = url.split('/');
            return parts[parts.length - 1];
        };
        return ShareService_1;
    }());
    __setFunctionName(_classThis, "ShareService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShareService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShareService = _classThis;
}();
exports.ShareService = ShareService;
//# sourceMappingURL=ShareApi.js.map