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
exports.AdminteUser = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var RegisterModel_1 = require("../../../Models/Segurity/Register/RegisterModel");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var AdminteUser = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-admin-user',
            templateUrl: 'app.admin-user.component.html',
            styleUrls: ['app.admin-user.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent, app_custom_control_grid_1.GridComponent, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminteUser = _classThis = /** @class */ (function () {
        function AdminteUser_1(_CommonService, configservice, cdRef, CompanyService, Permission, _GridCustom, _util) {
            this._CommonService = _CommonService;
            this._GridCustom = _GridCustom;
            this._util = _util;
            this._configservice = configservice;
            this._cdRef = cdRef;
            this._UserService = CompanyService;
            this._Permission = Permission;
        }
        AdminteUser_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("admin-user");
            if (status) {
                this.LoadData();
                this.LoadCompanys();
            }
        };
        AdminteUser_1.prototype.LoadCompanys = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //this.GetAllByIdProject("all");   
                    this.GetAllRol("all");
                    this.GetAllCompany("all");
                    return [2 /*return*/];
                });
            });
        };
        AdminteUser_1.prototype.Delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var rest;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._UserService.Delete(id).subscribe(function (e) {
                                if (e.status) {
                                    _this._UserService._listUser = _this._UserService._listUser.filter(function (item) { return item.id != id; });
                                    _this._CommonService._AlertService.Alert("Eliminado");
                                }
                                else {
                                    /* alert("No Eliminado");*/
                                }
                            })];
                        case 1:
                            rest = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AdminteUser_1.prototype.Edit = function (id) {
            var _this = this;
            this._UserService.GetById(this._UserService.rowSelection).subscribe(function (e) {
                console.log(e.data);
                _this._UserService.user = e.data;
            });
        };
        AdminteUser_1.prototype.Clone = function (id) {
            var _this = this;
            this._UserService.GetById(this._UserService.rowSelection).subscribe(function (e) {
                console.log(e.data);
                _this._UserService.user = e.data;
                _this._UserService.user.id = _this._util.GuidEmpty();
                alert(_this._UserService.user.id);
            });
        };
        AdminteUser_1.prototype.ClearData = function (id) {
            this._UserService.rowSelection = "";
            this._UserService.user = new RegisterModel_1.tblUser();
            this._UserService.user.id = this._util.GuidEmpty();
        };
        AdminteUser_1.prototype.SaveUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ValidateConcept();
                            if (!(this._UserService.user.id == "00000000-0000-0000-0000-000000000000")) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._UserService.Saved(this._UserService.user)
                                    .subscribe(function (e) {
                                    if (e.status) {
                                        _this._UserService._listUser = _this._UserService._listUser.filter(function (s) { return s.id != _this._UserService.user.id; });
                                        _this._UserService._listUser.push(e.data);
                                        _this._cdRef.detectChanges();
                                        alert("guardado");
                                    }
                                    else {
                                        alert("No guardado");
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._UserService.Upbdate(this._UserService.user)
                                .subscribe(function (e) {
                                if (e.status) {
                                    _this._UserService._listUser = _this._UserService._listUser.filter(function (s) { return s.id != _this._UserService.user.id; });
                                    _this._UserService._listUser.push(e.data);
                                    _this._cdRef.detectChanges();
                                    alert("Actualizado");
                                }
                                else {
                                    alert("No Actualizado");
                                }
                            })];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AdminteUser_1.prototype.GetAllUserByProject = function (idProject) {
            var _this = this;
            this._UserService._listUser = new Array();
            this._UserService.GetAllUserByProject("all", idProject, 0).subscribe(function (e) {
                _this._UserService._listUser = e.data;
                console.log("user", _this._UserService._listUser);
                if (!_this._UserService._listUser)
                    _this._CommonService._AlertService.Alert("No se encontraron datos a mostrar");
            });
        };
        AdminteUser_1.prototype.GetAllCompany = function (filter) {
            var _this = this;
            this._UserService._listCompany = new Array();
            this._UserService.GetAllCompany(filter, 0).subscribe(function (e) {
                _this._UserService._listCompanyFilter = e.data;
                _this._UserService._listCompany = e.data;
                //this._cdRef.detectChanges();
            });
        };
        AdminteUser_1.prototype.GetAllProject = function (filter, idCompany) {
            var _this = this;
            this._UserService._listProject = new Array();
            this._UserService.GetAllProject(filter, idCompany, 0).subscribe(function (e) {
                _this._UserService._listProjectFilter = e.data;
                //this._cdRef.detectChanges();
            });
        };
        AdminteUser_1.prototype.GetAllProjectUserUpdate = function (filter, idCompany) {
            var _this = this;
            this._UserService._listProject = new Array();
            this._UserService.GetAllProject(filter, idCompany, 0).subscribe(function (e) {
                _this._UserService._listProject = e.data;
                //this._cdRef.detectChanges();
            });
        };
        AdminteUser_1.prototype.GetAllProjectUpdate = function (filter, idCompany) {
            var _this = this;
            this._UserService._listProject = new Array();
            this._UserService.GetAllProject(filter, idCompany, 0).subscribe(function (e) {
                _this._UserService._listProject = e.data;
                //this._cdRef.detectChanges();
            });
        };
        //GetAllUser(filter: string) {
        //  this._UserService._listUser = new Array<tblUser>();
        //  this._UserService.GetAll(filter, 0).subscribe(
        //    (e) => {
        //      this._UserService._listUser = e.data;
        //      //this._cdRef.detectChanges();
        //    }
        //  );
        //}
        AdminteUser_1.prototype.GetAllRol = function (filter) {
            var _this = this;
            this._UserService.listRolUser = new Array();
            this._UserService.GetRolsByProject(filter, 0).subscribe(function (e) {
                _this._UserService.listRolUser = e.data;
                //this._cdRef.detectChanges();
            });
        };
        //changet
        AdminteUser_1.prototype.onSelectRol = function (event) {
            var id = event.target.value;
            var existe = this._UserService.listRolUser.find(function (s) { return s.id == id; });
            if (existe != null) {
                if (this._UserService.user.rolUser.find(function (s) { return s.id == id; }) == null)
                    this._UserService.user.rolUser.push(existe);
                if (this._UserService.user.rolUserActive != null || this._UserService.user.rolUserActive == undefined)
                    this._UserService.user.rolUserActive = existe;
            }
        };
        AdminteUser_1.prototype.DeleteRol = function (id) {
            this._UserService.user.rolUser = this._UserService.user.rolUser.filter(function (s) { return s.id != id; });
        };
        AdminteUser_1.prototype.onSelectUpdateCompanyInUser = function (event) {
            var id = event.target.value;
            this._UserService._listProject = new Array;
            var company = this._UserService._listCompany.find(function (s) { return s.id == id; });
            if (company != undefined) {
                var concept = new tblProduct_1.NameConcept();
                concept.id = company.id;
                concept.name = company.name;
                this._UserService.user.idCompany = concept.id;
                this._UserService.user.conceptCompany = concept;
                this.GetAllProjectUserUpdate("all", id);
            }
        };
        AdminteUser_1.prototype.onSelectChangeCompany = function (event) {
            var id = event.target.value;
            this._UserService._listProjectFilter = new Array;
            this._UserService._listUser = new Array;
            this.GetAllProject("all", id);
        };
        AdminteUser_1.prototype.onSelectUpdateProjectInUser = function (event) {
            var id = event.target.value;
            var project = this._UserService._listProject.find(function (s) { return s.id == id; });
            if (project != undefined) {
                var concept = new tblProduct_1.NameConcept();
                concept.id = project.id;
                concept.name = project.name;
                this._UserService.user.idProject = concept.id;
                this._UserService.user.conceptProject = concept;
            }
        };
        AdminteUser_1.prototype.onSelectChangeProject = function (event) {
            var id = event.target.value;
            this.GetAllUserByProject(id);
        };
        AdminteUser_1.prototype.changedInputName = function (event, name) {
            this.LoadData();
        };
        //changet
        AdminteUser_1.prototype.GetNameProject = function (id) {
            if (!this._UserService._listProjectFilter)
                return "";
            var project = this._UserService._listProjectFilter.find(function (s) { return s.id == id; });
            if (project == undefined || project == null)
                return "";
            return project === null || project === void 0 ? void 0 : project.name;
        };
        AdminteUser_1.prototype.GetNameCompany = function (id) {
            if (this._UserService._listCompanyFilter != undefined && this._UserService._listCompanyFilter.length > 0) {
                var project = this._UserService._listCompanyFilter.find(function (s) { return s.id == id; });
                if (project == undefined || project == null)
                    return "";
                return project === null || project === void 0 ? void 0 : project.name;
            }
            return "";
        };
        AdminteUser_1.prototype.LoadData = function () {
            if (this._UserService.user == undefined)
                this._UserService.user = new RegisterModel_1.tblUser();
        };
        AdminteUser_1.prototype.Selection = function (id) {
            this._UserService.rowSelection = "";
            this._UserService.rowSelection = id;
        };
        AdminteUser_1.prototype.languageTraslate = function (value) {
            return value;
        };
        AdminteUser_1.prototype.ValidateConcept = function () {
            if (this._UserService.user.conceptCompany == undefined)
                this._UserService.user.conceptCompany = new tblProduct_1.NameConcept();
            if (this._UserService.user.conceptPrevious == undefined)
                this._UserService.user.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._UserService.user.conceptProject == undefined)
                this._UserService.user.conceptProject = new tblProduct_1.NameConcept();
            if (this._UserService.user.code == undefined)
                this._UserService.user.code = "";
            if (this._UserService.user.imgUrl == undefined)
                this._UserService.user.imgUrl = "";
            if (this._UserService.user.rolUser == undefined)
                this._UserService.user.rolUser = new Array;
            if (this._UserService.user.rolUserActive == undefined)
                this._UserService.user.rolUserActive = new RegisterModel_1.tblRol;
            if (this._UserService.user.rolUserActive.conceptCompany == undefined)
                this._UserService.user.rolUserActive.conceptCompany = new tblProduct_1.NameConcept();
            if (this._UserService.user.rolUserActive.conceptPrevious == undefined)
                this._UserService.user.rolUserActive.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._UserService.user.rolUserActive.conceptProject == undefined)
                this._UserService.user.rolUserActive.conceptProject = new tblProduct_1.NameConcept();
            if (this._UserService.user.password == null)
                this._UserService.user.password = "";
            if (this._UserService.user.keyPassword == null)
                this._UserService.user.keyPassword = "";
            if (this._UserService.user.mobileNumber == null)
                this._UserService.user.mobileNumber = "";
            if (this._UserService.user.listShoppingCart == null)
                this._UserService.user.listShoppingCart = new Array();
            if (this._UserService.user.listFavorites == undefined)
                this._UserService.user.listFavorites = new Array();
            if (this._UserService.user.listMyLikes == undefined)
                this._UserService.user.listMyLikes = new Array;
        };
        AdminteUser_1.prototype.NullProductSelectId = function (id) {
            if (this._UserService.rowSelection == "")
                return false;
            if (id != "0") {
                if (this._UserService.rowSelection == id)
                    return true;
            }
            else {
                if (this._UserService.rowSelection != "")
                    return true;
            }
            return false;
        };
        return AdminteUser_1;
    }());
    __setFunctionName(_classThis, "AdminteUser");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminteUser = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminteUser = _classThis;
}();
exports.AdminteUser = AdminteUser;
//# sourceMappingURL=app.admin-user.js.map