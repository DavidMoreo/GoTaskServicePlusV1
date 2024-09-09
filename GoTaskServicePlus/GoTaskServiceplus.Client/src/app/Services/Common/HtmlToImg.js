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
exports.HtmlToImgService = void 0;
var core_1 = require("@angular/core");
var html2canvas_1 = require("html2canvas");
var rxjs_1 = require("rxjs");
var HtmlToImgService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var HtmlToImgService = _classThis = /** @class */ (function () {
        function HtmlToImgService_1(http, _Share, ngxCaptureService, _configservice) {
            this.http = http;
            this._Share = _Share;
            this.ngxCaptureService = ngxCaptureService;
            this._configservice = _configservice;
            this.visible = false;
            this.content = __runInitializers(this, _content_initializers, void 0);
            __runInitializers(this, _content_extraInitializers);
            this.http = http;
            this._Share = _Share;
            this.ngxCaptureService = ngxCaptureService;
            this._configservice = _configservice;
        }
        HtmlToImgService_1.prototype.convertToImageqqq = function (name) {
            var _this = this;
            var elementToCapture = document.getElementById(name);
            if (elementToCapture != null) {
                this.ngxCaptureService.getImage(elementToCapture, true).subscribe(function (imagenBase64) {
                    var blob = _this.base64ToBlob(imagenBase64);
                    _this._Share.shareFileFromUrl(blob, "https://gotaskservice.com/");
                    // Aquí puedes hacer lo que necesites con la imagen en base64
                });
            }
        };
        HtmlToImgService_1.prototype.convertToImageHtml = function (name) {
            this.visible = true;
            var elementToCapture = document.getElementById(name);
            var result;
            if (elementToCapture != null) {
                result = this.ngxCaptureService.getImage(elementToCapture, true)
                    .pipe((0, rxjs_1.delay)(2000)); // Retraso de 2000 milisegundos (2 segundos)
                //.subscribe((imagenBase64) => {
                //  console.log("img", imagenBase64);
                //  // Aquí puedes hacer lo que necesites con la imagen en base64
                //});
            }
            return result;
        };
        HtmlToImgService_1.prototype.base64ToBlob = function (base64) {
            var byteCharacters = atob(base64);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: 'image/png' }); // Cambia 'image/png' al tipo de imagen correcto si es diferente
        };
        HtmlToImgService_1.prototype.base64ToBlob2 = function (base64, tipoDeMime) {
            if (tipoDeMime === void 0) { tipoDeMime = 'image/png'; }
            // Decodificar base64 para obtener datos binarios
            var datosBinarios = window.atob(base64);
            // Convertir datos binarios a un array de bytes
            var bytes = new Uint8Array(datosBinarios.length);
            for (var i = 0; i < datosBinarios.length; i++) {
                bytes[i] = datosBinarios.charCodeAt(i);
            }
            // Crear y retornar un objeto Blob con los bytes
            return new Blob([bytes], { type: tipoDeMime });
        };
        HtmlToImgService_1.prototype.convertToImage78 = function (name, url) {
            var _this = this;
            if (url === void 0) { url = "convertToImage"; }
            /*  this.visible = true;*/
            var elementToCapture = document.getElementById(name);
            console.log(elementToCapture);
            if (elementToCapture != null) {
                // Agregar un retraso de 1 segundo (1000 milisegundos) antes de tomar la captura de pantalla
                setTimeout(function () {
                    (0, html2canvas_1.default)(elementToCapture, {
                        useCORS: true, // Asegúrate de que las imágenes cumplan con CORS
                        allowTaint: true, // No permitas que el canvas se "contamine"
                        // Otras opciones que podrías necesitar
                    }).then(function (canvas) {
                        var imgData = canvas.toDataURL('image/png');
                        var blob = _this.dataURItoBlob(imgData);
                        _this._Share.shareFileFromUrl(blob, url);
                        console.log(blob);
                        /* this.visible = false; */
                    });
                }, 2000); // Retraso de 1 segundo (1000 milisegundos)
            }
        };
        HtmlToImgService_1.prototype.convertToImage = function (name, url) {
            var _this = this;
            var elementToCapture = document.getElementById(name);
            if (elementToCapture != null) {
                (0, html2canvas_1.default)(elementToCapture).then(function (canvas) {
                    var imgData = canvas.toDataURL('image/png');
                    var blob = _this.dataURItoBlob(imgData);
                    _this._Share.shareFileFromUrl(blob, url);
                });
            }
        };
        HtmlToImgService_1.prototype.dataURItoBlob = function (dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        };
        return HtmlToImgService_1;
    }());
    __setFunctionName(_classThis, "HtmlToImgService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _content_decorators = [(0, core_1.ViewChild)('content')];
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HtmlToImgService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HtmlToImgService = _classThis;
}();
exports.HtmlToImgService = HtmlToImgService;
//# sourceMappingURL=HtmlToImg.js.map