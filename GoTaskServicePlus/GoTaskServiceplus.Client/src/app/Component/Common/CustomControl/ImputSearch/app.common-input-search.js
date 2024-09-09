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
exports.ImputSearch = void 0;
var core_1 = require("@angular/core");
var ImputSearch = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-input-search",
            templateUrl: './app.common-input-search.component.html',
            styleUrls: ['./app.common-input-search.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _ChangedFilter_decorators;
    var _ChangedFilter_initializers = [];
    var _ChangedFilter_extraInitializers = [];
    var ImputSearch = _classThis = /** @class */ (function () {
        function ImputSearch_1(_CommonService, InputSearch) {
            this._CommonService = _CommonService;
            this.ChangedFilter = __runInitializers(this, _ChangedFilter_initializers, void 0);
            this._InputSearch = __runInitializers(this, _ChangedFilter_extraInitializers);
            this._InputSearch = InputSearch;
        }
        ImputSearch_1.prototype.ngDoCheck = function () {
        };
        ImputSearch_1.prototype.ngOnInit = function () {
            if (!this._InputSearch.listFilterUpdate)
                this._InputSearch.listFilterUpdate = new Array();
        };
        ImputSearch_1.prototype.ChangedFilterInput = function (event) {
            var value = event.target.value;
            if (this.ChangedFilter) {
                this.ChangedFilter(value);
            }
        };
        ImputSearch_1.prototype.CloseMenu = function () {
            this._InputSearch.menuVisible = false;
        };
        return ImputSearch_1;
    }());
    __setFunctionName(_classThis, "ImputSearch");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ChangedFilter_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _ChangedFilter_decorators, { kind: "field", name: "ChangedFilter", static: false, private: false, access: { has: function (obj) { return "ChangedFilter" in obj; }, get: function (obj) { return obj.ChangedFilter; }, set: function (obj, value) { obj.ChangedFilter = value; } }, metadata: _metadata }, _ChangedFilter_initializers, _ChangedFilter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImputSearch = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImputSearch = _classThis;
}();
exports.ImputSearch = ImputSearch;
//# sourceMappingURL=app.common-input-search.js.map