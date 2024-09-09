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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapComponent = void 0;
var core_1 = require("@angular/core");
var L = require("leaflet");
var MapComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-common-mapa",
            templateUrl: './app.common-mapa.component.html',
            styleUrls: ['./app.common-mapa.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _Height_decorators;
    var _Height_initializers = [];
    var _Height_extraInitializers = [];
    var _IsList_decorators;
    var _IsList_initializers = [];
    var _IsList_extraInitializers = [];
    var _Range_decorators;
    var _Range_initializers = [];
    var _Range_extraInitializers = [];
    var _coordinaesProyectLat_decorators;
    var _coordinaesProyectLat_initializers = [];
    var _coordinaesProyectLat_extraInitializers = [];
    var _coordinaesProyectLng_decorators;
    var _coordinaesProyectLng_initializers = [];
    var _coordinaesProyectLng_extraInitializers = [];
    var _ListStoreLocation_decorators;
    var _ListStoreLocation_initializers = [];
    var _ListStoreLocation_extraInitializers = [];
    var MapComponent = _classThis = /** @class */ (function () {
        function MapComponent_1(_Coordinates) {
            this._Coordinates = _Coordinates;
            this.Height = __runInitializers(this, _Height_initializers, "300px");
            this.IsList = (__runInitializers(this, _Height_extraInitializers), __runInitializers(this, _IsList_initializers, false));
            this.Range = (__runInitializers(this, _IsList_extraInitializers), __runInitializers(this, _Range_initializers, 100));
            this.coordinaesProyectLat = (__runInitializers(this, _Range_extraInitializers), __runInitializers(this, _coordinaesProyectLat_initializers, ""));
            this.coordinaesProyectLng = (__runInitializers(this, _coordinaesProyectLat_extraInitializers), __runInitializers(this, _coordinaesProyectLng_initializers, ""));
            this.ListStoreLocation = (__runInitializers(this, _coordinaesProyectLng_extraInitializers), __runInitializers(this, _ListStoreLocation_initializers, [[4.713342394520654, -74.21854652795646],
                [4.719342394520654, -74.22054652795646], // Tienda 1
                [4.715342394520654, -74.21654652795646], // Tienda 2
                [4.710342394520654, -74.21954652795646], // Tienda 3
                [4.712342394520654, -74.22354652795646] // Tienda 4
            ]));
            // Coordenadas de los dos puntos
            this.myLocation = (__runInitializers(this, _ListStoreLocation_extraInitializers), [4.713342394520654, -74.21854652795646]);
            this.storeLocation = [4.713342394520654, -74.21854652795646]; // Reemplaza estas coordenadas con las de la tienda
        }
        MapComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var timer = setTimeout(function () {
                var coordinates = _this._Coordinates.GetGps();
                _this.myLocation = [coordinates.latitud, coordinates.longitud];
                if (_this.map != undefined || true) {
                    if (!_this.IsList) {
                        _this.storeLocation = [Number.parseFloat(_this.coordinaesProyectLat), Number.parseFloat(_this.coordinaesProyectLng)];
                        _this.LoadMap();
                        _this.initMap();
                    }
                    else {
                        _this.LoadMap();
                        _this.UpdateMap(_this.myLocation, _this.ListStoreLocation);
                    }
                    clearTimeout(timer);
                }
            }, 100);
        };
        MapComponent_1.prototype.LoadMap = function () {
            if (!this.map) {
                this.map = L.map('map').setView(this.myLocation, 19);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(this.map);
            }
        };
        MapComponent_1.prototype.initMap = function () {
            // Inicializa el mapa en la ubicación del vendedor
            // Definir íconos personalizados
            var myIcon = L.icon({
                iconUrl: 'assets/CustomerGps.png', // Ruta a la imagen personalizada
                iconSize: [38, 38], // Tamaño del ícono
                iconAnchor: [22, 38], // Punto del ícono que se corresponderá con la posición del marcador
                popupAnchor: [-3, -38] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
            });
            var storeIcon = L.icon({
                iconUrl: 'assets/StoreGps.png', // Ruta a la imagen personalizada
                iconSize: [28, 38], // Tamaño del ícono
                iconAnchor: [10, 35], // Punto del ícono que se corresponderá con la posición del marcador
                popupAnchor: [-3, -40] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
            });
            // Añade un marcador en la ubicación del vendedor con el ícono personalizado
            var myMarker = L.marker(this.myLocation, { icon: myIcon }).addTo(this.map);
            myMarker.bindPopup('Tú').openPopup();
            // Añade un marcador en la ubicación de la tienda con el ícono personalizado
            var storeMarker = L.marker(this.storeLocation, { icon: storeIcon }).addTo(this.map);
            storeMarker.bindPopup('Ubicación tienda');
            // Dibuja una línea entre los dos puntos
            var line = L.polyline([this.myLocation, this.storeLocation], { color: 'blue' }).addTo(this.map);
            // Ajusta el mapa para mostrar ambos puntos y la línea
            this.map.fitBounds(line.getBounds());
        };
        MapComponent_1.prototype.UpdateMap = function (clientCoords, storeCoordsList) {
            var _this = this;
            // Actualiza la ubicación del cliente
            this.myLocation = clientCoords;
            // Limpia los marcadores y líneas previas
            this.map.eachLayer(function (layer) {
                if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                    _this.map.removeLayer(layer);
                }
            });
            // Añade un nuevo marcador en la ubicación del cliente
            var myIcon = L.icon({
                iconUrl: 'assets/CustomerGps.png', // Ruta a la imagen personalizada
                iconSize: [38, 38], // Tamaño del ícono
                iconAnchor: [22, 38], // Punto del ícono que se corresponderá con la posición del marcador
                popupAnchor: [-3, -38] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
            });
            var myMarker = L.marker(this.myLocation, { icon: myIcon }).addTo(this.map);
            myMarker.bindPopup('Tú').openPopup();
            // Añade nuevos marcadores en las ubicaciones de las tiendas y dibuja líneas
            var storeIcon = L.icon({
                iconUrl: 'assets/StoreGps.png', // Ruta a la imagen personalizada
                iconSize: [28, 38], // Tamaño del ícono
                iconAnchor: [10, 35], // Punto del ícono que se corresponderá con la posición del marcador
                popupAnchor: [-3, -40] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
            });
            storeCoordsList.forEach(function (storeCoords) {
                var storeMarker = L.marker(storeCoords, { icon: storeIcon }).addTo(_this.map);
                storeMarker.bindPopup('Ubicación tienda');
                // Dibuja una línea entre el cliente y cada tienda
                /* const line = L.polyline([this.myLocation, storeCoords], { color: 'blue' }).addTo(this.map);*/
            });
            // Ajusta el mapa para mostrar todos los puntos y las líneas
            var bounds = L.latLngBounds(__spreadArray([this.myLocation], storeCoordsList, true));
            this.map.fitBounds(bounds);
        };
        return MapComponent_1;
    }());
    __setFunctionName(_classThis, "MapComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _Height_decorators = [(0, core_1.Input)()];
        _IsList_decorators = [(0, core_1.Input)()];
        _Range_decorators = [(0, core_1.Input)()];
        _coordinaesProyectLat_decorators = [(0, core_1.Input)()];
        _coordinaesProyectLng_decorators = [(0, core_1.Input)()];
        _ListStoreLocation_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _Height_decorators, { kind: "field", name: "Height", static: false, private: false, access: { has: function (obj) { return "Height" in obj; }, get: function (obj) { return obj.Height; }, set: function (obj, value) { obj.Height = value; } }, metadata: _metadata }, _Height_initializers, _Height_extraInitializers);
        __esDecorate(null, null, _IsList_decorators, { kind: "field", name: "IsList", static: false, private: false, access: { has: function (obj) { return "IsList" in obj; }, get: function (obj) { return obj.IsList; }, set: function (obj, value) { obj.IsList = value; } }, metadata: _metadata }, _IsList_initializers, _IsList_extraInitializers);
        __esDecorate(null, null, _Range_decorators, { kind: "field", name: "Range", static: false, private: false, access: { has: function (obj) { return "Range" in obj; }, get: function (obj) { return obj.Range; }, set: function (obj, value) { obj.Range = value; } }, metadata: _metadata }, _Range_initializers, _Range_extraInitializers);
        __esDecorate(null, null, _coordinaesProyectLat_decorators, { kind: "field", name: "coordinaesProyectLat", static: false, private: false, access: { has: function (obj) { return "coordinaesProyectLat" in obj; }, get: function (obj) { return obj.coordinaesProyectLat; }, set: function (obj, value) { obj.coordinaesProyectLat = value; } }, metadata: _metadata }, _coordinaesProyectLat_initializers, _coordinaesProyectLat_extraInitializers);
        __esDecorate(null, null, _coordinaesProyectLng_decorators, { kind: "field", name: "coordinaesProyectLng", static: false, private: false, access: { has: function (obj) { return "coordinaesProyectLng" in obj; }, get: function (obj) { return obj.coordinaesProyectLng; }, set: function (obj, value) { obj.coordinaesProyectLng = value; } }, metadata: _metadata }, _coordinaesProyectLng_initializers, _coordinaesProyectLng_extraInitializers);
        __esDecorate(null, null, _ListStoreLocation_decorators, { kind: "field", name: "ListStoreLocation", static: false, private: false, access: { has: function (obj) { return "ListStoreLocation" in obj; }, get: function (obj) { return obj.ListStoreLocation; }, set: function (obj, value) { obj.ListStoreLocation = value; } }, metadata: _metadata }, _ListStoreLocation_initializers, _ListStoreLocation_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MapComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MapComponent = _classThis;
}();
exports.MapComponent = MapComponent;
//# sourceMappingURL=app.common-mapa.js.map