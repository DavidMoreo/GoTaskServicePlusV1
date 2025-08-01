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
exports.MapStoreComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../Permission/app.permission");
var tblProduct_1 = require("../../Models/Structure/tblProduct");
var app_common_menu_grid_1 = require("../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../Common/CustomControl/Grid/app.custom-control-grid");
var app_common_mapa_1 = require("../Common/Mapa/app.common-mapa");
var MapStoreComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-map-store',
            templateUrl: 'app.map-store.component.html',
            styleUrls: ['app.map-store.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent, app_common_mapa_1.MapComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _ListStoreLocation_decorators;
    var _ListStoreLocation_initializers = [];
    var _ListStoreLocation_extraInitializers = [];
    var MapStoreComponent = _classThis = /** @class */ (function () {
        function MapStoreComponent_1(_CommonService, Permission, _projectService) {
            this._CommonService = _CommonService;
            this._projectService = _projectService;
            this.listCoordinates = new Array();
            this.ListStoreLocation = __runInitializers(this, _ListStoreLocation_initializers, new Array);
            __runInitializers(this, _ListStoreLocation_extraInitializers);
            this._CommonService = _CommonService;
            this._projectService = _projectService;
            this._Permission = Permission;
        }
        MapStoreComponent_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("map-store");
            if (status) {
                this.loadData();
            }
        };
        MapStoreComponent_1.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    this._projectService.adressList = new Array();
                    result = this._projectService.GetAdminAllConceptByIdCompany("all", tblProduct_1.TypeConcepValue.AdressConcept(), 1, "A3DF91B1-67C1-4C45-B84A-EB0B0CBEE3FB");
                    result.subscribe(function (e) {
                        e.data.forEach(function (data) {
                            _this.listCoordinates.push(data.value.replace("lat:", "").replace("lng:", ""));
                        });
                        _this.listCoordinates.forEach(function (data) {
                            _this.ListStoreLocation.push([Number.parseFloat(data.split(",")[0]), Number.parseFloat(data.split(",")[1])]);
                        });
                    });
                    return [2 /*return*/];
                });
            });
        };
        MapStoreComponent_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return MapStoreComponent_1;
    }());
    __setFunctionName(_classThis, "MapStoreComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _ListStoreLocation_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _ListStoreLocation_decorators, { kind: "field", name: "ListStoreLocation", static: false, private: false, access: { has: function (obj) { return "ListStoreLocation" in obj; }, get: function (obj) { return obj.ListStoreLocation; }, set: function (obj, value) { obj.ListStoreLocation = value; } }, metadata: _metadata }, _ListStoreLocation_initializers, _ListStoreLocation_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MapStoreComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MapStoreComponent = _classThis;
}();
exports.MapStoreComponent = MapStoreComponent;
//# sourceMappingURL=app.map-store.js.map