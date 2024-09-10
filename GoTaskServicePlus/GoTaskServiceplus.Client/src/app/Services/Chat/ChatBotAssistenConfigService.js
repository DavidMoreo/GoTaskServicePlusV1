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
exports.ChatBotByNameConfigService = exports.ChatBotIntentConfigService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ChatBotIntentConfigService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatBotIntentConfigService = _classThis = /** @class */ (function () {
        function ChatBotIntentConfigService_1(http, host) {
            this.http = http;
            this.host = host;
            this._host = host;
            this._http = http;
        }
        //Intemt
        ChatBotIntentConfigService_1.prototype.GetAllIntent = function (page, activeConsole, activeAlert) {
            var _this = this;
            if (activeConsole === void 0) { activeConsole = false; }
            if (activeAlert === void 0) { activeAlert = true; }
            var result = this._http.get(this._host.GetHostApi() + "Chat/ConfigGetAllIntent?page=".concat(page));
            result.subscribe(function (e) {
                _this.intents = e.data;
                _this.Alert(activeAlert, e.data);
                _this.Console(true, "GetAllIntentChat on", e);
            }, function (error) {
                _this.Console(activeConsole, "GetAllIntentChat error", error);
            });
            return result;
        };
        ChatBotIntentConfigService_1.prototype.GetIntentById = function (id, activeConsole, activeAlert) {
            if (activeConsole === void 0) { activeConsole = false; }
            if (activeAlert === void 0) { activeAlert = true; }
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            var result = this._http.get(this._host.GetHostApi() + "Chat/GetIaIntentById?id=".concat(id));
            return result;
        };
        ChatBotIntentConfigService_1.prototype.DeleteIntentById = function (id, activeAlert) {
            var _this = this;
            if (activeAlert === void 0) { activeAlert = true; }
            var result = this._http.delete(this._host.GetHostApi() + "Chat/ConfigIaIntentDelete?id=".concat(id));
            result.subscribe(function (e) {
                if (e.status)
                    _this.intents = _this.intents.filter(function (s) { return s.id != id; });
                _this.Alert(activeAlert, e.data);
            }, function (error) {
                _this.Console(!activeAlert, "DeleteIntentById error", error);
            });
            return result;
        };
        ChatBotIntentConfigService_1.prototype.SaveIntentBot = function (intent, activeAlert) {
            var _this = this;
            if (activeAlert === void 0) { activeAlert = true; }
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            if (!this.intents)
                this.intents = Array();
            var result = this._http.post(this._host.GetHostApi() + "Chat/ConfigIaIntentAdd", intent, { headers: headers1 });
            result.subscribe(function (e) {
                if (e.data)
                    _this.intents.push(e.data);
                _this.Alert(activeAlert, e.data);
            }, function (error) {
                _this.Console(true, "SaveIntentBot error ", error);
            });
            return result;
        };
        ChatBotIntentConfigService_1.prototype.UpdateIntentBot = function (intent, activeConsole, activeAlert) {
            var _this = this;
            if (activeConsole === void 0) { activeConsole = false; }
            if (activeAlert === void 0) { activeAlert = true; }
            var headers1 = new http_1.HttpHeaders({
                "Content-Type": "application/json"
            });
            this.Console(activeConsole, "UpdateIntentBot on", intent);
            var result = this._http.post(this._host.GetHostApi() + "Chat/ConfigIaIntentUpdate", intent, { headers: headers1 });
            result.subscribe(function (e) {
                if (e.status) {
                    var temp = _this.intents.filter(function (s) { return s.id != e.data.id; });
                    temp.push(e.data);
                    _this.intents = temp;
                    _this.Alert(activeAlert, e.data);
                }
            }, function (error) {
                _this.Console(activeConsole, "UpdateIntentBot error", error);
            });
            return result;
        };
        //Util intents
        ChatBotIntentConfigService_1.prototype.AddintentChat = function (intentChat) {
            this.intents.push(intentChat);
        };
        ChatBotIntentConfigService_1.prototype.RemoveIntentChat = function (intentChat) {
            var temp = this.intents.find(function (s) { return s.id == intentChat.id; });
            if (temp) {
                this.intents = this.intents.filter(function (s) { return s.id == intentChat.id; });
            }
        };
        ChatBotIntentConfigService_1.prototype.GetAllIntentChat = function () {
            var temp = this.intents;
            return temp;
        };
        ChatBotIntentConfigService_1.prototype.GetIntentChat = function (intentChat) {
            var temp = this.intents.find(function (s) { return s.id == intentChat.id; });
            return temp;
        };
        ChatBotIntentConfigService_1.prototype.ClearIntent = function () {
            this.intents = Array();
        };
        //Util Console
        ChatBotIntentConfigService_1.prototype.Console = function (active, name, data) {
            if (active === void 0) { active = false; }
            console.log(name, data);
        };
        ChatBotIntentConfigService_1.prototype.Alert = function (active, data) {
            if (active === void 0) { active = false; }
            console.log(name, data);
        };
        return ChatBotIntentConfigService_1;
    }());
    __setFunctionName(_classThis, "ChatBotIntentConfigService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatBotIntentConfigService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatBotIntentConfigService = _classThis;
}();
exports.ChatBotIntentConfigService = ChatBotIntentConfigService;
var ChatBotByNameConfigService = /** @class */ (function () {
    function ChatBotByNameConfigService(http, host) {
        this.http = http;
        this.host = host;
        this._host = host;
        this._http = http;
    }
    //Intemt
    ChatBotByNameConfigService.prototype.GetAllIntent = function (page, activeAlert) {
        var _this = this;
        if (activeAlert === void 0) { activeAlert = true; }
        var result = this._http.get(this._host.GetHostApi() + "Chat/GetChatGotask?page=".concat(page));
        result.subscribe(function (e) {
            _this.data = e.data;
            _this.Alert(activeAlert, e.data);
        }, function (error) {
            _this.Console(false, "GetAllIntentChat on", error);
        });
        return result;
    };
    ChatBotByNameConfigService.prototype.GetIntentByid = function (id, activeConsole, activeAlert) {
        var _this = this;
        if (activeConsole === void 0) { activeConsole = false; }
        if (activeAlert === void 0) { activeAlert = true; }
        var headers1 = new http_1.HttpHeaders({
            "Content-Type": "application/json"
        });
        var result = this._http.get(this._host.GetHostApi() + "Chat/GetChatById?id=".concat(id));
        result.subscribe(function (e) {
            _this.data = e.data;
            _this.Alert(activeAlert, e.data);
            _this.Console(activeConsole, "GetIntentById on", e);
        }, function (error) {
            _this.Console(activeConsole, "GetIntentById error", error);
        });
        return result;
    };
    ChatBotByNameConfigService.prototype.DeleteIntentById = function (id, activeConsole, activeAlert) {
        var _this = this;
        if (activeConsole === void 0) { activeConsole = false; }
        if (activeAlert === void 0) { activeAlert = true; }
        var result = this._http.delete(this._host.GetHostApi() + "Chat/DeleteChat?id=".concat(id));
        result.subscribe(function (e) {
            _this.data = _this.data.filter(function (s) { return s.id != id; });
            _this.Alert(activeAlert, e.data);
            _this.Console(activeConsole, "DeleteIntentById on", e);
        }, function (error) {
            _this.Console(activeConsole, "DeleteIntentById error", error);
        });
        return result;
    };
    ChatBotByNameConfigService.prototype.SaveIntent = function (intent, activeConsole, activeAlert) {
        var _this = this;
        if (activeConsole === void 0) { activeConsole = false; }
        if (activeAlert === void 0) { activeAlert = true; }
        var headers1 = new http_1.HttpHeaders({
            "Content-Type": "application/json"
        });
        var result = this._http.post(this._host.GetHostApi() + "Chat/AddChat", intent, { headers: headers1 });
        result.subscribe(function (e) {
            _this.data.push(e.data);
            _this.Alert(activeAlert, e.data);
            _this.Console(activeConsole, "SaveIntentBot on", e);
        }, function (error) {
            _this.Console(activeConsole, "SaveIntentBot error " + _this._host.GetHostApi() + "Chat/AddChat", error);
        });
        return result;
    };
    ChatBotByNameConfigService.prototype.UpdateIntent = function (intent, activeConsole, activeAlert) {
        var _this = this;
        if (activeConsole === void 0) { activeConsole = false; }
        if (activeAlert === void 0) { activeAlert = true; }
        var headers1 = new http_1.HttpHeaders({
            "Content-Type": "application/json"
        });
        var result = this._http.post(this._host.GetHostApi() + "Chat/UpdateChat", intent, { headers: headers1 });
        result.subscribe(function (e) {
            _this.data.forEach(function (update) {
                if (update.id == intent.id)
                    update = intent;
            });
            _this.Alert(activeAlert, e.data);
            _this.Console(activeConsole, "UpdateIntentBot on", e);
        }, function (error) {
            _this.Console(activeConsole, "UpdateIntentBot error", error);
        });
        return result;
    };
    //Util intents
    ChatBotByNameConfigService.prototype.AddByNameChat = function (intentChat) {
        this.data.push(intentChat);
    };
    ChatBotByNameConfigService.prototype.RemoveByNameChat = function (intentChat) {
        var temp = this.data.find(function (s) { return s.id == intentChat.id; });
        if (temp) {
            this.data = this.data.filter(function (s) { return s.id == intentChat.id; });
        }
    };
    ChatBotByNameConfigService.prototype.GetAllByNameChat = function () {
        var temp = this.data;
        return temp;
    };
    ChatBotByNameConfigService.prototype.GetByNameChat = function (intentChat) {
        var temp = this.data.find(function (s) { return s.id == intentChat.id; });
        return temp;
    };
    ChatBotByNameConfigService.prototype.ClearByName = function () {
        this.data = Array();
    };
    //Util Console
    ChatBotByNameConfigService.prototype.Console = function (active, name, data) {
        if (active === void 0) { active = false; }
        console.log(name, data);
    };
    ChatBotByNameConfigService.prototype.Alert = function (active, data) {
        if (active === void 0) { active = false; }
        console.log(name, data);
    };
    return ChatBotByNameConfigService;
}());
exports.ChatBotByNameConfigService = ChatBotByNameConfigService;
//# sourceMappingURL=ChatBotConfigService.js.map