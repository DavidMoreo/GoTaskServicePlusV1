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
exports.ConceptProductControl = void 0;
var core_1 = require("@angular/core");
var tblProduct_1 = require("../../../Models/Structure/tblProduct");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var ConceptProductControl = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-product-concept',
            templateUrl: 'app.product-concept.component.html',
            styleUrls: ['app.product-concept.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConceptProductControl = _classThis = /** @class */ (function () {
        function ConceptProductControl_1(configservice, http, cdRef, Permission) {
            this._concept = new tblProduct_1.tblConcepValue();
            this._tab = "country";
            this._configservice = configservice;
            this._http = http;
            this._cdRef = cdRef;
            this._Permission = Permission;
        }
        ConceptProductControl_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("conceptual-product");
            this._concept.type = tblProduct_1.TypeConcepValue.CoutryConcept();
            if (status) {
                this.GetListConcept(tblProduct_1.TypeConcepValue.CoutryConcept());
            }
        };
        ConceptProductControl_1.prototype.changedInputName = function (event, name) {
            if (this._concept == undefined)
                this._concept = new tblProduct_1.tblConcepValue();
            this._concept.name = event.target.value;
            if (this._concept.value == "" || this._concept.value == undefined)
                this._concept.value = event.target.value;
            this._cdRef.detectChanges();
        };
        ConceptProductControl_1.prototype.changedInputValue = function (event, name) {
            this._concept.value = event.target.value;
        };
        ConceptProductControl_1.prototype.changedSelectCountry = function (event) {
            var _this = this;
            this._concept.concept = new tblProduct_1.NameConcept();
            this._concept.concept.id = event.target.value;
            var item = this._http._contryList.find(function (s) { return s.id == _this._concept.concept.id; });
            if (item != undefined) {
                this._concept.concept.name = item.name;
            }
        };
        ConceptProductControl_1.prototype.GetConceptValue = function (value, name) {
            var result = "N/A";
            if (value != null) {
                var data = value;
                if (value != undefined) {
                    if (name == "name")
                        result = data.name;
                }
            }
            return result;
        };
        ConceptProductControl_1.prototype.DeleteConcept = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var rest;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._http.DeleteConcept(id).subscribe(function (e) {
                                if (e.status) {
                                    _this.DeleteConceptList(id);
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
        ConceptProductControl_1.prototype.ChangedIsPublic = function (mode) {
            this._concept.isPublic = mode;
            this._cdRef.detectChanges();
        };
        ConceptProductControl_1.prototype.Edit = function (id) {
            var _this = this;
            this._http.GetListById(id).subscribe(function (e) {
                _this._concept = e.data;
                /* this._cdRef.detectChanges();*/
            });
        };
        ConceptProductControl_1.prototype.SaveAndUpdateConcept = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.ValidateConcept();
                            return [4 /*yield*/, this._http.SaveAndUpdateConcept(this._concept)
                                    .subscribe(function (e) {
                                    if (e.status) {
                                        _this._http._conceptList.push(e.data);
                                        _this._cdRef.detectChanges();
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
        ConceptProductControl_1.prototype.GetListConcept = function (type) {
            var _this = this;
            this._http._conceptList = new Array();
            this._http.GetListByName("all", type, 0).subscribe(function (e) {
                _this._http._conceptList = e.data;
                _this._cdRef.detectChanges();
            });
        };
        ConceptProductControl_1.prototype.GetListConceptCountry = function (type, page) {
            var _this = this;
            this._http._conceptList = new Array();
            this._http.GetListByName("ALL", type, 0).subscribe(function (e) {
                _this._http._contryList = e.data;
                _this._cdRef.detectChanges();
            });
        };
        ConceptProductControl_1.prototype.DeleteConceptList = function (id) {
            var index = this._http._conceptList.findIndex(function (item) { return item.id === id; });
            if (index !== -1) {
                this._http._conceptList.splice(index, 1);
                // this._cdRef.detectChanges();
            }
        };
        ConceptProductControl_1.prototype.pageTab = function (mode) {
            this._concept = new tblProduct_1.tblConcepValue();
            this._tab = mode;
            this.changeType(mode);
        };
        ConceptProductControl_1.prototype.changeType = function (name) {
            if (name == "country") {
                this._concept.type = tblProduct_1.TypeConcepValue.CoutryConcept();
            }
            if (name == "city") {
                this._concept.type = tblProduct_1.TypeConcepValue.CityConcept();
                this.loadCityData(tblProduct_1.TypeConcepValue.CoutryConcept());
            }
            if (name == "delivery") {
                this._concept.type = tblProduct_1.TypeConcepValue.DeliveryModeConcept();
            }
            if (name == "status") {
                this._concept.type = tblProduct_1.TypeConcepValue.StatusProductConcept();
            }
            if (name == "available") {
                this._concept.type = tblProduct_1.TypeConcepValue.AvailableDayConcept();
            }
            if (name == "typeProduct") {
                this._concept.type = tblProduct_1.TypeConcepValue.TypeProduct();
            }
            this.GetListConcept(this._concept.type);
        };
        ConceptProductControl_1.prototype.loadCityData = function (mode) {
            this.GetListConceptCountry(mode, 0);
        };
        ConceptProductControl_1.prototype.Selection = function (id) {
            this._rowSeletion = id;
            this._cdRef.detectChanges();
        };
        ConceptProductControl_1.prototype.languageTraslate = function (value) {
            return value;
        };
        ConceptProductControl_1.prototype.ValidateConcept = function () {
            if (this._concept.conceptCompany == undefined)
                this._concept.conceptCompany = new tblProduct_1.NameConcept();
            if (this._concept.conceptPrevious == undefined)
                this._concept.conceptPrevious = new tblProduct_1.NameConcept();
            if (this._concept.conceptProject == undefined)
                this._concept.conceptProject = new tblProduct_1.NameConcept();
            if (this._concept.concept == undefined)
                this._concept.concept = new tblProduct_1.NameConcept();
        };
        return ConceptProductControl_1;
    }());
    __setFunctionName(_classThis, "ConceptProductControl");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConceptProductControl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConceptProductControl = _classThis;
}();
exports.ConceptProductControl = ConceptProductControl;
//# sourceMappingURL=app.product-concept.js.map