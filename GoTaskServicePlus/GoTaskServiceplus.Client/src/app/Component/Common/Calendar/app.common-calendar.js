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
exports.CalendarComponent = void 0;
var core_1 = require("@angular/core");
var DayModel_1 = require("../../../Models/Common/DayModel");
var CalendarComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: "app-common-calendar",
            templateUrl: './app.common-calendar.component.html',
            styleUrls: ['./app.common-calendar.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CalendarComponent = _classThis = /** @class */ (function () {
        function CalendarComponent_1(service) {
            this.daysNumber = 1;
            this.daySelect = new DayModel_1.DayModel();
            this.dateSelect = new Date();
            this._service = service;
        }
        CalendarComponent_1.prototype.ngOnInit = function () {
            this.dateSelect = this.Date();
            this.days = this.mostrarDiasDelMes(this.dateSelect.getMonth(), this.dateSelect.getFullYear());
        };
        CalendarComponent_1.prototype.SelectDay = function (day) {
            var selet = this.days.find(function (s) { return s.day == day.day; });
            if (selet != undefined)
                this.daySelect = selet;
        };
        CalendarComponent_1.prototype.ClearSelectDay = function (day) {
            this.days = this.mostrarDiasDelMes(day.day, 2024);
        };
        CalendarComponent_1.prototype.GoDay = function (mode) {
            var dateTemp;
            if (mode)
                this.dateSelect.setMonth(this.dateSelect.getMonth() + 1);
            else
                this.dateSelect.setMonth(this.dateSelect.getMonth() - 1);
            this.days = this.mostrarDiasDelMes(this.dateSelect.getMonth(), this.dateSelect.getFullYear());
        };
        CalendarComponent_1.prototype.mostrarDiasDelMes = function (mes, año) {
            //mes = (mes - 1);
            var primerDiaDelMes = new Date(año, mes, 1);
            var ultimoDiaDelMes = new Date(año, mes + 1, 0).getDate(); // Obtener el día del mes en lugar de la fecha completa
            var dias = [];
            for (var i = 1; i <= ultimoDiaDelMes; i++) {
                var dia = new DayModel_1.DayModel();
                dia.day = i;
                dia.active = this.ValidateDateActive(año, mes, i);
                dias.push(dia);
            }
            return dias;
        };
        CalendarComponent_1.prototype.ValidateDateActive = function (year, month, day) {
            var fechaActual = this.Date();
            var date = new Date(year, month, day) > fechaActual;
            /*alert(fechaActual.getUTCDay());*/
            if (fechaActual.getFullYear() <= year)
                if (fechaActual.getMonth() <= month)
                    if (fechaActual.getDate() <= day)
                        return true;
            return false;
        };
        CalendarComponent_1.prototype.DateString = function (fecha) {
            var fechaEnTexto = fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric', timeZone: 'America/Bogota' }); // 'es-ES' para obtener el mes en español
            return fechaEnTexto.toUpperCase();
        };
        CalendarComponent_1.prototype.Date = function () {
            var fechaActual = new Date();
            return fechaActual;
        };
        return CalendarComponent_1;
    }());
    __setFunctionName(_classThis, "CalendarComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CalendarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CalendarComponent = _classThis;
}();
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=app.common-calendar.js.map