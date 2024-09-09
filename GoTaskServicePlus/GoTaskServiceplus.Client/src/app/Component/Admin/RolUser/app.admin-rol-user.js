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
exports.AdminRolUserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var app_custom_control_check_box_1 = require("../../Common/CustomControl/CheckBox/app.custom-control-check-box");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var GridModel_1 = require("../../../Models/Common/GridModel");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var AdminRolUserComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-admin-rol-user',
            templateUrl: 'app.admin-rol-user.component.html',
            styleUrls: ['app.admin-rol-user.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent, app_custom_control_check_box_1.CheckBoxComponent, app_custom_control_grid_1.GridComponent, app_common_menu_grid_1.MenuGridComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminRolUserComponent = _classThis = /** @class */ (function () {
        function AdminRolUserComponent_1(configservice, _util, http, cdRef, Permission, Rol, _GridCustom) {
            this._util = _util;
            this._GridCustom = _GridCustom;
            this._tab = "";
            this._configservice = configservice;
            this._http = http;
            this._cdRef = cdRef;
            this._Rol = Rol;
            this._Permission = Permission;
        }
        AdminRolUserComponent_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("admin-rol-user");
            if (status) {
                this.InitialLoad();
                this.LoadData();
                this.LoadHeaderGrid();
            }
        };
        AdminRolUserComponent_1.prototype.LoadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    this._Rol.GetPagesPermission();
                    result = this._Rol.GetRolsByProject("all", 0);
                    return [2 /*return*/];
                });
            });
        };
        AdminRolUserComponent_1.prototype.Prueba = function (value) {
            return value;
        };
        AdminRolUserComponent_1.prototype.Saved = function () {
            if (this._Rol.rol.id == this._util.GuidEmpty()) {
                var validate = this.Validate();
                if (validate == "") {
                    this._Rol.SaveRols(this._Rol.rol);
                }
                else {
                    alert(validate);
                }
            }
            else {
                this.UpdateRol();
            }
        };
        AdminRolUserComponent_1.prototype.UpdateRol = function () {
            var validate = this.Validate();
            if (validate == "") {
                this._Rol.UpdateRols(this._Rol.rol);
            }
            else {
                alert(validate);
            }
        };
        AdminRolUserComponent_1.prototype.Edit = function (id) {
            if (id != "") {
                this._Rol.GetRolById(id);
            }
        };
        AdminRolUserComponent_1.prototype.Delete = function (id) {
            if (id != "") {
                this._Rol.DeleteRol(id);
            }
        };
        AdminRolUserComponent_1.prototype.onSelectChangePage = function (event) {
            this.InitialLoad();
            var value = event.target.value;
            this._Rol.rol.permissionByRoll.page = value;
        };
        AdminRolUserComponent_1.prototype.ChangedIsPermission = function (mode, status) {
            this.InitialLoad();
            if (mode == "delete")
                this._Rol.rol.permissionByRoll.delete = status;
            if (mode == "read") {
                this._Rol.rol.permissionByRoll.read = status;
            }
            if (mode == "write")
                this._Rol.rol.permissionByRoll.write = status;
            if (mode == "share")
                this._Rol.rol.permissionByRoll.share = status;
            if (mode == "save")
                this._Rol.rol.permissionByRoll.save = status;
            this._cdRef.detectChanges();
        };
        AdminRolUserComponent_1.prototype.ChangedRolType = function (mode) {
            this.InitialLoad();
            this._Rol.rol.isCustomer = false;
            this._Rol.rol.isVendor = false;
            this._Rol.rol.isMaker = false;
            this._Rol.rol.isAdmin = false;
            if (mode == "isCustomer")
                this._Rol.rol.isCustomer = true;
            if (mode == "isVendor") {
                this._Rol.rol.isVendor = true;
            }
            if (mode == "isMaker")
                this._Rol.rol.isMaker = true;
            if (mode == "isAdmin")
                this._Rol.rol.isAdmin = true;
            this._cdRef.detectChanges();
        };
        AdminRolUserComponent_1.prototype.LoadHeaderGrid = function () {
            return __awaiter(this, void 0, void 0, function () {
                var item;
                return __generator(this, function (_a) {
                    item = new GridModel_1.GridItem();
                    this._GridCustom.dataHeader = Array();
                    item.id = "0";
                    item.value = "Nombre";
                    this._GridCustom.dataHeader.push(item);
                    item = new GridModel_1.GridItem();
                    item.id = "0";
                    item.value = "Pagina";
                    this._GridCustom.dataHeader.push(item);
                    item = new GridModel_1.GridItem();
                    item.id = "0";
                    item.value = "Permiso";
                    this._GridCustom.dataHeader.push(item);
                    item = new GridModel_1.GridItem();
                    item.id = "0";
                    item.value = "Es publico";
                    this._GridCustom.dataHeader.push(item);
                    item = new GridModel_1.GridItem();
                    item.id = "0";
                    item.value = "Tipo de rol";
                    this._GridCustom.dataHeader.push(item);
                    return [2 /*return*/];
                });
            });
        };
        AdminRolUserComponent_1.prototype.changedInputName = function (event) {
            var id = event.target.value;
            this._Rol.rol.code = this._Rol.rol.name;
            /*    this._cdRef.detectChanges();*/
        };
        AdminRolUserComponent_1.prototype.ChangedIsPublic = function (mode) {
            this._Rol.rol.isPublic = mode;
            this._cdRef.detectChanges();
        };
        AdminRolUserComponent_1.prototype.GetTypeRol = function (mode) {
            if (mode.isCustomer)
                return "Cliente";
            if (mode.isVendor)
                return "Vendedor";
            if (mode.isMaker)
                return "Fabricante";
            if (mode.isAdmin)
                return "Administrador";
            return "";
        };
        AdminRolUserComponent_1.prototype.Getpermission = function (mode) {
            var value = "";
            if (mode.permissionByRoll.read)
                value += "Leer,";
            if (mode.permissionByRoll.write)
                value += "Escribir,";
            if (mode.permissionByRoll.save)
                value += "Guardar,";
            if (mode.permissionByRoll.delete)
                value += "Eliminar,";
            if (mode.permissionByRoll.share)
                value += "Compartir,";
            return value;
        };
        AdminRolUserComponent_1.prototype.IsPublic = function (mode) {
            if (mode.isPublic)
                return "Publico";
            else
                return "Privado";
        };
        AdminRolUserComponent_1.prototype.Selection = function (id) {
            this._rowSeletion = id;
            this._cdRef.detectChanges();
        };
        AdminRolUserComponent_1.prototype.languageTraslate = function (value) {
            return value;
        };
        AdminRolUserComponent_1.prototype.Validate = function () {
            var msg = "";
            if (this._Rol.rol.name == undefined)
                msg = "nombre requerido";
            if (this._Rol.rol.permissionByRoll == null)
                msg = "Permisos requeridos";
            if (this._Rol.rol.permissionByRoll == undefined)
                msg = "Permisos requeridos";
            if (!this._Rol.rol.isCustomer && !this._Rol.rol.isVendor && !this._Rol.rol.isMaker && !this._Rol.rol.isAdmin)
                msg = "Tipo de rol requeridos";
            return msg;
        };
        AdminRolUserComponent_1.prototype.InitialLoad = function () {
            if (this._Rol.rol.permissionByRoll == null)
                this._Rol.rol.permissionByRoll = new RegisterModel_1.Permission;
            if (this._Rol.rol.permissionByRoll == undefined)
                this._Rol.rol.permissionByRoll = new RegisterModel_1.Permission;
            if (this._Rol.listPages == undefined)
                this._Rol.listPages = new Array();
            if (this._Rol.listPages == null)
                this._Rol.listPages = new Array();
        };
        AdminRolUserComponent_1.prototype.ClerRol = function () {
            this._Rol.ClearRol();
        };
        return AdminRolUserComponent_1;
    }());
    __setFunctionName(_classThis, "AdminRolUserComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRolUserComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRolUserComponent = _classThis;
}();
exports.AdminRolUserComponent = AdminRolUserComponent;
//# sourceMappingURL=app.admin-rol-user.js.map