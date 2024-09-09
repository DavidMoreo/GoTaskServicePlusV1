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
exports.ChatBotContext = exports.ChatBot = exports.MsgChat = void 0;
var tblProduct_1 = require("../Structure/tblProduct");
var ChatModel_1 = require("./ChatModel");
var MsgChat = /** @class */ (function (_super) {
    __extends(MsgChat, _super);
    function MsgChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.destinationId = "00000000-0000-0000-0000-000000000000";
        _this.OriginId = "00000000-0000-0000-0000-000000000000";
        _this.idMsgRefer = "00000000-0000-0000-0000-000000000000";
        _this.idChat = "00000000-0000-0000-0000-000000000000";
        _this.referenceMsg = new ChatModel_1.conceptChat();
        _this.Link = new Array;
        _this.msg = "";
        _this.value = "";
        _this.isBot = false;
        _this.isProduct = false;
        _this.ico = "";
        _this.price = "";
        return _this;
    }
    return MsgChat;
}(tblProduct_1.Concept));
exports.MsgChat = MsgChat;
var ChatBot = /** @class */ (function (_super) {
    __extends(ChatBot, _super);
    function ChatBot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChatBot;
}(tblProduct_1.Concept));
exports.ChatBot = ChatBot;
var ChatBotContext = /** @class */ (function () {
    function ChatBotContext() {
    }
    return ChatBotContext;
}());
exports.ChatBotContext = ChatBotContext;
//# sourceMappingURL=MsgChat.js.map