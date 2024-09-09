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
exports.MenuComponent = void 0;
var core_1 = require("@angular/core");
var MenuModel_1 = require("../../Models/Home/MenuModel");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../Permission/app.permission");
var MenuComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-home-menu",
            templateUrl: './app.home-menu-component.html',
            styleUrls: ['app.home-menu.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MenuComponent = _classThis = /** @class */ (function () {
        function MenuComponent_1(configservice, cdRef, router) {
            this.router = router;
            this._visibleItem = 0;
            this._configservice = configservice;
            this._cdRef = cdRef;
            this._router = router;
        }
        MenuComponent_1.prototype.ngOnInit = function () {
        };
        MenuComponent_1.prototype.LoadMenuAdmin = function () {
            var _ListMenu = new Array();
            var item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Producto";
            item.description = "Crea o edita productos, carga imágenes, pública u ocultar los productos creados.";
            item.ico = "box2-fill";
            item.route = "add-product";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "1";
            item.title = "Conceptos";
            item.route = "conceptual-product";
            item.ico = "boxes";
            item.description = "Crea o edita conceptos, estos permiten clasificar cada producto";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "3";
            item.title = "Compañia";
            item.route = "admin-company";
            item.ico = "building";
            item.description = "Crea o edita empresas";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "3";
            item.title = "Sucursal";
            item.route = "admin-project";
            item.ico = "buildings";
            item.description = "Crea o edita tus sucursales";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "3";
            item.title = "Usuarios";
            item.route = "admin-user";
            item.ico = "people";
            item.description = "Editar usuarios, activar, desactivar, eliminar";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "3";
            item.title = "Roles";
            item.route = "admin-rol-user";
            item.ico = "people";
            item.description = "Editar roles, activar, desactivar, eliminar";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "5";
            item.title = "Configurar chat bot";
            item.route = "chat-config";
            item.ico = "chat-square-dots-fill";
            item.description = "Configurar chat bot";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "6";
            item.title = "Menu de sucursales";
            item.route = "project-menu";
            item.ico = "signpost-split";
            item.description = "Cambiar entre sucursales";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "6";
            item.title = "Ventas";
            item.route = "admin-buy";
            item.ico = "stopwatch";
            item.description = "Ventas por status";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "7";
            item.title = "Busquedas";
            item.route = "admin-list-search";
            item.ico = "search";
            item.description = "Historial de busquedas";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "7";
            item.title = "Seguimiento";
            item.route = "store-tracking";
            item.ico = "suitcase-lg";
            item.description = "Seguimiento nuevo";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "7";
            item.title = "Mapa";
            item.route = "map-store";
            item.ico = "bi-map-fill";
            item.description = "Mapa";
            _ListMenu.push(item);
            return _ListMenu;
        };
        MenuComponent_1.prototype.LoadMenuCustomer = function () {
            var _ListMenuCustomer = new Array();
            var item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Aprende con Go Task Service";
            item.description = "Curso de desarrollo web, Android e IoT y más";
            item.ico = "cart";
            item.route = "tools";
            _ListMenuCustomer.push(item);
            var item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Recuperar contraseña";
            item.description = "Recuperar contraseña con tu número de celular.";
            item.ico = "lock-fill";
            item.route = "changed-password-user";
            _ListMenuCustomer.push(item);
            var item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Carrito de compras";
            item.description = "Tus productos";
            item.ico = "cart";
            item.route = "product-cart";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Mis compras";
            item.description = "Compras realizadas para seguimiento";
            item.ico = "bag-fill";
            item.route = "product-buy";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Favoritos";
            item.description = "Tus Productos guardados como favoritos.";
            item.ico = "heart-fill";
            item.route = "user-favorite";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Buscar productos";
            item.description = "Puedes ver y buscar productos locales";
            item.ico = "search";
            item.route = "select-product-search/all";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Descarga videos";
            item.description = "Descarga videos desde Youtube con la url";
            item.ico = "file-play-fill";
            item.route = "youtube-download";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Texto a voz";
            item.description = "Convierte texto o voz, desde texto o PDF";
            item.ico = "file-music-fill";
            item.route = "text-to-speech";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "4";
            item.title = "Home";
            item.route = "home";
            item.ico = "house";
            item.description = "Página principal";
            _ListMenuCustomer.push(item);
            item = new MenuModel_1.Menu();
            item.id = "4";
            item.title = "chat IA";
            item.route = "app-chat-bot-msg";
            item.ico = "robot";
            item.description = "Chat con IA";
            _ListMenuCustomer.push(item);
            return _ListMenuCustomer;
        };
        MenuComponent_1.prototype.LoadMenuVenndor = function () {
            var _ListMenu = new Array();
            var item = new MenuModel_1.Menu();
            item.id = "0";
            item.title = "Producto";
            item.description = "Crea o edita productos, carga imágenes, pública u ocultar los productos creados.";
            item.ico = "box2-fill";
            item.route = "add-product";
            _ListMenu.push(item);
            var item = new MenuModel_1.Menu();
            item = new MenuModel_1.Menu();
            item.id = "7";
            item.title = "Activar productos";
            item.route = "app-vendor-active-product";
            item.ico = "box2-fill";
            item.description = "Vendedor podra activar productos";
            _ListMenu.push(item);
            var item = new MenuModel_1.Menu();
            item = new MenuModel_1.Menu();
            item.id = "7";
            item.title = "Editar Sucursal";
            item.route = "update-project-vendor";
            item.ico = "shop";
            item.description = "Editar nombre, ubicación, telefono , horarios ";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "2";
            item.title = "Conceptos por empresa";
            item.route = "customer-concept";
            item.ico = "boxes";
            item.description = "Crea o edita direcciones, activar productos";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "2";
            item.title = "Mis ventas";
            item.route = "list-buy-vendor";
            item.ico = "clock-history";
            item.description = "Mis ventas";
            _ListMenu.push(item);
            item = new MenuModel_1.Menu();
            item.id = "4";
            item.title = "Referencia";
            item.route = "refer-product";
            item.ico = "gear-wide-connected";
            item.description = "Referencia de Productos";
            _ListMenu.push(item);
            return _ListMenu;
        };
        MenuComponent_1.prototype.Route = function (name) {
            this._router.navigate([name]);
        };
        return MenuComponent_1;
    }());
    __setFunctionName(_classThis, "MenuComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MenuComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MenuComponent = _classThis;
}();
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=app.home-menu.js.map