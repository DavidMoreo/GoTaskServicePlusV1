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
exports.BtnOnOffComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var BtnOnOffComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-btn-on-off",
            templateUrl: './app.custom-control-btn-on-off.component.html',
            styleUrls: ['./app.custom-control-btn-on-off.css'],
            imports: [common_1.CommonModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _Status_decorators;
    var _Status_initializers = [];
    var _Status_extraInitializers = [];
    var _Enable_decorators;
    var _Enable_initializers = [];
    var _Enable_extraInitializers = [];
    var _Msg_decorators;
    var _Msg_initializers = [];
    var _Msg_extraInitializers = [];
    var _Changed_decorators;
    var _Changed_initializers = [];
    var _Changed_extraInitializers = [];
    var BtnOnOffComponent = _classThis = /** @class */ (function () {
        function BtnOnOffComponent_1(_CommonService) {
            this._CommonService = _CommonService;
            this.Status = __runInitializers(this, _Status_initializers, false);
            this.Enable = (__runInitializers(this, _Status_extraInitializers), __runInitializers(this, _Enable_initializers, true));
            this.Msg = (__runInitializers(this, _Enable_extraInitializers), __runInitializers(this, _Msg_initializers, ""));
            this.Changed = (__runInitializers(this, _Msg_extraInitializers), __runInitializers(this, _Changed_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _Changed_extraInitializers);
            this._CommonService = _CommonService;
        }
        BtnOnOffComponent_1.prototype.ngOnInit = function () {
        };
        BtnOnOffComponent_1.prototype.ChangedStatus = function (Status) {
            if (this.Enable) {
                this.Status = Status;
                this.Changed.emit(this.Status);
            }
            else {
                if (this.Msg != "")
                    this._CommonService._AlertService.Alert(this.Msg);
            }
        };
        return BtnOnOffComponent_1;
    }());
    __setFunctionName(_classThis, "BtnOnOffComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _Status_decorators = [(0, core_1.Input)()];
        _Enable_decorators = [(0, core_1.Input)()];
        _Msg_decorators = [(0, core_1.Input)()];
        _Changed_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _Status_decorators, { kind: "field", name: "Status", static: false, private: false, access: { has: function (obj) { return "Status" in obj; }, get: function (obj) { return obj.Status; }, set: function (obj, value) { obj.Status = value; } }, metadata: _metadata }, _Status_initializers, _Status_extraInitializers);
        __esDecorate(null, null, _Enable_decorators, { kind: "field", name: "Enable", static: false, private: false, access: { has: function (obj) { return "Enable" in obj; }, get: function (obj) { return obj.Enable; }, set: function (obj, value) { obj.Enable = value; } }, metadata: _metadata }, _Enable_initializers, _Enable_extraInitializers);
        __esDecorate(null, null, _Msg_decorators, { kind: "field", name: "Msg", static: false, private: false, access: { has: function (obj) { return "Msg" in obj; }, get: function (obj) { return obj.Msg; }, set: function (obj, value) { obj.Msg = value; } }, metadata: _metadata }, _Msg_initializers, _Msg_extraInitializers);
        __esDecorate(null, null, _Changed_decorators, { kind: "field", name: "Changed", static: false, private: false, access: { has: function (obj) { return "Changed" in obj; }, get: function (obj) { return obj.Changed; }, set: function (obj, value) { obj.Changed = value; } }, metadata: _metadata }, _Changed_initializers, _Changed_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BtnOnOffComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BtnOnOffComponent = _classThis;
}();
exports.BtnOnOffComponent = BtnOnOffComponent;
//# sourceMappingURL=app.custom-control-btn-on-off.js.map