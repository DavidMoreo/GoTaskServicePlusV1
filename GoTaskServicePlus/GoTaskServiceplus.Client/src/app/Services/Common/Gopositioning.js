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
exports.GpsService = void 0;
var core_1 = require("@angular/core");
var Coordinates_1 = require("../../Models/Common/Coordinates");
var GpsService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GpsService = _classThis = /** @class */ (function () {
        function GpsService_1(_CommonService) {
            var _this = this;
            this._CommonService = _CommonService;
            this.gradosARadianes = function (grados) {
                return grados * Math.PI / 180;
            };
            if (navigator.permissions) {
                navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
                    if (permissionStatus.state === 'granted') {
                        _this.GetCoordinates();
                    }
                });
            }
            else {
                console.log('El navegador no soporta el API de permisos');
            }
        }
        GpsService_1.prototype.GetCoordinates = function () {
            var _this = this;
            var result = new Promise(function (resolve, reject) {
                if (!navigator.geolocation) {
                    reject("Geolocalización no está disponible en este dispositivo.");
                }
                else {
                    var options = {
                        enableHighAccuracy: true, // Solicitar la máxima precisión posible
                    };
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var coordenadas = new Coordinates_1.Coordinates();
                        coordenadas.latitud = position.coords.latitude;
                        coordenadas.longitud = position.coords.longitude;
                        resolve(coordenadas);
                    }, function (error) {
                        reject("Error al obtener la ubicaci\u00F3n: ".concat(error.message));
                    }, options // Pasar las opciones al método getCurrentPosition
                    );
                }
            });
            result.then(function (e) {
                _this._CommonService._StorageService.SetGps(JSON.stringify(e));
                _this.GetCoordinatesAuto();
            });
        };
        GpsService_1.prototype.GetCoordinatesAuto = function () {
            var _this = this;
            var result = new Promise(function (resolve, reject) {
                if (!navigator.geolocation) {
                    reject("Geolocalización no está disponible en este dispositivo.");
                }
                else {
                    var options = {
                        enableHighAccuracy: true, // Solicitar la máxima precisión posible
                        timeout: 500000,
                        maximumAge: 0
                    };
                    _this.watchId = navigator.geolocation.watchPosition(function (position) {
                        var coordenadas = new Coordinates_1.Coordinates();
                        coordenadas.latitud = position.coords.latitude;
                        coordenadas.longitud = position.coords.longitude;
                        resolve(coordenadas);
                    }, function (error) {
                        reject("Error al obtener la ubicaci\u00F3n: ".concat(error.message));
                    }, options // Pasar las opciones al método watchPosition
                    );
                    // Puedes guardar el ID del watcher si necesitas detenerlo en el futuro
                    // Por ejemplo: navigator.geolocation.clearWatch(watchId);
                }
            });
            result.then(function (e) {
                /*  window.localStorage.setItem("GPS", JSON.stringify(e));*/
                _this._CommonService._StorageService.SetGps(JSON.stringify(e));
            });
        };
        GpsService_1.prototype.ChangedDistance = function () {
            var _this = this;
            var timer = setInterval(function () {
                /*console.log("gps");*/
                clearInterval(timer);
                _this.GetCoordinatesAuto();
            }, 7000);
        };
        GpsService_1.prototype.SetCordinates = function () {
            // this.GetCoordinatesAuto();
            this.GetCoordinates();
        };
        GpsService_1.prototype.DeleteCordinates = function () {
            navigator.geolocation.clearWatch(this.watchId);
            this._CommonService._StorageService.ClearGps();
        };
        GpsService_1.prototype.GetGpsActive = function () {
            var gps = this._CommonService._StorageService.GetGps();
            if (gps != null && gps != undefined && gps != "")
                return true;
            else
                return false;
        };
        GpsService_1.prototype.GetGps = function () {
            var cordinates = new Coordinates_1.Coordinates();
            var gps = this._CommonService._StorageService.GetGps();
            if (this.GetGpsActive() && gps != null) {
                cordinates = JSON.parse(gps);
                return cordinates;
            }
            else
                return cordinates;
        };
        GpsService_1.prototype.GetDistance = function (lat, lng) {
            if (this.GetGpsActive()) {
                var GpsCustomer = this.GetGps();
                return this.CalculateDistance(lat, lng, GpsCustomer.latitud, GpsCustomer.longitud);
            }
            return "Gps ❔";
        };
        GpsService_1.prototype.CalculateDistance = function (lat1, lon1, lat2, lon2) {
            // Convertir todas las coordenadas a radianes
            lat1 = this.gradosARadianes(lat1);
            lon1 = this.gradosARadianes(lon1);
            lat2 = this.gradosARadianes(lat2);
            lon2 = this.gradosARadianes(lon2);
            // Aplicar fórmula
            var RADIO_TIERRA_EN_KILOMETROS = 6371;
            var diferenciaEntreLongitudes = (lon2 - lon1);
            var diferenciaEntreLatitudes = (lat2 - lat1);
            var a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var text = (RADIO_TIERRA_EN_KILOMETROS * c) >= 1 ? " km" : "m";
            var number = "";
            if ((RADIO_TIERRA_EN_KILOMETROS * c) >= 1) {
                number = (RADIO_TIERRA_EN_KILOMETROS * c).toString().substr(0, 3);
            }
            else {
                number = ((RADIO_TIERRA_EN_KILOMETROS * c) * 1000).toString().substr(0, 3);
            }
            var cor = number + " " + text;
            return cor;
        };
        return GpsService_1;
    }());
    __setFunctionName(_classThis, "GpsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GpsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GpsService = _classThis;
}();
exports.GpsService = GpsService;
//# sourceMappingURL=Gopositioning.js.map