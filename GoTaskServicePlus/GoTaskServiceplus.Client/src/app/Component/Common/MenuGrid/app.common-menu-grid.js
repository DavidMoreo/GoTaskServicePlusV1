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
exports.MenuGridComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var MenuGridComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-menu-grid",
            templateUrl: './app.common-menu-grid.component.html',
            styleUrls: ['./app.common-menu-grid.css'],
            imports: [common_1.CommonModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _Edit_decorators;
    var _Edit_initializers = [];
    var _Edit_extraInitializers = [];
    var _Delete_decorators;
    var _Delete_initializers = [];
    var _Delete_extraInitializers = [];
    var _Clone_decorators;
    var _Clone_initializers = [];
    var _Clone_extraInitializers = [];
    var _ClearData_decorators;
    var _ClearData_initializers = [];
    var _ClearData_extraInitializers = [];
    var _Change_decorators;
    var _Change_initializers = [];
    var _Change_extraInitializers = [];
    var _IsDelete_decorators;
    var _IsDelete_initializers = [];
    var _IsDelete_extraInitializers = [];
    var _IsClone_decorators;
    var _IsClone_initializers = [];
    var _IsClone_extraInitializers = [];
    var _IsClearData_decorators;
    var _IsClearData_initializers = [];
    var _IsClearData_extraInitializers = [];
    var _visible_decorators;
    var _visible_initializers = [];
    var _visible_extraInitializers = [];
    var _item_decorators;
    var _item_initializers = [];
    var _item_extraInitializers = [];
    var MenuGridComponent = _classThis = /** @class */ (function () {
        function MenuGridComponent_1(service, _productService) {
            this._productService = _productService;
            this.Edit = __runInitializers(this, _Edit_initializers, new core_1.EventEmitter());
            this.Delete = (__runInitializers(this, _Edit_extraInitializers), __runInitializers(this, _Delete_initializers, new core_1.EventEmitter()));
            this.Clone = (__runInitializers(this, _Delete_extraInitializers), __runInitializers(this, _Clone_initializers, new core_1.EventEmitter()));
            this.ClearData = (__runInitializers(this, _Clone_extraInitializers), __runInitializers(this, _ClearData_initializers, new core_1.EventEmitter()));
            this.Change = (__runInitializers(this, _ClearData_extraInitializers), __runInitializers(this, _Change_initializers, new core_1.EventEmitter()));
            this.IsDelete = (__runInitializers(this, _Change_extraInitializers), __runInitializers(this, _IsDelete_initializers, true));
            this.IsClone = (__runInitializers(this, _IsDelete_extraInitializers), __runInitializers(this, _IsClone_initializers, false));
            this.IsClearData = (__runInitializers(this, _IsClone_extraInitializers), __runInitializers(this, _IsClearData_initializers, true));
            this.visible = (__runInitializers(this, _IsClearData_extraInitializers), __runInitializers(this, _visible_initializers, true));
            this.item = (__runInitializers(this, _visible_extraInitializers), __runInitializers(this, _item_initializers, void 0));
            this._service = __runInitializers(this, _item_extraInitializers);
            this.isDragging = false;
            this.startX = 0;
            this.startY = 0;
            this.positionX = 0;
            this.positionY = 0;
            this.scale = 1;
            this.zoomOrigin = 1;
            this._service = service;
        }
        MenuGridComponent_1.prototype.ngDoCheck = function () {
        };
        MenuGridComponent_1.prototype.ngOnInit = function () {
        };
        MenuGridComponent_1.prototype.EditGrid = function () {
            this.Edit.emit(this.item);
            this.Change.emit("Edit");
        };
        MenuGridComponent_1.prototype.DeleteGrid = function () {
            this.Delete.emit(this.item);
            this.Change.emit("Delete");
        };
        MenuGridComponent_1.prototype.CloneGrid = function () {
            this.Clone.emit(this.item);
            this.Change.emit("Clone");
        };
        MenuGridComponent_1.prototype.ClearDataGrid = function () {
            this.ClearData.emit();
            this.Change.emit("Clear");
        };
        MenuGridComponent_1.prototype.onDragStart = function (event) {
            event.preventDefault();
            this.isDragging = true;
            var clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
            var clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
            this.startX = clientX - this.positionX;
            this.startY = clientY - this.positionY;
        };
        MenuGridComponent_1.prototype.onDrag = function (event) {
            if (this.isDragging) {
                var clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
                var clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
                // Calcular la diferencia entre la posición actual y la nueva posición
                var deltaX = (clientX - this.startX) - this.positionX;
                var deltaY = (clientY - this.startY) - this.positionY;
                // Definir una velocidad de suavizado
                var smoothness = 0.29; // Puedes ajustar este valor según la velocidad de suavizado deseada
                // Aplicar suavizado para hacer movimientos lentos y suaves
                this.positionX += deltaX - smoothness;
                this.positionY += deltaY - smoothness;
            }
        };
        MenuGridComponent_1.prototype.onDragEnd = function () {
            this.isDragging = false;
        };
        return MenuGridComponent_1;
    }());
    __setFunctionName(_classThis, "MenuGridComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _Edit_decorators = [(0, core_1.Output)()];
        _Delete_decorators = [(0, core_1.Output)()];
        _Clone_decorators = [(0, core_1.Output)()];
        _ClearData_decorators = [(0, core_1.Output)()];
        _Change_decorators = [(0, core_1.Output)()];
        _IsDelete_decorators = [(0, core_1.Input)()];
        _IsClone_decorators = [(0, core_1.Input)()];
        _IsClearData_decorators = [(0, core_1.Input)()];
        _visible_decorators = [(0, core_1.Input)()];
        _item_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _Edit_decorators, { kind: "field", name: "Edit", static: false, private: false, access: { has: function (obj) { return "Edit" in obj; }, get: function (obj) { return obj.Edit; }, set: function (obj, value) { obj.Edit = value; } }, metadata: _metadata }, _Edit_initializers, _Edit_extraInitializers);
        __esDecorate(null, null, _Delete_decorators, { kind: "field", name: "Delete", static: false, private: false, access: { has: function (obj) { return "Delete" in obj; }, get: function (obj) { return obj.Delete; }, set: function (obj, value) { obj.Delete = value; } }, metadata: _metadata }, _Delete_initializers, _Delete_extraInitializers);
        __esDecorate(null, null, _Clone_decorators, { kind: "field", name: "Clone", static: false, private: false, access: { has: function (obj) { return "Clone" in obj; }, get: function (obj) { return obj.Clone; }, set: function (obj, value) { obj.Clone = value; } }, metadata: _metadata }, _Clone_initializers, _Clone_extraInitializers);
        __esDecorate(null, null, _ClearData_decorators, { kind: "field", name: "ClearData", static: false, private: false, access: { has: function (obj) { return "ClearData" in obj; }, get: function (obj) { return obj.ClearData; }, set: function (obj, value) { obj.ClearData = value; } }, metadata: _metadata }, _ClearData_initializers, _ClearData_extraInitializers);
        __esDecorate(null, null, _Change_decorators, { kind: "field", name: "Change", static: false, private: false, access: { has: function (obj) { return "Change" in obj; }, get: function (obj) { return obj.Change; }, set: function (obj, value) { obj.Change = value; } }, metadata: _metadata }, _Change_initializers, _Change_extraInitializers);
        __esDecorate(null, null, _IsDelete_decorators, { kind: "field", name: "IsDelete", static: false, private: false, access: { has: function (obj) { return "IsDelete" in obj; }, get: function (obj) { return obj.IsDelete; }, set: function (obj, value) { obj.IsDelete = value; } }, metadata: _metadata }, _IsDelete_initializers, _IsDelete_extraInitializers);
        __esDecorate(null, null, _IsClone_decorators, { kind: "field", name: "IsClone", static: false, private: false, access: { has: function (obj) { return "IsClone" in obj; }, get: function (obj) { return obj.IsClone; }, set: function (obj, value) { obj.IsClone = value; } }, metadata: _metadata }, _IsClone_initializers, _IsClone_extraInitializers);
        __esDecorate(null, null, _IsClearData_decorators, { kind: "field", name: "IsClearData", static: false, private: false, access: { has: function (obj) { return "IsClearData" in obj; }, get: function (obj) { return obj.IsClearData; }, set: function (obj, value) { obj.IsClearData = value; } }, metadata: _metadata }, _IsClearData_initializers, _IsClearData_extraInitializers);
        __esDecorate(null, null, _visible_decorators, { kind: "field", name: "visible", static: false, private: false, access: { has: function (obj) { return "visible" in obj; }, get: function (obj) { return obj.visible; }, set: function (obj, value) { obj.visible = value; } }, metadata: _metadata }, _visible_initializers, _visible_extraInitializers);
        __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: function (obj) { return "item" in obj; }, get: function (obj) { return obj.item; }, set: function (obj, value) { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MenuGridComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MenuGridComponent = _classThis;
}();
exports.MenuGridComponent = MenuGridComponent;
//# sourceMappingURL=app.common-menu-grid.js.map