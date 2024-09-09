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
exports.SelectInputComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var SelectInputComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-input-select",
            templateUrl: './app.common-input-select.component.html',
            styleUrls: ['./app.common-input-select.css'],
            imports: [common_1.CommonModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _value_decorators;
    var _value_initializers = [];
    var _value_extraInitializers = [];
    var _isRequired_decorators;
    var _isRequired_initializers = [];
    var _isRequired_extraInitializers = [];
    var _enable_decorators;
    var _enable_initializers = [];
    var _enable_extraInitializers = [];
    var _nameId_decorators;
    var _nameId_initializers = [];
    var _nameId_extraInitializers = [];
    var _list_decorators;
    var _list_initializers = [];
    var _list_extraInitializers = [];
    var _EventChanged_decorators;
    var _EventChanged_initializers = [];
    var _EventChanged_extraInitializers = [];
    var _selectId_decorators;
    var _selectId_initializers = [];
    var _selectId_extraInitializers = [];
    var SelectInputComponent = _classThis = /** @class */ (function () {
        function SelectInputComponent_1(_cdRef) {
            this._cdRef = _cdRef;
            this.value = __runInitializers(this, _value_initializers, "");
            this.isRequired = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _isRequired_initializers, false));
            this.enable = (__runInitializers(this, _isRequired_extraInitializers), __runInitializers(this, _enable_initializers, true));
            this.nameId = (__runInitializers(this, _enable_extraInitializers), __runInitializers(this, _nameId_initializers, void 0));
            this.list = (__runInitializers(this, _nameId_extraInitializers), __runInitializers(this, _list_initializers, new Array()));
            this.EventChanged = (__runInitializers(this, _list_extraInitializers), __runInitializers(this, _EventChanged_initializers, new core_1.EventEmitter()));
            this.selectId = (__runInitializers(this, _EventChanged_extraInitializers), __runInitializers(this, _selectId_initializers, void 0));
            this.start = (__runInitializers(this, _selectId_extraInitializers), true);
            this.select = "";
        }
        SelectInputComponent_1.prototype.ngOnInit = function () {
        };
        SelectInputComponent_1.prototype.OnSelectChange = function (event) {
            this.value = event.target.value;
            if (this.select == "0")
                this.select = "";
            this.EventChanged.emit(this.value);
        };
        SelectInputComponent_1.prototype.GetList = function () {
            if (this.list == undefined)
                this.list = new Array();
            return this.list;
        };
        SelectInputComponent_1.prototype.GetValue = function () {
            //if(this.value != "") return this.value;
            var _this = this;
            if (this.value != undefined && this.value != null) {
                if (this.list != null) {
                    var data = this.list.find(function (s) { return s.id == _this.value; });
                    if (data != undefined) {
                        return data.name;
                    }
                }
            }
            //console.log("Value", value);
            // if (this.select != "" && this.value != "Seleccionar") return this.list.find(s => s.id == this.select).name ;
            return "Seleccionar";
        };
        SelectInputComponent_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return SelectInputComponent_1;
    }());
    __setFunctionName(_classThis, "SelectInputComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)({ required: false })];
        _isRequired_decorators = [(0, core_1.Input)({ required: false })];
        _enable_decorators = [(0, core_1.Input)({ required: false })];
        _nameId_decorators = [(0, core_1.Input)({ required: true })];
        _list_decorators = [(0, core_1.Input)({ required: false })];
        _EventChanged_decorators = [(0, core_1.Output)()];
        _selectId_decorators = [(0, core_1.ViewChild)('selectId')];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; }, set: function (obj, value) { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _isRequired_decorators, { kind: "field", name: "isRequired", static: false, private: false, access: { has: function (obj) { return "isRequired" in obj; }, get: function (obj) { return obj.isRequired; }, set: function (obj, value) { obj.isRequired = value; } }, metadata: _metadata }, _isRequired_initializers, _isRequired_extraInitializers);
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: function (obj) { return "enable" in obj; }, get: function (obj) { return obj.enable; }, set: function (obj, value) { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _enable_extraInitializers);
        __esDecorate(null, null, _nameId_decorators, { kind: "field", name: "nameId", static: false, private: false, access: { has: function (obj) { return "nameId" in obj; }, get: function (obj) { return obj.nameId; }, set: function (obj, value) { obj.nameId = value; } }, metadata: _metadata }, _nameId_initializers, _nameId_extraInitializers);
        __esDecorate(null, null, _list_decorators, { kind: "field", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; }, set: function (obj, value) { obj.list = value; } }, metadata: _metadata }, _list_initializers, _list_extraInitializers);
        __esDecorate(null, null, _EventChanged_decorators, { kind: "field", name: "EventChanged", static: false, private: false, access: { has: function (obj) { return "EventChanged" in obj; }, get: function (obj) { return obj.EventChanged; }, set: function (obj, value) { obj.EventChanged = value; } }, metadata: _metadata }, _EventChanged_initializers, _EventChanged_extraInitializers);
        __esDecorate(null, null, _selectId_decorators, { kind: "field", name: "selectId", static: false, private: false, access: { has: function (obj) { return "selectId" in obj; }, get: function (obj) { return obj.selectId; }, set: function (obj, value) { obj.selectId = value; } }, metadata: _metadata }, _selectId_initializers, _selectId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectInputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectInputComponent = _classThis;
}();
exports.SelectInputComponent = SelectInputComponent;
//# sourceMappingURL=app.common-input-select.js.map