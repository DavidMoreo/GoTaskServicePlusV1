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
exports.InputTextComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var InputTextComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-input-text",
            templateUrl: './app.common-input-text.component.html',
            styleUrls: ['./app.common-input-text.css'],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _typeInput_decorators;
    var _typeInput_initializers = [];
    var _typeInput_extraInitializers = [];
    var _value_decorators;
    var _value_initializers = [];
    var _value_extraInitializers = [];
    var _width_decorators;
    var _width_initializers = [];
    var _width_extraInitializers = [];
    var _textTransform_decorators;
    var _textTransform_initializers = [];
    var _textTransform_extraInitializers = [];
    var _isRequired_decorators;
    var _isRequired_initializers = [];
    var _isRequired_extraInitializers = [];
    var _enable_decorators;
    var _enable_initializers = [];
    var _enable_extraInitializers = [];
    var _enableFilter_decorators;
    var _enableFilter_initializers = [];
    var _enableFilter_extraInitializers = [];
    var _isSelect_decorators;
    var _isSelect_initializers = [];
    var _isSelect_extraInitializers = [];
    var _byPulsation_decorators;
    var _byPulsation_initializers = [];
    var _byPulsation_extraInitializers = [];
    var _isMoney_decorators;
    var _isMoney_initializers = [];
    var _isMoney_extraInitializers = [];
    var _nameId_decorators;
    var _nameId_initializers = [];
    var _nameId_extraInitializers = [];
    var _listAllData_decorators;
    var _listAllData_initializers = [];
    var _listAllData_extraInitializers = [];
    var _EventChanged_decorators;
    var _EventChanged_initializers = [];
    var _EventChanged_extraInitializers = [];
    var _EventSelect_decorators;
    var _EventSelect_initializers = [];
    var _EventSelect_extraInitializers = [];
    var InputTextComponent = _classThis = /** @class */ (function () {
        function InputTextComponent_1(_CommonService, _InputTextService) {
            this._CommonService = _CommonService;
            this._InputTextService = _InputTextService;
            this.typeInput = __runInitializers(this, _typeInput_initializers, "text");
            this.value = (__runInitializers(this, _typeInput_extraInitializers), __runInitializers(this, _value_initializers, ""));
            this.width = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _width_initializers, "90%"));
            this.textTransform = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _textTransform_initializers, "capitalize"));
            this.isRequired = (__runInitializers(this, _textTransform_extraInitializers), __runInitializers(this, _isRequired_initializers, false));
            this.enable = (__runInitializers(this, _isRequired_extraInitializers), __runInitializers(this, _enable_initializers, true));
            this.enableFilter = (__runInitializers(this, _enable_extraInitializers), __runInitializers(this, _enableFilter_initializers, false));
            this.isSelect = (__runInitializers(this, _enableFilter_extraInitializers), __runInitializers(this, _isSelect_initializers, false));
            this.byPulsation = (__runInitializers(this, _isSelect_extraInitializers), __runInitializers(this, _byPulsation_initializers, false));
            this.isMoney = (__runInitializers(this, _byPulsation_extraInitializers), __runInitializers(this, _isMoney_initializers, false));
            this.nameId = (__runInitializers(this, _isMoney_extraInitializers), __runInitializers(this, _nameId_initializers, void 0));
            this.listAllData = (__runInitializers(this, _nameId_extraInitializers), __runInitializers(this, _listAllData_initializers, new Array));
            this.EventChanged = (__runInitializers(this, _listAllData_extraInitializers), __runInitializers(this, _EventChanged_initializers, new core_1.EventEmitter()));
            this.EventSelect = (__runInitializers(this, _EventChanged_extraInitializers), __runInitializers(this, _EventSelect_initializers, new core_1.EventEmitter()));
            this.listFilter = (__runInitializers(this, _EventSelect_extraInitializers), new Array);
            this.filterActive = false;
            this.valueMony = "$0";
        }
        InputTextComponent_1.prototype.ngDoCheck = function () {
            this.ChangedMoney(this.value);
            this.ChangedNumber(this.value);
        };
        InputTextComponent_1.prototype.ngOnInit = function () {
            this._InputTextService.Load();
            // this.listAllData = this._InputTextService.GetFilter();
            this.ChangedMoney(this.value);
            this.ChangedNumber(this.value);
        };
        InputTextComponent_1.prototype.GetValue = function () {
            if (this.valueMony == "")
                this.valueMony = "$0";
            if (this.isMoney)
                return this.valueMony;
            if (this.typeInput == "number")
                return this.valueMony;
            return this.value;
        };
        InputTextComponent_1.prototype.ChangedInput = function (event) {
            if (this.byPulsation)
                this.Data(event);
            this.Filter(event.target.value);
        };
        InputTextComponent_1.prototype.Change = function (event) {
            if (!this.byPulsation && !this.isSelect)
                this.Data(event);
        };
        InputTextComponent_1.prototype.SelectAction = function (select) {
            this.filterActive = false;
            if (select != "0") {
                this.EventSelect.emit(select.id);
            }
        };
        InputTextComponent_1.prototype.Data = function (event) {
            var data = "";
            if (event)
                if (event.target)
                    if (event.target.value) {
                        data = this.ChangedMoney(event.target.value);
                        data = this.ChangedNumber(event.target.value);
                    }
            this.EventChanged.emit(data);
        };
        InputTextComponent_1.prototype.ChangedMoney = function (valueConvert) {
            if (this.isMoney) {
                try {
                    this.valueMony = this.ConverCurrency(Number.parseInt(valueConvert.replace("$", "").replace(".", "")));
                    return valueConvert;
                }
                catch (e) {
                    return "-1";
                }
            }
            else {
                return valueConvert;
            }
        };
        InputTextComponent_1.prototype.ChangedNumber = function (valueConvert) {
            if (this.typeInput.toLowerCase() == "number") {
                this.valueMony = Number.parseInt(valueConvert.replace(".", "")).toString();
                return valueConvert;
            }
            else {
                return valueConvert;
            }
        };
        InputTextComponent_1.prototype.ConverCurrency = function (actualPrice) {
            if (isNaN(actualPrice))
                actualPrice = 0;
            var numberValue = this._CommonService._UtilitiService.ConverCurrency(actualPrice);
            return numberValue;
        };
        InputTextComponent_1.prototype.GetLisFilter = function () {
            return this._InputTextService.GetFilter();
        };
        InputTextComponent_1.prototype.Filter = function (filter) {
            this.filterActive = filter != "";
            this.listFilter = new Array;
            if (this.listAllData != undefined && this.listAllData != null) {
                this.listFilter = this.listAllData.filter(function (s) { return s.name.toLowerCase().includes(filter.toLowerCase()); });
            }
            return this.listFilter;
        };
        InputTextComponent_1.prototype.IsActiveFilter = function () {
            return this.filterActive;
        };
        return InputTextComponent_1;
    }());
    __setFunctionName(_classThis, "InputTextComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _typeInput_decorators = [(0, core_1.Input)({ required: false })];
        _value_decorators = [(0, core_1.Input)({ required: false })];
        _width_decorators = [(0, core_1.Input)({ required: false })];
        _textTransform_decorators = [(0, core_1.Input)({ required: false })];
        _isRequired_decorators = [(0, core_1.Input)({ required: false })];
        _enable_decorators = [(0, core_1.Input)({ required: false })];
        _enableFilter_decorators = [(0, core_1.Input)({ required: false })];
        _isSelect_decorators = [(0, core_1.Input)({ required: false })];
        _byPulsation_decorators = [(0, core_1.Input)({ required: false })];
        _isMoney_decorators = [(0, core_1.Input)({ required: false })];
        _nameId_decorators = [(0, core_1.Input)({ required: true })];
        _listAllData_decorators = [(0, core_1.Input)({ required: false })];
        _EventChanged_decorators = [(0, core_1.Output)()];
        _EventSelect_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _typeInput_decorators, { kind: "field", name: "typeInput", static: false, private: false, access: { has: function (obj) { return "typeInput" in obj; }, get: function (obj) { return obj.typeInput; }, set: function (obj, value) { obj.typeInput = value; } }, metadata: _metadata }, _typeInput_initializers, _typeInput_extraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; }, set: function (obj, value) { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: function (obj) { return "width" in obj; }, get: function (obj) { return obj.width; }, set: function (obj, value) { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
        __esDecorate(null, null, _textTransform_decorators, { kind: "field", name: "textTransform", static: false, private: false, access: { has: function (obj) { return "textTransform" in obj; }, get: function (obj) { return obj.textTransform; }, set: function (obj, value) { obj.textTransform = value; } }, metadata: _metadata }, _textTransform_initializers, _textTransform_extraInitializers);
        __esDecorate(null, null, _isRequired_decorators, { kind: "field", name: "isRequired", static: false, private: false, access: { has: function (obj) { return "isRequired" in obj; }, get: function (obj) { return obj.isRequired; }, set: function (obj, value) { obj.isRequired = value; } }, metadata: _metadata }, _isRequired_initializers, _isRequired_extraInitializers);
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: function (obj) { return "enable" in obj; }, get: function (obj) { return obj.enable; }, set: function (obj, value) { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _enable_extraInitializers);
        __esDecorate(null, null, _enableFilter_decorators, { kind: "field", name: "enableFilter", static: false, private: false, access: { has: function (obj) { return "enableFilter" in obj; }, get: function (obj) { return obj.enableFilter; }, set: function (obj, value) { obj.enableFilter = value; } }, metadata: _metadata }, _enableFilter_initializers, _enableFilter_extraInitializers);
        __esDecorate(null, null, _isSelect_decorators, { kind: "field", name: "isSelect", static: false, private: false, access: { has: function (obj) { return "isSelect" in obj; }, get: function (obj) { return obj.isSelect; }, set: function (obj, value) { obj.isSelect = value; } }, metadata: _metadata }, _isSelect_initializers, _isSelect_extraInitializers);
        __esDecorate(null, null, _byPulsation_decorators, { kind: "field", name: "byPulsation", static: false, private: false, access: { has: function (obj) { return "byPulsation" in obj; }, get: function (obj) { return obj.byPulsation; }, set: function (obj, value) { obj.byPulsation = value; } }, metadata: _metadata }, _byPulsation_initializers, _byPulsation_extraInitializers);
        __esDecorate(null, null, _isMoney_decorators, { kind: "field", name: "isMoney", static: false, private: false, access: { has: function (obj) { return "isMoney" in obj; }, get: function (obj) { return obj.isMoney; }, set: function (obj, value) { obj.isMoney = value; } }, metadata: _metadata }, _isMoney_initializers, _isMoney_extraInitializers);
        __esDecorate(null, null, _nameId_decorators, { kind: "field", name: "nameId", static: false, private: false, access: { has: function (obj) { return "nameId" in obj; }, get: function (obj) { return obj.nameId; }, set: function (obj, value) { obj.nameId = value; } }, metadata: _metadata }, _nameId_initializers, _nameId_extraInitializers);
        __esDecorate(null, null, _listAllData_decorators, { kind: "field", name: "listAllData", static: false, private: false, access: { has: function (obj) { return "listAllData" in obj; }, get: function (obj) { return obj.listAllData; }, set: function (obj, value) { obj.listAllData = value; } }, metadata: _metadata }, _listAllData_initializers, _listAllData_extraInitializers);
        __esDecorate(null, null, _EventChanged_decorators, { kind: "field", name: "EventChanged", static: false, private: false, access: { has: function (obj) { return "EventChanged" in obj; }, get: function (obj) { return obj.EventChanged; }, set: function (obj, value) { obj.EventChanged = value; } }, metadata: _metadata }, _EventChanged_initializers, _EventChanged_extraInitializers);
        __esDecorate(null, null, _EventSelect_decorators, { kind: "field", name: "EventSelect", static: false, private: false, access: { has: function (obj) { return "EventSelect" in obj; }, get: function (obj) { return obj.EventSelect; }, set: function (obj, value) { obj.EventSelect = value; } }, metadata: _metadata }, _EventSelect_initializers, _EventSelect_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InputTextComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InputTextComponent = _classThis;
}();
exports.InputTextComponent = InputTextComponent;
//# sourceMappingURL=app.common-input-text.js.map