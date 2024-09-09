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
exports.InputImgService = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../Models/Structure/tblProduct");
var InputImgService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var InputImgService = _classThis = /** @class */ (function () {
        function InputImgService_1(http, productItemService) {
            this.http = http;
            this.storageActive = 0;
            this.TypeImgDbImg = 0;
            this.listImg = new Array();
            this._productItemService = productItemService;
        }
        InputImgService_1.prototype.Setvisible = function (mode) {
            this.visible = mode;
        };
        InputImgService_1.prototype.UploadFile = function (file, name) {
            var _this = this;
            var formData = new FormData();
            formData.append("file", file);
            formData.append("NameFilePC", name);
            formData.append("Url", name);
            var rerult = this.http.postHttpAny("UploadFileWebp", formData).subscribe(function (e) {
                _this.isLoding = false;
                var img = new tblProduct_1.ImgItem();
                img = e.data;
                img.conceptCompany = new tblProduct_1.NameConcept();
                img.conceptPrevious = new tblProduct_1.NameConcept();
                img.conceptProject = new tblProduct_1.NameConcept();
                console.log("Donloader", img);
                if (_this.listImg.length <= 0) {
                    _this._productItemService._product.firsImg = img;
                    _this._productItemService._product.firsImg.conceptCompany = new tblProduct_1.NameConcept();
                    _this._productItemService._product.firsImg.conceptProject = new tblProduct_1.NameConcept();
                    _this._productItemService._product.firsImg.conceptPrevious = new tblProduct_1.NameConcept();
                    _this._productItemService._product.firsImg.referUse = new Array;
                }
                _this.listImg.push(img);
            });
        };
        return InputImgService_1;
    }());
    __setFunctionName(_classThis, "InputImgService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputImgService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputImgService = _classThis;
}();
exports.InputImgService = InputImgService;
//# sourceMappingURL=InputFileService.js.map