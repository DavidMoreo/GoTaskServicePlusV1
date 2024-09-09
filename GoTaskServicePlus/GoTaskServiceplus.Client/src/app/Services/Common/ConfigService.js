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
exports.ConfigService = void 0;
var core_1 = require("@angular/core");
var ConfigService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConfigService = _classThis = /** @class */ (function () {
        function ConfigService_1(route, _Storage) {
            this.route = route;
            this._Storage = _Storage;
            this.hostApi = "https://localhost:7192/";
            // private hostApi: string = "https://gotaskservice.com/";
            this.nameCompany = "Go Task Service";
            this.nameProject = "Go Task Service";
        }
        ConfigService_1.prototype.secretKey = function () { return 'miClaveSecreta'; };
        ConfigService_1.prototype.GetHostImg = function () {
            return "https://gotaskservice.com/";
            //return "https://localhost:7192/";
            //return "https://migestion.bsite.net/";
        };
        ConfigService_1.prototype.GetHostApi = function () {
            return this.hostApi;
        };
        ConfigService_1.prototype.GetBaseUrl = function () {
            return document.getElementsByTagName('base')[0].href;
        };
        ConfigService_1.prototype.GetUrlImgItem = function (image, scaleTo) {
            var idFolderCompany = "";
            image.idCompany.toString().split("-").forEach(function (e) {
                idFolderCompany += e;
            });
            var host = this.GetHostImg();
            var url = "";
            var productUrl = "Files/product/";
            var name = image.url;
            if (name == "")
                url = host + "Img/logo.png";
            else
                url = host + productUrl + idFolderCompany + "/" + name.replace("PC", scaleTo);
            return url;
        };
        ConfigService_1.prototype.GetUrlImg = function (urlImg, scaleTo) {
            var host = this.GetHostImg();
            var url = "";
            var productUrl = "Files/product/";
            var name = urlImg;
            if (name == "")
                url = host + "Img/logo.png";
            else
                url = host + productUrl + name.replace("PC", scaleTo);
            return url;
        };
        ConfigService_1.prototype.GetUrlImgAndIdCompany = function (urlImg, idCompnay, scaleTo) {
            var host = this.GetHostImg();
            var url = "";
            var productUrl = "Files/product/";
            var name = urlImg;
            if (name == "")
                url = host + "Img/logo.png";
            else
                url = host + productUrl + idCompnay.replace("-", "") + "/" + name.replace("PC", scaleTo);
            return url;
        };
        ConfigService_1.prototype.GetUrlImgBuy = function (image, scaleTo) {
            var idFolderCompany = "";
            image.idCompany.toString().split("-").forEach(function (e) {
                idFolderCompany += e;
            });
            var host = this.GetHostImg();
            var url = "";
            var productUrl = "Files/product/";
            var name = image.ico;
            if (name == "")
                url = host + "Img/logo.png";
            else
                url = host + productUrl + idFolderCompany + "/" + name.replace("PC", scaleTo);
            return url;
        };
        ConfigService_1.prototype.ValidationLogin = function () {
            var keyDesEncript = this._Storage.GetKeyUser();
            if (keyDesEncript) {
                return true;
            }
            return false;
        };
        ConfigService_1.prototype.GetRols = function () {
            var rol = new Array();
            var contect = this._Storage.GetRol();
            rol = JSON.parse(contect);
            return rol;
        };
        ConfigService_1.prototype.DeleteBeareLogin = function () {
            this._Storage.ClearKeyUser();
            this._Storage.ClearNameUser();
            this._Storage.ClearProject();
            this._Storage.ClearRol();
            var exist = this._Storage.GetKeyUser();
            if (exist == null || exist == "" || exist == undefined) {
                this.route.navigate(["/Login"]);
                return true;
            }
            else {
                return false;
            }
        };
        return ConfigService_1;
    }());
    __setFunctionName(_classThis, "ConfigService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConfigService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConfigService = _classThis;
}();
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map