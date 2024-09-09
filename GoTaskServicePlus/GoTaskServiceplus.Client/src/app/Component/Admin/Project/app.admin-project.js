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
exports.CreateProject = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var Admin_1 = require("../../../Models/Admin/Admin");
var CreateProject = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-admin-project',
            templateUrl: 'app.admin-project.component.html',
            styleUrls: ['app.admin-project.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CreateProject = _classThis = /** @class */ (function () {
        function CreateProject_1(configservice, http, cdRef, Permission, router) {
            this.router = router;
            this._configservice = configservice;
            this._projectService = http;
            this._cdRef = cdRef;
            this._Permission = Permission;
        }
        CreateProject_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("admin-project");
            if (status) {
                // this.GetListAdressConcept(TypeConcepValue.AdressConcept());
                this.GetAllCompany("all");
            }
        };
        CreateProject_1.prototype.Delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var rest;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._projectService.Delete(id).subscribe(function (e) {
                                if (e.status) {
                                    _this.DeleteList(id);
                                    alert("Eliminado");
                                }
                                else {
                                    alert("No Eliminado");
                                }
                            })];
                        case 1:
                            rest = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CreateProject_1.prototype.Edit = function (id) {
            var _this = this;
            this.GetListAdressConcept(tblProduct_1.TypeConcepValue.AdressConcept(), id);
            this._projectService.GetProjectById(id).subscribe(function (e) {
                _this._projectService._project = e.data;
                /* this._cdRef.detectChanges();*/
            });
        };
        CreateProject_1.prototype.SaveAndUpdateProject = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("Save", this._projectService._project);
                    console.log("addressItemId", this._projectService._project.addressItemId);
                    if (this._projectService._project.addressItemId == "")
                        this._projectService._project.addressItemId = "00000000-0000-0000-0000-000000000000";
                    if (this._projectService._project.id == "00000000-0000-0000-0000-000000000000") {
                        this.SavedProject();
                    }
                    else {
                        this.UpdateProject();
                    }
                    return [2 /*return*/];
                });
            });
        };
        CreateProject_1.prototype.UpdateProject = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.ValidateConcept();
                    this._projectService.Upbdate(this._projectService._project)
                        .subscribe(function (e) {
                        if (e.status) {
                            _this._projectService._listProject = _this._projectService._listProject.filter(function (s) { return s.id != _this._projectService._project.id; });
                            _this._projectService._listProject.push(e.data);
                            _this._projectService._project = new Admin_1.tblProject();
                            ;
                            _this._cdRef.detectChanges();
                            alert("Actualizado");
                        }
                        else {
                            alert("No Actualizado");
                        }
                    });
                    return [2 /*return*/];
                });
            });
        };
        CreateProject_1.prototype.SavedProject = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.ValidateConcept();
                    this._projectService.Saved(this._projectService._project)
                        .subscribe(function (e) {
                        if (e.status) {
                            _this._projectService._listProject.push(e.data);
                            _this._projectService._project = new Admin_1.tblProject();
                            _this._cdRef.detectChanges();
                            alert("guardado");
                        }
                        else {
                            alert("No guardado");
                        }
                    });
                    return [2 /*return*/];
                });
            });
        };
        CreateProject_1.prototype.onSelectChangeAdress = function (event) {
            var id = event.target.value;
            if (this._projectService._project == undefined)
                this._projectService._project = new Admin_1.tblProject();
            if (id != "0") {
                var adress = this._projectService.adressList.find(function (s) { return s.id == id; });
                if (adress == undefined || adress == null)
                    return false;
                this._projectService._project.addressItemId = adress.id;
            }
            return true;
        };
        CreateProject_1.prototype.GetCompany = function (project) {
            if (this._projectService._listCompany != undefined) {
                var company = this._projectService._listCompany.find(function (s) { return s.id == project.idCompany; });
                return company != undefined ? company.name : "..";
            }
            return "";
        };
        CreateProject_1.prototype.GetListAdressConcept = function (type, idProject) {
            var _this = this;
            this._projectService.adressList = new Array();
            var result = this._projectService.GetAdminAllConceptByIdProject("all", type, 0, idProject);
            result.subscribe(function (e) {
                _this._projectService.adressList = e.data;
            });
        };
        CreateProject_1.prototype.GetAllProject = function (filter, idCompany) {
            var _this = this;
            this._projectService._listProject = new Array();
            this._projectService.GetAllProject(filter, idCompany, 0).subscribe(function (e) {
                _this._projectService._listProject = e.data;
                //this._cdRef.detectChanges();
            });
        };
        CreateProject_1.prototype.GetAllCompany = function (filter) {
            var _this = this;
            this._projectService._listCompany = new Array();
            this._projectService.GetAllCompanys(filter, 0).subscribe(function (e) {
                _this._projectService._listCompany = e.data;
                //this._cdRef.detectChanges();
            });
        };
        CreateProject_1.prototype.DeleteList = function (id) {
            var index = this._projectService._listProject.findIndex(function (item) { return item.id === id; });
            if (index !== -1) {
                this._projectService._listProject.splice(index, 1);
                // this._cdRef.detectChanges();
            }
        };
        CreateProject_1.prototype.onSelectChangeHorEnd = function (event) {
            var id = event.target.value;
            this._projectService._project.storeClosingTime = id;
        };
        CreateProject_1.prototype.onSelectChangeHorStart = function (event) {
            var id = event.target.value;
            this._projectService._project.storeOpeningTime = id;
        };
        CreateProject_1.prototype.onSelectChangeCompany = function (event) {
            var id = event.target.value;
            var company = this._projectService._listCompany.find(function (s) { return s.id == id; });
            if (company != undefined) {
                var concept = new tblProduct_1.NameConcept();
                concept.id = company.id;
                concept.name = company.name;
                this._projectService._project.conceptCompany = concept;
                this._projectService._project.idCompany = concept.id;
            }
        };
        CreateProject_1.prototype.onSelectChangeFilterByCompany = function (event) {
            var id = event.target.value;
            this.GetAllProject("all", id);
        };
        CreateProject_1.prototype.onSelectChangeTypeProject = function (event) {
            var id = event.target.value;
            if (id != "" && id != 0) {
                this._projectService._project.typeCompanyMode = id;
            }
        };
        CreateProject_1.prototype.GetProjectAdressName = function (id) {
            var data = this._projectService.adressList.find(function (s) { return s.id == id; });
            return ((data === null || data === void 0 ? void 0 : data.concept.name) + " " + (data === null || data === void 0 ? void 0 : data.name));
        };
        CreateProject_1.prototype.Selection = function (id) {
            this._rowSeletion = id;
            this._cdRef.detectChanges();
        };
        CreateProject_1.prototype.languageTraslate = function (value) {
            return value;
        };
        CreateProject_1.prototype.ValidateConcept = function () {
            if (this._projectService._project.conceptCompany == undefined)
                this._projectService._project.conceptCompany = new tblProduct_1.NameConcept();
            if (this._projectService._project.conceptPrevious == undefined)
                this._projectService._project.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._projectService._project.conceptProject == undefined)
                this._projectService._project.conceptProject = new tblProduct_1.NameConcept();
            if (this._projectService._project.addressItemId == "")
                this._projectService._project.addressItemId = "";
        };
        CreateProject_1.prototype.Route = function (url) {
            window.open(url, '_blank');
        };
        return CreateProject_1;
    }());
    __setFunctionName(_classThis, "CreateProject");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateProject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateProject = _classThis;
}();
exports.CreateProject = CreateProject;
//# sourceMappingURL=app.admin-project.js.map