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
exports.DowloadService = void 0;
var core_1 = require("@angular/core");
var DowloadService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DowloadService = _classThis = /** @class */ (function () {
        function DowloadService_1(http, _host) {
            this.http = http;
            this._host = _host;
            this._host = this._host;
        }
        DowloadService_1.prototype.GetVideo = function (url) {
            var result = this.http.getFileHttp("DowLoaderVideo?url=" + url);
            //var result = this.http.get(this._host.GetHostApi() + "DowLoaderVideo?url=" + url, {
            //  responseType: 'blob',
            //  observe: 'response',
            //}).pipe(
            //  map((res: any) => {
            //    return res.body;// new Blob([res.body], { type: "application/octet-stream" });
            //  })
            //);
            return result;
        };
        DowloadService_1.prototype.GetVideoInfo = function (url) {
            var result = this.http.getHttp("GetInfoVideo?url=" + url);
            return result;
        };
        DowloadService_1.prototype.GetDowloadVideoUrl = function (url) {
            var result = this.http.getHttp("DowLoaderVideoUrl?url=" + url);
            return result;
        };
        DowloadService_1.prototype.GetDowloadVideoPartial = function (url) {
            var result = this.http.getFileHttp("DowLoaderVideoPartial?url=" + url);
            return result;
        };
        DowloadService_1.prototype.GetDowloadVInfo = function (url) {
            var result = this.http.getHttp("DowLoaderVideoPartial?url=" + url);
            return result;
        };
        DowloadService_1.prototype.GetStreamAsList = function (id) {
            var result = this.http.getHttp("GetStreamAsList?id=" + id + "&restart=false");
            return result;
        };
        DowloadService_1.prototype.GetResponseHttp = function (data) {
            var dataString = JSON.stringify(data);
            var dataModel = JSON.parse(dataString);
            var returnModel = JSON.parse(dataModel.json);
            // console.log("returnModel", returnModel);
            return returnModel;
        };
        return DowloadService_1;
    }());
    __setFunctionName(_classThis, "DowloadService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DowloadService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DowloadService = _classThis;
}();
exports.DowloadService = DowloadService;
//# sourceMappingURL=DowloadYoutubeService.js.map