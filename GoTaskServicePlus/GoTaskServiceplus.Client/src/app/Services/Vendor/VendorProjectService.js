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
exports.VendorProjectService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Admin_1 = require("../../Models/Admin/Admin");
var VendorProjectService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VendorProjectService = _classThis = /** @class */ (function () {
        function VendorProjectService_1(http, host) {
            this.http = http;
            this.host = host;
            this._project = new Admin_1.tblProject();
            this._host = host;
            this._http = http;
        }
        VendorProjectService_1.prototype.Saved = function (project) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            var result = this._http.post(this._host.GetHostApi() + "Project/SaveProject", project);
            return result;
        };
        VendorProjectService_1.prototype.Upbdate = function (company) {
            var reqHeaders = new http_1.HttpHeaders().set('Content-Type', 'application/json');
            var result = this._http.post(this._host.GetHostApi() + "Project/UpdateProject", company);
            return result;
        };
        VendorProjectService_1.prototype.Delete = function (id) {
            var result = this._http.delete(this._host.GetHostApi() + "Project/DeleteProjectById" + "?id=" + id);
            return result;
        };
        VendorProjectService_1.prototype.GetAllProject = function (filter, page) {
            this._listProject = new Array;
            var result = this._http.get(this._host.GetHostApi() + "Project/GetProjectById?idProject=00000000-0000-0000-0000-000000000000");
            //result.subscribe((e) => {
            //  this._listProject = e.data;
            //});
            return result;
        };
        VendorProjectService_1.prototype.GetAllProjectByCompany = function (idCompany, page) {
            var _this = this;
            if (idCompany == "")
                idCompany = "00000000-0000-0000-0000-000000000000";
            this._listProject = new Array;
            var result = this._http.get(this._host.GetHostApi() + "Project/GetAllProjectByCompany?id=".concat(idCompany, "&page=").concat(page));
            result.subscribe(function (e) {
                _this._listProject = e.data;
            });
            return result;
        };
        VendorProjectService_1.prototype.GetListAdress = function (filter, type, page) {
            var response = this._http.get(this._host.GetHostApi() + "Concept/GetAllConcept?filter=".concat(filter, "&type=").concat(type, "&page=").concat(page));
            return response;
        };
        VendorProjectService_1.prototype.GetProjectById = function (id) {
            var result = this._http.get(this._host.GetHostApi() + "Project/GetProjectById?idProject=".concat(id));
            return result;
        };
        VendorProjectService_1.prototype.GetAllCompanys = function (filter, page) {
            this._listCompany = new Array;
            var result = this._http.get(this._host.GetHostApi() + "Company/GetAllCompany?filter=".concat(filter, "&page=").concat(page));
            ////result.subscribe((e) => {    
            ////  this._listCompany = e.data;
            ////});
            return result;
        };
        return VendorProjectService_1;
    }());
    __setFunctionName(_classThis, "VendorProjectService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VendorProjectService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VendorProjectService = _classThis;
}();
exports.VendorProjectService = VendorProjectService;
//# sourceMappingURL=VendorProjectService.js.map