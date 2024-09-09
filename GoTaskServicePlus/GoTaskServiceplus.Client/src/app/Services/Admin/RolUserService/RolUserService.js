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
exports.RolUserService = void 0;
var core_1 = require("@angular/core");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var GridModel_1 = require("../../../Models/Common/GridModel");
var RolUserService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RolUserService = _classThis = /** @class */ (function () {
        function RolUserService_1(http, host, _GridCustom) {
            this.http = http;
            this.host = host;
            this._GridCustom = _GridCustom;
            this.rol = new RegisterModel_1.tblRol();
            this._host = host;
            this._http = http;
        }
        RolUserService_1.prototype.GetRolById = function (id) {
            var _this = this;
            var result = this._http.get(this._host.GetHostApi() + "Rol/GetRolById?id=".concat(id));
            result.subscribe(function (e) {
                if (e.status) {
                    console.log(_this.rol);
                    _this.rol = e.data;
                }
            });
            return result;
        };
        RolUserService_1.prototype.GetRolsByProject = function (filter, page) {
            var _this = this;
            var result = this._http.get(this._host.GetHostApi() + "Rol/GetAllRol?page=".concat(page, "&filter=").concat(filter));
            result.subscribe(function (e) {
                _this.listRolUser = e.data;
                console.log("rol", _this.listRolUser);
                _this.LoadGrid();
            });
            return result;
        };
        RolUserService_1.prototype.DeleteRol = function (id) {
            var _this = this;
            var result = this._http.delete(this._host.GetHostApi() + "Rol/DeleteRol?id=".concat(id));
            result.subscribe(function (e) {
                if (e.status) {
                    _this.listRolUser = _this.listRolUser.filter(function (s) { return s.id != id; });
                }
                else {
                    alert("no eliminado" + e.msg);
                }
            });
            return result;
        };
        RolUserService_1.prototype.SaveRols = function (rol) {
            var _this = this;
            var result = this._http.post(this._host.GetHostApi() + "Rol/SaveRol", rol);
            result.subscribe(function (e) {
                if (e.status) {
                    if (_this.listRolUser == undefined || _this.listRolUser == null) {
                        _this.listRolUser = new Array;
                    }
                    _this.listRolUser.push(e.data);
                    _this.rol = new RegisterModel_1.tblRol();
                }
                else {
                    alert("No Guardado");
                }
            });
            return result;
        };
        RolUserService_1.prototype.UpdateRols = function (rol) {
            var _this = this;
            var result = this._http.post(this._host.GetHostApi() + "Rol/UpdateRol", rol);
            result.subscribe(function (e) {
                if (e.status) {
                    alert("actualizado");
                    _this.rol = new RegisterModel_1.tblRol();
                }
                else {
                    alert("No actulizado");
                }
            });
            return result;
        };
        RolUserService_1.prototype.GetPagesPermission = function () {
            var _this = this;
            var result = this._http.get(this._host.GetHostApi() + "Pages/GetAllPages?filter=all&page=0");
            result.subscribe(function (e) {
                if (e.status) {
                    _this.listPages = e.data;
                }
                else {
                }
            });
            return result;
        };
        RolUserService_1.prototype.ClearRol = function () {
            this.rol = new RegisterModel_1.tblRol();
        };
        RolUserService_1.prototype.LoadGrid = function () {
            var _this = this;
            var item = new GridModel_1.GridItem();
            this._GridCustom.data = Array();
            this.listRolUser.forEach(function (e) {
                item = new GridModel_1.GridItem();
                item.id = e.id;
                item.value = e.name;
                _this._GridCustom.data.push(item);
                item = new GridModel_1.GridItem();
                item.id = e.id;
                item.value = e.name;
                _this._GridCustom.data.push(item);
                item = new GridModel_1.GridItem();
                item.id = e.id;
                item.value = e.name;
                _this._GridCustom.data.push(item);
                item = new GridModel_1.GridItem();
                item.id = e.id;
                item.value = e.name;
                _this._GridCustom.data.push(item);
            });
        };
        return RolUserService_1;
    }());
    __setFunctionName(_classThis, "RolUserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RolUserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RolUserService = _classThis;
}();
exports.RolUserService = RolUserService;
//# sourceMappingURL=RolUserService.js.map