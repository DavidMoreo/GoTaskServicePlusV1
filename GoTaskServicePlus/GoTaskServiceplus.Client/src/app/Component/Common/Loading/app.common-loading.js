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
exports.LoadingComponent = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var LoadingComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-loading",
            templateUrl: './app.common-loading.component.html',
            styleUrls: ['./app.common-loading.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _active_decorators;
    var _active_initializers = [];
    var _active_extraInitializers = [];
    var LoadingComponent = _classThis = /** @class */ (function () {
        function LoadingComponent_1(service, configservice, _cdRef) {
            this._cdRef = _cdRef;
            this.active = __runInitializers(this, _active_initializers, false);
            this.intervalId = __runInitializers(this, _active_extraInitializers);
            this._Service = service;
            this._configservice = configservice;
        }
        LoadingComponent_1.prototype.ngOnInit = function () {
            this._Service._text = "Espere un momento...";
            var status = false; // this.ImgLoading();
            if (!status) {
                this._Service.productImg = new tblProduct_1.ImgItem();
                this._Service.productImg.url = "/assets/logo.png";
                this._Service.productImg.code = "";
            }
            /*   this.startTimerImg();*/
            //this._ServiceSubscription = this._Service._ActionLoading$.subscribe((e: any) => {
            //  /* this._Service._active =e.mode;*/
            //  this.alertId++;
            //  this._Service._active = e.mode;
            //  this.startTimer();
            //});
        };
        LoadingComponent_1.prototype.ngDoCheck = function () {
            /* alert(this._Service._active);*/
            /* this.ImgLoading();*/
        };
        LoadingComponent_1.prototype.ImgLoading = function () {
            if (this._Service.listProductImg == null || this._Service.listProductImg == undefined || this._Service.listProductImg.length <= 0) {
                this._Service.GetImgProduct("partial", "", 0);
                return false;
            }
            else {
                var count = Math.floor(Math.random() * (this._Service.listProductImg.length - 0)) + 0;
                this._Service.productImg = this._Service.listProductImg[count];
                this._Service.productImg.url = this._Service.productImg.url.replace("PC", "PHONE");
                this._cdRef.detectChanges();
                return true;
            }
        };
        LoadingComponent_1.prototype.close = function () {
            this._Service.Loading(false);
        };
        LoadingComponent_1.prototype.open = function () {
            this._Service.Loading(true);
        };
        LoadingComponent_1.prototype.ngOnDestroy = function () {
            if (this._ServiceSubscription != undefined)
                this._ServiceSubscription.unsubscribe();
        };
        LoadingComponent_1.prototype.GetUrlImg = function (image, scaleTo) {
            var url = this._configservice.GetUrlImgItem(image, scaleTo);
            return url;
        };
        LoadingComponent_1.prototype.startTimerImg = function () {
            var _this = this;
            if (!this._Service.loadImm) {
                clearInterval(this.intervalId);
                this.intervalId = setInterval(function () {
                    _this.ImgLoading();
                    _this._Service.loadImm = true;
                    /* console.log("Cambiando foto");*/
                }, 1000); // Cambia el tiempo de espera según sea necesario
            }
        };
        return LoadingComponent_1;
    }());
    __setFunctionName(_classThis, "LoadingComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _active_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: function (obj) { return "active" in obj; }, get: function (obj) { return obj.active; }, set: function (obj, value) { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoadingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoadingComponent = _classThis;
}();
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=app.common-loading.js.map