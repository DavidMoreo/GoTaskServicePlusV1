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
exports.ItemChatComponent = void 0;
var core_1 = require("@angular/core");
var ItemChatComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-itemchat-item-chat",
            templateUrl: './app.itemchat-item-chat.component.html',
            styleUrls: ['app.itemchat-item-chat.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _EventSpeech_decorators;
    var _EventSpeech_initializers = [];
    var _EventSpeech_extraInitializers = [];
    var _itemLanguage_decorators;
    var _itemLanguage_initializers = [];
    var _itemLanguage_extraInitializers = [];
    var ItemChatComponent = _classThis = /** @class */ (function () {
        function ItemChatComponent_1(configservice, _utiliti) {
            this.EventSpeech = __runInitializers(this, _EventSpeech_initializers, void 0);
            this.itemLanguage = (__runInitializers(this, _EventSpeech_extraInitializers), __runInitializers(this, _itemLanguage_initializers, void 0));
            __runInitializers(this, _itemLanguage_extraInitializers);
            this._configservice = configservice;
            this._utiliti = _utiliti;
        }
        ItemChatComponent_1.prototype.ngAfterViewInit = function () {
        };
        ItemChatComponent_1.prototype.ngOnInit = function () {
            console.log("Log", this.itemLanguage.id);
            console.log("Log2", this.itemLanguage);
        };
        ItemChatComponent_1.prototype.speech = function (text) {
            this.EventSpeech(text);
        };
        return ItemChatComponent_1;
    }());
    __setFunctionName(_classThis, "ItemChatComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _EventSpeech_decorators = [(0, core_1.Input)()];
        _itemLanguage_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _EventSpeech_decorators, { kind: "field", name: "EventSpeech", static: false, private: false, access: { has: function (obj) { return "EventSpeech" in obj; }, get: function (obj) { return obj.EventSpeech; }, set: function (obj, value) { obj.EventSpeech = value; } }, metadata: _metadata }, _EventSpeech_initializers, _EventSpeech_extraInitializers);
        __esDecorate(null, null, _itemLanguage_decorators, { kind: "field", name: "itemLanguage", static: false, private: false, access: { has: function (obj) { return "itemLanguage" in obj; }, get: function (obj) { return obj.itemLanguage; }, set: function (obj, value) { obj.itemLanguage = value; } }, metadata: _metadata }, _itemLanguage_initializers, _itemLanguage_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ItemChatComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ItemChatComponent = _classThis;
}();
exports.ItemChatComponent = ItemChatComponent;
//# sourceMappingURL=app.itemchat-item-chat.js.map