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
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var UserService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserService = _classThis = /** @class */ (function () {
        function UserService_1(http, host) {
            this.http = http;
            this.host = host;
            this.listRolUser = new Array;
            this.user = new RegisterModel_1.tblUser;
            this.rowSelection = "";
            this._host = host;
            this._http = http;
        }
        UserService_1.prototype.Saved = function (project) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            var result = this._http.post(this._host.GetHostApi() + "User/SaveUser", project);
            return result;
        };
        UserService_1.prototype.Upbdate = function (user) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            var result = this._http.post(this._host.GetHostApi() + "User/UpdateUser", user);
            return result;
        };
        UserService_1.prototype.Delete = function (id) {
            var result = this._http.delete(this._host.GetHostApi() + "User/DeleteUser" + "?id=" + id);
            return result;
        };
        UserService_1.prototype.GetAll = function (filter, page) {
            var _this = this;
            this._listUser = new Array;
            var result = this._http.get(this._host.GetHostApi() + "Project/GetAllProject?filter=".concat(filter, "&page=").concat(page));
            result.subscribe(function (e) {
                _this._listUser = e.data;
            });
            return result;
        };
        UserService_1.prototype.GetById = function (id) {
            var result = this._http.get(this._host.GetHostApi() + "User/GetUserById?id=".concat(id));
            return result;
        };
        UserService_1.prototype.GetRolsByProject = function (filter, page) {
            var _this = this;
            var result = this._http.get(this._host.GetHostApi() + "Rol/GetAllRol?page=".concat(page, "&filter=").concat(filter));
            result.subscribe(function (e) {
                console.log("Geyt Rol ", e.data);
                _this.listRolUser = e.data;
                console.log("Geyt Rol 2", _this.listRolUser);
            });
            return result;
        };
        UserService_1.prototype.GetAllUserByProject = function (filter, idProject, page) {
            var result = this._http.get(this._host.GetHostApi() + "User/GetAllUserByProject?filter=".concat(filter, "&idProject=").concat(idProject, "&page=").concat(page));
            return result;
        };
        UserService_1.prototype.GetAllCompany = function (filter, page) {
            var result = this._http.get(this._host.GetHostApi() + "Company/GetAllCompanyAdmin?filter=".concat(filter, "&page=").concat(page));
            return result;
        };
        UserService_1.prototype.GetAllProject = function (filter, idCompany, page) {
            var result = this._http.get(this._host.GetHostApi() + "Project/GetAllProjectAdmin?filter=".concat(filter, "&idCompany=").concat(idCompany, "&page=").concat(page));
            return result;
        };
        return UserService_1;
    }());
    __setFunctionName(_classThis, "UserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserService = _classThis;
}();
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map