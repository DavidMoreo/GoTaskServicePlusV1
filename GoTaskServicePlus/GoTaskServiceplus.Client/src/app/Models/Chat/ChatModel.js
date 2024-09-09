"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeIntent = exports.tblChatBotMsg = exports.IAAssistant = exports.IAByNameProduct = exports.IntentChat = exports.conceptChat = void 0;
var tblProduct_1 = require("../Structure/tblProduct");
var conceptChat = /** @class */ (function (_super) {
    __extends(conceptChat, _super);
    function conceptChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.question = "";
        _this.answer = "";
        _this.confirm = false;
        return _this;
    }
    return conceptChat;
}(tblProduct_1.Concept));
exports.conceptChat = conceptChat;
var IntentChat = /** @class */ (function (_super) {
    __extends(IntentChat, _super);
    function IntentChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.intent = "";
        return _this;
    }
    return IntentChat;
}(conceptChat));
exports.IntentChat = IntentChat;
var IAByNameProduct = /** @class */ (function (_super) {
    __extends(IAByNameProduct, _super);
    function IAByNameProduct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IAByNameProduct;
}(conceptChat));
exports.IAByNameProduct = IAByNameProduct;
var IAAssistant = /** @class */ (function (_super) {
    __extends(IAAssistant, _super);
    function IAAssistant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.questionB = "";
        return _this;
    }
    return IAAssistant;
}(conceptChat));
exports.IAAssistant = IAAssistant;
var tblChatBotMsg = /** @class */ (function (_super) {
    __extends(tblChatBotMsg, _super);
    function tblChatBotMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.destinationId = "00000000-0000-0000-0000-000000000000";
        _this.idProduct = "00000000-0000-0000-0000-000000000000";
        _this.question = "";
        _this.response = "";
        _this.isBot = false;
        _this.isConcept = false;
        _this.typeQuestion = "";
        return _this;
    }
    return tblChatBotMsg;
}(tblProduct_1.Concept));
exports.tblChatBotMsg = tblChatBotMsg;
var TypeIntent = /** @class */ (function () {
    function TypeIntent() {
    }
    TypeIntent.intentionOfTheQquestion = function () { return "IntentionOfTheQquestion"; };
    ;
    TypeIntent.aIAssistant = function () { return "AiAssistant"; };
    ;
    TypeIntent.searchProductsByName = function () { return "SearchProductsByName"; };
    ;
    return TypeIntent;
}());
exports.TypeIntent = TypeIntent;
//# sourceMappingURL=ChatModel.js.map