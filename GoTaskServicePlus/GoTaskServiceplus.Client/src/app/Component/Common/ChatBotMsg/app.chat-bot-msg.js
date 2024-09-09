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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBotMsg = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var MsgChat_1 = require("../../../Models/Chat/MsgChat");
var app_permission_1 = require("../../Permission/app.permission");
var ChatBotMsg = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-chat-bot-msg',
            templateUrl: './app.chat-bot-msg.component.html',
            styleUrls: ['app.chat-bot-msg.css'],
            imports: [app_common_loading_1.LoadingComponent, forms_1.FormsModule, app_permission_1.PermissionComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _textArea_decorators;
    var _textArea_initializers = [];
    var _textArea_extraInitializers = [];
    var _scrollContainer_decorators;
    var _scrollContainer_initializers = [];
    var _scrollContainer_extraInitializers = [];
    var ChatBotMsg = _classThis = /** @class */ (function () {
        function ChatBotMsg_1(route, titleService, param, search, chatBotService, configService, SpeechRecognition, cdRef, Permission, Util) {
            this.route = route;
            this.type = "all";
            this.page = 0;
            this.question = new MsgChat_1.ChatBotContext();
            this.textArea = __runInitializers(this, _textArea_initializers, void 0);
            this.scrollContainer = (__runInitializers(this, _textArea_extraInitializers), __runInitializers(this, _scrollContainer_initializers, void 0));
            __runInitializers(this, _scrollContainer_extraInitializers);
            this.route = route;
            this._param = param;
            this._titleService = titleService;
            this._search = search;
            this._chatBotService = chatBotService;
            this._configService = configService;
            this._SpeechRecognition = SpeechRecognition;
            this._cdRef = cdRef;
            this._Permission = Permission;
            this._Util = Util;
        }
        ChatBotMsg_1.prototype.ngAfterViewInit = function () {
        };
        ChatBotMsg_1.prototype.ngOnInit = function () {
            this._titleService.setTitle('Mis Productos');
            var msg = new MsgChat_1.MsgChat();
            var msgTemp = "Hola, ¿cómo estás? ¡Qué alegría que estés aquí! Estoy aquí para ayudarte.\n Recuerda compartirnos en tus redes sociales.\n ¡Muchas gracias!";
            msg.msg = msgTemp; // msg.msg = this.GetSplitResponse(msgTemp)[0];
            msg.id = "0";
            msg.isBot = true;
            this.initVoiceInput();
            this._chatBotService.AddChatList(msg);
        };
        ChatBotMsg_1.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ChatBotMsg_1.prototype.searchProduct = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ChatBotMsg_1.prototype.QuestionMsg = function () {
            var _this = this;
            if (this._chatBotService.chatListStatus) {
                this._chatBotService.chatListStatus = false;
                var msg = new MsgChat_1.MsgChat();
                var questionCustomer = new MsgChat_1.MsgChat();
                questionCustomer.msg = this.question.question;
                questionCustomer.isBot = false;
                questionCustomer.id = (this._chatBotService.GetChatList().length + 1) + "";
                this._chatBotService.AddChatList(questionCustomer);
                var result = this._chatBotService.ChatMsg(this.question);
                result.subscribe(function (response) {
                    var msg = new MsgChat_1.MsgChat();
                    if (response != null) {
                        response.data.forEach(function (item) {
                            msg.msg = item.response;
                            msg.id = item.id;
                            msg.isBot = true;
                            _this._chatBotService.AddChatList(msg);
                            _this._chatBotService.chatListStatus = true;
                        });
                    }
                    _this.scrollToBottom("scrollContainer");
                    _this.question = new MsgChat_1.ChatBotContext();
                    _this.onFocus();
                });
            }
        };
        ChatBotMsg_1.prototype.onFocus = function () {
            var _this = this;
            setTimeout(function () {
                _this.textArea.nativeElement.focus();
            }, 800);
        };
        ChatBotMsg_1.prototype.GetSplitResponse = function (response) {
            return response.split(" ");
        };
        ChatBotMsg_1.prototype.SelctProduct = function (productSelect) {
            var name = "";
            productSelect.split(" ").forEach(function (e) {
                if (e != "")
                    name += e + (e != "" ? "-" : "");
            });
            this.Route("select-product/" + productSelect);
        };
        //Recognition
        ChatBotMsg_1.prototype.startRecording = function () {
            this.question = new MsgChat_1.ChatBotContext;
            this.statusSpeech = true;
            this._SpeechRecognition.start();
            this._cdRef.detectChanges();
        };
        ChatBotMsg_1.prototype.stoptRecording = function () {
            this.statusSpeech = false;
            this._SpeechRecognition.stop();
            /*   this._cdRef.detectChanges();*/
        };
        ChatBotMsg_1.prototype.initVoiceInput = function () {
            var _this = this;
            // Subscriptio.n for initializing and this will call when user stopped speaking.
            this._SpeechRecognition.init("es-ES").subscribe(function () {
                // User has stopped recording
                // Do whatever when mic finished listening
            });
            // Subscription to detect user input from voice to text.
            this._SpeechRecognition.speechInput().subscribe(function (input) {
                // Set voice text output to
                //this.searchForm.controls.searchText.setValue(input);
                console.log("this.question.question", _this.question.question);
                if (_this.statusSpeech)
                    _this.question.question = input;
                else if (_this.question.question != "" && _this.question.question != undefined)
                    _this.QuestionMsg();
                _this._cdRef.detectChanges();
            });
        };
        ChatBotMsg_1.prototype.Route = function (routeValue) {
            this.route.navigate([routeValue]);
        };
        ChatBotMsg_1.prototype.scrollToBottom = function (Byid_1) {
            return __awaiter(this, arguments, void 0, function (Byid, scroll) {
                var container;
                if (scroll === void 0) { scroll = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Espera 1000 milisegundos (1 segundo)
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 600); })];
                        case 1:
                            // Espera 1000 milisegundos (1 segundo)
                            _a.sent();
                            container = document.getElementById(Byid);
                            if (container) {
                                container.scrollTo({
                                    top: (scroll == 0 ? (container.scrollHeight + container.scrollHeight) : scroll),
                                    behavior: 'smooth'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatBotMsg_1.prototype.CancelPrediction = function () {
            this._chatBotService.chatListStatus = true;
        };
        return ChatBotMsg_1;
    }());
    __setFunctionName(_classThis, "ChatBotMsg");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _textArea_decorators = [(0, core_1.ViewChild)('textArea')];
        _scrollContainer_decorators = [(0, core_1.ViewChild)('scrollContainer')];
        __esDecorate(null, null, _textArea_decorators, { kind: "field", name: "textArea", static: false, private: false, access: { has: function (obj) { return "textArea" in obj; }, get: function (obj) { return obj.textArea; }, set: function (obj, value) { obj.textArea = value; } }, metadata: _metadata }, _textArea_initializers, _textArea_extraInitializers);
        __esDecorate(null, null, _scrollContainer_decorators, { kind: "field", name: "scrollContainer", static: false, private: false, access: { has: function (obj) { return "scrollContainer" in obj; }, get: function (obj) { return obj.scrollContainer; }, set: function (obj, value) { obj.scrollContainer = value; } }, metadata: _metadata }, _scrollContainer_initializers, _scrollContainer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatBotMsg = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatBotMsg = _classThis;
}();
exports.ChatBotMsg = ChatBotMsg;
//# sourceMappingURL=app.chat-bot-msg.js.map