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
exports.AlertService = void 0;
var core_1 = require("@angular/core");
var ModelAlert_1 = require("../../Models/Common/ModelAlert");
var AlertService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AlertService = _classThis = /** @class */ (function () {
        function AlertService_1() {
            this.timer = 9000;
            this.msg = new ModelAlert_1.Msg();
        }
        AlertService_1.prototype.AlertApi = function (msg, color, timer) {
            if (color === void 0) { color = "green"; }
            if (timer === void 0) { timer = 12000; }
            if (msg) {
                clearInterval(this.intervalAlertClosed);
                var data = msg[0];
                this.msg.msg = data.msg;
                this.msg.color = color;
                this.msg.status = true;
                this.StartTimerAlert(timer);
            }
        };
        AlertService_1.prototype.Alert = function (msg, color, timer) {
            if (color === void 0) { color = "green"; }
            if (timer === void 0) { timer = 12000; }
            clearInterval(this.intervalAlertClosed);
            this.msg.msg = msg;
            this.msg.color = color;
            this.msg.status = true;
            this.StartTimerAlert(timer);
        };
        AlertService_1.prototype.StartTimerAlert = function (timer) {
            var _this = this;
            this.intervalAlertClosed = setInterval(function () {
                _this.CloseAlert();
                clearInterval(_this.intervalAlertClosed);
            }, timer);
        };
        AlertService_1.prototype.GetMsg = function () {
            return this.msg;
        };
        AlertService_1.prototype.CloseAlert = function () {
            this.msg.msg = "";
            this.msg.status = false;
            this.msg.color = "";
            clearInterval(this.intervalAlertClosed);
        };
        return AlertService_1;
    }());
    __setFunctionName(_classThis, "AlertService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AlertService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AlertService = _classThis;
}();
exports.AlertService = AlertService;
//# sourceMappingURL=AlertService.js.map