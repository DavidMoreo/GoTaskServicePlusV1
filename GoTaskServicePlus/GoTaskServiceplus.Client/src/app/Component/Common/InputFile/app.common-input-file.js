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
exports.SelectFileComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var SelectFileComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-input-file",
            templateUrl: './app.common-input-file.component.html',
            styleUrls: ['./app.common-input-file.css'],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _nameFile_decorators;
    var _nameFile_initializers = [];
    var _nameFile_extraInitializers = [];
    var _typeFile_decorators;
    var _typeFile_initializers = [];
    var _typeFile_extraInitializers = [];
    var _maxCountFile_decorators;
    var _maxCountFile_initializers = [];
    var _maxCountFile_extraInitializers = [];
    var _maxSizeFile_decorators;
    var _maxSizeFile_initializers = [];
    var _maxSizeFile_extraInitializers = [];
    var _EndFile_decorators;
    var _EndFile_initializers = [];
    var _EndFile_extraInitializers = [];
    var SelectFileComponent = _classThis = /** @class */ (function () {
        function SelectFileComponent_1(configservice, _InputImgService) {
            this.nameFile = __runInitializers(this, _nameFile_initializers, void 0);
            this.typeFile = (__runInitializers(this, _nameFile_extraInitializers), __runInitializers(this, _typeFile_initializers, void 0));
            this.maxCountFile = (__runInitializers(this, _typeFile_extraInitializers), __runInitializers(this, _maxCountFile_initializers, void 0));
            this.maxSizeFile = (__runInitializers(this, _maxCountFile_extraInitializers), __runInitializers(this, _maxSizeFile_initializers, void 0));
            this.EndFile = (__runInitializers(this, _maxSizeFile_extraInitializers), __runInitializers(this, _EndFile_initializers, void 0));
            this._cdRef = __runInitializers(this, _EndFile_extraInitializers);
            this.filesMax = 3;
            this.countFiles = 0;
            this.urlStorageFile = "";
            this.urlDriveFile = "";
            this.listImg = new Array();
            this._configservice = configservice;
            this._file = _InputImgService;
        }
        SelectFileComponent_1.prototype.ngDoCheck = function () {
            this.ChangedName();
        };
        SelectFileComponent_1.prototype.ngOnInit = function () {
        };
        SelectFileComponent_1.prototype.setView = function () {
            this._file.Setvisible(false);
            this._cdRef.detectChanges();
        };
        SelectFileComponent_1.prototype.TabMode = function (mode) {
            this._file.storageActive = mode;
            if (mode == tblProduct_1.TypeImgDbMode.Drive)
                this._file.TypeImgDbImg = tblProduct_1.TypeImgDbMode.Drive;
            if (mode == tblProduct_1.TypeImgDbMode.Storage)
                this._file.TypeImgDbImg = tblProduct_1.TypeImgDbMode.Storage;
            if (mode == tblProduct_1.TypeImgDbMode.File)
                this._file.TypeImgDbImg = tblProduct_1.TypeImgDbMode.File;
        };
        SelectFileComponent_1.prototype.onFileSelected = function (event) {
            this.countFiles = Number.parseInt(event.target.files.length);
            var count = this._file.listImg.length;
            var fileCount = (this.filesMax - count);
            var list = Array();
            list = event.target.files;
            if (fileCount > 0) {
                for (var i = 0; i < this.countFiles; i++) {
                    if (fileCount > i) {
                        var file = event.target.files[i];
                        var result = this._file.UploadFile(file, this.nameFile);
                        this._file.isLoding = true;
                    }
                }
            }
        };
        SelectFileComponent_1.prototype.handleHttpError = function (error) {
            console.error('Error en la solicitud:', error);
        };
        SelectFileComponent_1.prototype.onChangedUrl = function (event, mode) {
            var url = event.target.value;
            if (url.length > 5 && url.toLowerCase().includes('https://')) {
                this._file.isSaveUrl = true;
                if (this._file.TypeImgDbImg == tblProduct_1.TypeImgDbMode.Drive) {
                    this.urlDriveFile = url;
                }
                if (this._file.TypeImgDbImg == tblProduct_1.TypeImgDbMode.Storage) {
                    this.urlStorageFile = url;
                }
                if (this._file.TypeImgDbImg == tblProduct_1.TypeImgDbMode.File) {
                    this.urlDriveFile = "";
                    this.urlStorageFile = "";
                }
            }
            else {
                this._file.isSaveUrl = false;
            }
            this.isSavedMode();
        };
        SelectFileComponent_1.prototype.onChangedName = function (event, mode) {
            var value = event.target.value;
            this._file.nameFile = value;
            this.ChangedName();
            this.isSavedMode();
        };
        SelectFileComponent_1.prototype.ChangedName = function () {
            if (this._file.nameFile != undefined && this._file.nameFile.length > 5) {
                this._file.isSaveName = true;
            }
            else {
                this._file.isSaveName = false;
            }
        };
        SelectFileComponent_1.prototype.isSavedMode = function () {
            if (this._file.isSaveName && this._file.isSaveUrl) {
                this._file.isSave = true;
            }
            else {
                this._file.isSave = false;
            }
        };
        SelectFileComponent_1.prototype.CancelUpload = function () {
            this._file.isLoding = false;
        };
        return SelectFileComponent_1;
    }());
    __setFunctionName(_classThis, "SelectFileComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _nameFile_decorators = [(0, core_1.Input)({ required: false })];
        _typeFile_decorators = [(0, core_1.Input)({ required: false })];
        _maxCountFile_decorators = [(0, core_1.Input)({ required: false })];
        _maxSizeFile_decorators = [(0, core_1.Input)({ required: false })];
        _EndFile_decorators = [(0, core_1.Input)({ required: false })];
        __esDecorate(null, null, _nameFile_decorators, { kind: "field", name: "nameFile", static: false, private: false, access: { has: function (obj) { return "nameFile" in obj; }, get: function (obj) { return obj.nameFile; }, set: function (obj, value) { obj.nameFile = value; } }, metadata: _metadata }, _nameFile_initializers, _nameFile_extraInitializers);
        __esDecorate(null, null, _typeFile_decorators, { kind: "field", name: "typeFile", static: false, private: false, access: { has: function (obj) { return "typeFile" in obj; }, get: function (obj) { return obj.typeFile; }, set: function (obj, value) { obj.typeFile = value; } }, metadata: _metadata }, _typeFile_initializers, _typeFile_extraInitializers);
        __esDecorate(null, null, _maxCountFile_decorators, { kind: "field", name: "maxCountFile", static: false, private: false, access: { has: function (obj) { return "maxCountFile" in obj; }, get: function (obj) { return obj.maxCountFile; }, set: function (obj, value) { obj.maxCountFile = value; } }, metadata: _metadata }, _maxCountFile_initializers, _maxCountFile_extraInitializers);
        __esDecorate(null, null, _maxSizeFile_decorators, { kind: "field", name: "maxSizeFile", static: false, private: false, access: { has: function (obj) { return "maxSizeFile" in obj; }, get: function (obj) { return obj.maxSizeFile; }, set: function (obj, value) { obj.maxSizeFile = value; } }, metadata: _metadata }, _maxSizeFile_initializers, _maxSizeFile_extraInitializers);
        __esDecorate(null, null, _EndFile_decorators, { kind: "field", name: "EndFile", static: false, private: false, access: { has: function (obj) { return "EndFile" in obj; }, get: function (obj) { return obj.EndFile; }, set: function (obj, value) { obj.EndFile = value; } }, metadata: _metadata }, _EndFile_initializers, _EndFile_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectFileComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectFileComponent = _classThis;
}();
exports.SelectFileComponent = SelectFileComponent;
//# sourceMappingURL=app.common-input-file.js.map