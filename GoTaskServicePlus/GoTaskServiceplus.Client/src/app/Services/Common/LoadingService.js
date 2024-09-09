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
exports.LoadingServiceControl = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var LoadingServiceControl = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoadingServiceControl = _classThis = /** @class */ (function () {
        function LoadingServiceControl_1(_http, host) {
            this._http = _http;
            this._ActionLoading = new rxjs_1.Subject();
            this._ActionLoading$ = this._ActionLoading.asObservable();
            this.loadImm = false;
            this.statusLoading = false;
            this._active = false;
            this._count = 0;
            this.alertId = 0;
            this.alertIdTimer = 0;
            this._host = host;
        }
        LoadingServiceControl_1.prototype.Loading = function (mode, msg, count) {
            if (msg === void 0) { msg = "Espere un momento..."; }
            if (count === void 0) { count = 0; }
            //if (mode == true) this._active = mode;
            this.LoadingTimer();
            this._active = mode;
            this._count = count;
            this._text = msg;
            this._ActionLoading.next({ mode: mode, count: count, msg: msg });
        };
        LoadingServiceControl_1.prototype.LoadingTimer = function () {
            var _this = this;
            if (!this.statusLoading) {
                this.statusLoading = true;
                clearInterval(this.timer);
                this.timer = setInterval(function () {
                    _this._active = false;
                    clearInterval(_this.timer);
                }, 100); // Cambia el tiempo de espera según sea necesario
            }
        };
        LoadingServiceControl_1.prototype.startTimer = function () {
            var _this = this;
            this.intervalId = setInterval(function () {
                if (_this.alertIdTimer == _this.alertId) {
                    if (_this._active) {
                        _this._active = false;
                        clearInterval(_this.intervalId);
                        /* alert("Lo sentimos, ya estamos trabajando para solucionarlo, Tiempo agotado.");*/
                    }
                }
            }, 39000); // Cambia el tiempo de espera según sea necesario
            this.alertIdTimer = this.alertId;
        };
        LoadingServiceControl_1.prototype.GetImgProduct = function (filter, type, page) {
            var _this = this;
            type = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
            var result = this._http.get(this._host.GetHostApi() + "Product/GetProductImageByName?filter=".concat(filter, "&typeId=").concat(type));
            result.subscribe({
                next: function (e) {
                    _this.listProductImg = e.data;
                    _this.productImg = _this.listProductImg[0];
                    _this.productImg.url = _this.productImg.url.replace("PC", "PHONE");
                },
                error: function (error) {
                }
            });
            return result;
        };
        return LoadingServiceControl_1;
    }());
    __setFunctionName(_classThis, "LoadingServiceControl");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoadingServiceControl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoadingServiceControl = _classThis;
}();
exports.LoadingServiceControl = LoadingServiceControl;
//# sourceMappingURL=LoadingService.js.map