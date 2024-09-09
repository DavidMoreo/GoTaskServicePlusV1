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
exports.HttpClientService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var HttpClientService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpClientService = _classThis = /** @class */ (function () {
        function HttpClientService_1(http, _host) {
            this.http = http;
            this._host = _host;
            this.secretKey = 'miClaveSecreta';
            this._baseUrl = this._host.GetHostApi();
        }
        HttpClientService_1.prototype.getHttpData = function (route) {
            var status = this._host.ValidationLogin();
            if (status) {
                var option = this.Header();
                var rerult = this.http.get(this._baseUrl + route);
                return rerult;
            }
            return new rxjs_1.Observable();
        };
        HttpClientService_1.prototype.getHttp = function (route) {
            var header = { Accept: "video/mp4" };
            var rerult = this.http.get(this._baseUrl + route, {
                reportProgress: true,
                observe: 'events',
                headers: header
            });
            return rerult;
        };
        HttpClientService_1.prototype.getFileHttp = function (route) {
            /*  var rerult = this.http.get<Blob>(this._baseUrl + route,);*/
            var header = { Accept: "video/mp4" };
            var result = this.http.get(this._host.GetHostApi() + route, {
                reportProgress: true,
                observe: 'events',
                responseType: 'blob',
                headers: header
            });
            return result;
        };
        HttpClientService_1.prototype.postHttp = function (route, body) {
            var rerult = this.http.post(this._baseUrl + route, body, {
                headers: this.Header()
            });
            return rerult;
        };
        HttpClientService_1.prototype.postHttpAny = function (route, body) {
            var rerult = this.http.post(this._baseUrl + route, body);
            return rerult;
        };
        /*  headers: this.Header("multipart/form-data")*/
        HttpClientService_1.prototype.postFromDataHttp = function (route, body) {
            var rerult = this.http.post(this._baseUrl + route, body, { headers: this.Header("multipart/form-data") });
            return rerult;
        };
        HttpClientService_1.prototype.putHttp = function (route, body) {
            var rerult = this.http.put(this._baseUrl + route, body);
            return rerult;
        };
        HttpClientService_1.prototype.deleteHttp = function (route, id) {
            var rerult = this.http.delete(this._baseUrl + route + "?id=" + id).subscribe(function (e) {
                console.log("prom", e);
                return e;
            });
            return new rxjs_1.Observable();
        };
        HttpClientService_1.prototype.getConvertJson = function (value) {
            var result = JSON.parse(value);
            return result;
        };
        HttpClientService_1.prototype.postHttpBeare = function (route) {
            var rerult = this.http.post(this._baseUrl + route, {
                headers: this.Header()
            });
            rerult.subscribe(console.log);
            return rerult;
        };
        HttpClientService_1.prototype.Header = function (type) {
            if (type === void 0) { type = 'application / json'; }
            var log = window.localStorage.getItem("key");
            this.Beare = log != null ? log : "";
            var headers1 = new http_1.HttpHeaders({
                "Authorization": this.Beare,
                "Content-Type": "application/json"
            });
            var headers = new http_1.HttpHeaders({
                Authorization: this.Beare
            });
            // headers = new HttpHeaders().set( 'Authorization', "Bearer "+this.Beare.toString() );
            return headers1;
        };
        return HttpClientService_1;
    }());
    __setFunctionName(_classThis, "HttpClientService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientService = _classThis;
}();
exports.HttpClientService = HttpClientService;
//# sourceMappingURL=HttpService.js.map