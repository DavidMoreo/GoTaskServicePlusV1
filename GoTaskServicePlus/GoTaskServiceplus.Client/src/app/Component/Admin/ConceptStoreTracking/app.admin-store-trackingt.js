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
exports.ConceptStoreTrackingControl = void 0;
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var core_1 = require("@angular/core");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var app_custom_control_btn_on_off_1 = require("../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off");
var ConceptStoreTrackingControl = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-admin-store-tracking',
            templateUrl: 'app.admin-store-tracking.component.html',
            styleUrls: ['app.admin-store-tracking.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent, app_custom_control_btn_on_off_1.BtnOnOffComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConceptStoreTrackingControl = _classThis = /** @class */ (function () {
        function ConceptStoreTrackingControl_1(Permission, _Concept, _CommonService) {
            this._CommonService = _CommonService;
            this._Permission = Permission;
            this._Concept = _Concept;
        }
        ConceptStoreTrackingControl_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("store-tracking");
            this._Concept.concept.type = tblProduct_1.TypeConcepValue.ConceptStoreTracking();
            this._Concept.concept.isPublic = false;
            if (status) {
                this.GetListConcept(tblProduct_1.TypeConcepValue.ConceptStoreTracking());
            }
        };
        ConceptStoreTrackingControl_1.prototype.DeleteConcept = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var rest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._Concept.DeleteConcept(id).subscribe(function (e) {
                                if (e.status) {
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
        ConceptStoreTrackingControl_1.prototype.ChangedIsPublic = function (mode) {
            this._Concept.concept.isPublic = mode;
        };
        ConceptStoreTrackingControl_1.prototype.ChangedStatus = function (mode) {
            this._Concept.concept.disable = mode;
        };
        ConceptStoreTrackingControl_1.prototype.Edit = function (id) {
            this._Concept.GetListById(id);
        };
        ConceptStoreTrackingControl_1.prototype.SaveAndUpdateConcept = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ValidateConcept();
                            return [4 /*yield*/, this._Concept.SaveAndUpdateConcept(this._Concept.concept)
                                    .subscribe(function (e) {
                                    if (e.status) {
                                        _this._Concept.conceptList.push(e.data);
                                    }
                                    else {
                                        alert("No guardado");
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ConceptStoreTrackingControl_1.prototype.GetListConcept = function (type, filter) {
            if (filter === void 0) { filter = "all"; }
            this._Concept.conceptList = new Array();
            this._Concept.GetListByName(filter, type, 0);
        };
        ConceptStoreTrackingControl_1.prototype.GetConceptList = function () {
            return this._Concept.conceptList;
        };
        ConceptStoreTrackingControl_1.prototype.GetRowSelect = function () {
            if (!this._Concept.rowSeletion)
                return "";
            return this._Concept.rowSeletion.id;
        };
        ConceptStoreTrackingControl_1.prototype.GetConcept = function () {
            return this._Concept.concept;
        };
        ConceptStoreTrackingControl_1.prototype.LoadGps = function () {
            this._Concept.LoadGps();
        };
        ConceptStoreTrackingControl_1.prototype.ClearData = function (id) {
            this._Concept.ClearData();
        };
        ConceptStoreTrackingControl_1.prototype.Delete = function (id) {
            this._Concept.DeleteConcept(id);
        };
        ConceptStoreTrackingControl_1.prototype.ChangeMenu = function (id) {
        };
        ConceptStoreTrackingControl_1.prototype.pageTab = function (mode) {
            this.changeType(mode);
        };
        ConceptStoreTrackingControl_1.prototype.changeType = function (name) {
            this._Concept.concept.type = tblProduct_1.TypeConcepValue.ConceptStoreTracking();
        };
        ConceptStoreTrackingControl_1.prototype.FilterProduct = function (value) {
            this.GetListConcept(tblProduct_1.TypeConcepValue.ConceptStoreTracking(), value);
        };
        ConceptStoreTrackingControl_1.prototype.FilterCancel = function (id) {
            this.GetListConcept(tblProduct_1.TypeConcepValue.ConceptStoreTracking());
        };
        ConceptStoreTrackingControl_1.prototype.Selection = function (item) {
            this._Concept.rowSeletion = item;
        };
        ConceptStoreTrackingControl_1.prototype.NullProductSelectId = function (id) {
            if (this._Concept.rowSeletion == undefined)
                return false;
            if (this._Concept.rowSeletion.id == this._CommonService._UtilitiService.GuidEmpty())
                return false;
            if (this._Concept.rowSeletion.id == this._Concept.rowSeletion.id)
                return true;
            return false;
        };
        ConceptStoreTrackingControl_1.prototype.GetMap = function (item) {
            var cordinates = item.value;
            if (!cordinates)
                return "";
            return cordinates.replace("lat:", "").replace("lng:", "");
            //"https://www.google.com/maps/search/4.7156132,-74.2234972?sa=X"
        };
        ConceptStoreTrackingControl_1.prototype.languageTraslate = function (value) {
            return value;
        };
        ConceptStoreTrackingControl_1.prototype.ValidateConcept = function () {
            if (this._Concept.concept.conceptCompany == undefined)
                this._Concept.concept.conceptCompany = new tblProduct_1.NameConcept();
            if (this._Concept.concept.conceptPrevious == undefined)
                this._Concept.concept.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._Concept.concept.conceptProject == undefined)
                this._Concept.concept.conceptProject = new tblProduct_1.NameConcept();
            if (this._Concept.concept.concept == undefined)
                this._Concept.concept.concept = new tblProduct_1.NameConcept();
        };
        return ConceptStoreTrackingControl_1;
    }());
    __setFunctionName(_classThis, "ConceptStoreTrackingControl");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConceptStoreTrackingControl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConceptStoreTrackingControl = _classThis;
}();
exports.ConceptStoreTrackingControl = ConceptStoreTrackingControl;
//# sourceMappingURL=app.admin-store-trackingt.js.map