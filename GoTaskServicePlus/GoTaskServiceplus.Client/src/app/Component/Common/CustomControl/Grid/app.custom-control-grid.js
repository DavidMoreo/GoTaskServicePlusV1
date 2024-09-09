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
exports.GridComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var GridComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-custom-grid",
            templateUrl: './app.custom-control-grid.component.html',
            styleUrls: ['./app.custom-control-grid.css'],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _columns_decorators;
    var _columns_initializers = [];
    var _columns_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _Filter_decorators;
    var _Filter_initializers = [];
    var _Filter_extraInitializers = [];
    var _FilterCancel_decorators;
    var _FilterCancel_initializers = [];
    var _FilterCancel_extraInitializers = [];
    var _GoPage_decorators;
    var _GoPage_initializers = [];
    var _GoPage_extraInitializers = [];
    var _GoBackPage_decorators;
    var _GoBackPage_initializers = [];
    var _GoBackPage_extraInitializers = [];
    var GridComponent = _classThis = /** @class */ (function () {
        function GridComponent_1(_Service, cdRef) {
            this.cdRef = cdRef;
            this.columns = __runInitializers(this, _columns_initializers, "4");
            this.page = (__runInitializers(this, _columns_extraInitializers), __runInitializers(this, _page_initializers, "0"));
            this.Filter = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _Filter_initializers, new core_1.EventEmitter()));
            this.FilterCancel = (__runInitializers(this, _Filter_extraInitializers), __runInitializers(this, _FilterCancel_initializers, new core_1.EventEmitter()));
            this.GoPage = (__runInitializers(this, _FilterCancel_extraInitializers), __runInitializers(this, _GoPage_initializers, new core_1.EventEmitter()));
            this.GoBackPage = (__runInitializers(this, _GoPage_extraInitializers), __runInitializers(this, _GoBackPage_initializers, new core_1.EventEmitter()));
            this._Service = __runInitializers(this, _GoBackPage_extraInitializers);
            this.filterValue = "";
            this._Service = _Service;
        }
        GridComponent_1.prototype.ngDoCheck = function () {
            if (this.cdRef)
                this.cdRef.detectChanges();
        };
        GridComponent_1.prototype.ngOnInit = function () {
            /*    this._Service.dataHeader = new Array<GridItem>();*/
        };
        GridComponent_1.prototype.FilterChanged = function () {
            this.Filter.emit(this.filterValue);
        };
        GridComponent_1.prototype.FilterChangeCancel = function () {
            this.FilterCancel.emit("");
        };
        GridComponent_1.prototype.GoPageAction = function () {
            this.GoPage.emit(1);
        };
        GridComponent_1.prototype.GoBackPageAction = function () {
            this.GoBackPage.emit(1);
        };
        return GridComponent_1;
    }());
    __setFunctionName(_classThis, "GridComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _columns_decorators = [(0, core_1.Input)()];
        _page_decorators = [(0, core_1.Input)()];
        _Filter_decorators = [(0, core_1.Output)()];
        _FilterCancel_decorators = [(0, core_1.Output)()];
        _GoPage_decorators = [(0, core_1.Output)()];
        _GoBackPage_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _columns_decorators, { kind: "field", name: "columns", static: false, private: false, access: { has: function (obj) { return "columns" in obj; }, get: function (obj) { return obj.columns; }, set: function (obj, value) { obj.columns = value; } }, metadata: _metadata }, _columns_initializers, _columns_extraInitializers);
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _Filter_decorators, { kind: "field", name: "Filter", static: false, private: false, access: { has: function (obj) { return "Filter" in obj; }, get: function (obj) { return obj.Filter; }, set: function (obj, value) { obj.Filter = value; } }, metadata: _metadata }, _Filter_initializers, _Filter_extraInitializers);
        __esDecorate(null, null, _FilterCancel_decorators, { kind: "field", name: "FilterCancel", static: false, private: false, access: { has: function (obj) { return "FilterCancel" in obj; }, get: function (obj) { return obj.FilterCancel; }, set: function (obj, value) { obj.FilterCancel = value; } }, metadata: _metadata }, _FilterCancel_initializers, _FilterCancel_extraInitializers);
        __esDecorate(null, null, _GoPage_decorators, { kind: "field", name: "GoPage", static: false, private: false, access: { has: function (obj) { return "GoPage" in obj; }, get: function (obj) { return obj.GoPage; }, set: function (obj, value) { obj.GoPage = value; } }, metadata: _metadata }, _GoPage_initializers, _GoPage_extraInitializers);
        __esDecorate(null, null, _GoBackPage_decorators, { kind: "field", name: "GoBackPage", static: false, private: false, access: { has: function (obj) { return "GoBackPage" in obj; }, get: function (obj) { return obj.GoBackPage; }, set: function (obj, value) { obj.GoBackPage = value; } }, metadata: _metadata }, _GoBackPage_initializers, _GoBackPage_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GridComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GridComponent = _classThis;
}();
exports.GridComponent = GridComponent;
//# sourceMappingURL=app.custom-control-grid.js.map