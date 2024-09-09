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
exports.ChatIntentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var ChatModel_1 = require("../../../Models/Chat/ChatModel");
var app_common_input_select_1 = require("../../Common/CustomControl/ImputSelect/app.common-input-select");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var app_common_input_text_1 = require("../../Common/CustomControl/ImputText/app.common-input-text");
var ChatIntentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-chat-intent-config',
            templateUrl: 'app.chat-intent-config.component.html',
            styleUrls: ['app.chat-intent-config.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent, app_common_input_select_1.SelectInputComponent, app_common_input_text_1.InputTextComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatIntentComponent = _classThis = /** @class */ (function () {
        function ChatIntentComponent_1(configservice, http, ChatBotService) {
            this.intent = new ChatModel_1.IntentChat();
            this._configservice = configservice;
            this._http = http;
            this._chatBotIntentConfigService = ChatBotService;
        }
        ChatIntentComponent_1.prototype.ngOnInit = function () {
            this.GetAllIntent();
        };
        //Load
        ChatIntentComponent_1.prototype.GetAllIntent = function () {
            this._chatBotIntentConfigService.GetAllIntent(0);
        };
        ChatIntentComponent_1.prototype.Delete = function (id) {
            this._chatBotIntentConfigService.DeleteIntentById(id);
        };
        ChatIntentComponent_1.prototype.Edit = function (id) {
            var _this = this;
            this._chatBotIntentConfigService.GetIntentById(id).subscribe(function (e) {
                _this.intent = e.data;
                console.log("this.intent", _this.intent);
            });
        };
        ChatIntentComponent_1.prototype.SaveAndUpdate = function () {
            this.ValidateConcept();
            if (this.intent.id == "00000000-0000-0000-0000-000000000000") {
                var response = this._chatBotIntentConfigService.SaveIntentBot(this.intent, true);
                return response;
            }
            else {
                var response = this._chatBotIntentConfigService.UpdateIntentBot(this.intent);
                return response;
            }
        };
        //Changed
        ChatIntentComponent_1.prototype.ChangedTypeIntent = function (value) {
            this.intent.intent = value;
        };
        ChatIntentComponent_1.prototype.ChangedMsgIntent = function (value) {
            this.intent.question = value;
        };
        ChatIntentComponent_1.prototype.LoadTypeIntent = function () {
            var list = Array();
            var data = new tblProduct_1.NameConcept();
            data.id = "Comment";
            data.name = "Comentario";
            data.value = "Comment";
            list.push(data);
            data = new tblProduct_1.NameConcept();
            data.id = "Product";
            data.name = "Producto";
            data.value = "Product";
            list.push(data);
            return list;
        };
        ChatIntentComponent_1.prototype.Selection = function (id) {
            this._rowSeletion = id;
        };
        ChatIntentComponent_1.prototype.languageTraslate = function (value) {
            return value;
        };
        ChatIntentComponent_1.prototype.ValidateConcept = function () {
        };
        return ChatIntentComponent_1;
    }());
    __setFunctionName(_classThis, "ChatIntentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatIntentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatIntentComponent = _classThis;
}();
exports.ChatIntentComponent = ChatIntentComponent;
//# sourceMappingURL=app.chat-intent-config.js.map