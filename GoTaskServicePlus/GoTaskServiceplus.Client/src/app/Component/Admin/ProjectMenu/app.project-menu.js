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
exports.ProjectMenuComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_permission_1 = require("../../Permission/app.permission");
var forms_1 = require("@angular/forms");
var ProjectMenuComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-project-menu",
            templateUrl: './app.project-menu-component.html',
            styleUrls: ['app.project-menu.css'],
            imports: [forms_1.FormsModule, common_1.CommonModule, app_permission_1.PermissionComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProjectMenuComponent = _classThis = /** @class */ (function () {
        function ProjectMenuComponent_1(_CommonService, configservice, cdRef, router, project, companyService, menu, Permission) {
            this._CommonService = _CommonService;
            this.router = router;
            this._visibleItem = 0;
            this._ListMenu = new Array;
            this._ListMenuCustomer = new Array;
            this._configservice = configservice;
            this._cdRef = cdRef;
            this._router = router;
            this._project = project;
            this._menu = menu;
            this._CompanyService = companyService;
            this._Permission = Permission;
        }
        ProjectMenuComponent_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("project-menu");
            if (status) {
                this.GetAllProject();
                this.GetAllCompany("all");
            }
        };
        ProjectMenuComponent_1.prototype.GetAllProject = function (id) {
            if (id === void 0) { id = ""; }
            this._project._listProject = new Array();
            this._project.GetAllProjectByCompany(id, 0);
            //.subscribe(
            //    (e) => {
            //      this._project._listProject = e.data;
            //      console.log(this._project._listProject);
            //      //this._cdRef.detectChanges();
            //    }
            //  );
        };
        ProjectMenuComponent_1.prototype.GetAllCompany = function (filter) {
            var _this = this;
            this._CompanyService._listCompany = new Array();
            this._CompanyService.GetAllCompanys(filter, 0).subscribe(function (e) {
                _this._CompanyService._listCompany = e.data;
                //this._cdRef.detectChanges();
            });
        };
        ProjectMenuComponent_1.prototype.SelectionCompany = function (event) {
            var id = event.target.value;
            this.GetAllProject(id);
        };
        ProjectMenuComponent_1.prototype.Prueba = function (prueba) {
            console.log("prueba", prueba);
        };
        ProjectMenuComponent_1.prototype.SelectionProject = function (project, company) {
            var _this = this;
            this._menu.UpbdateProjectActive(project, company).subscribe(function (e) {
                if (e.status) {
                    _this._CommonService._AlertService.Alert("Cambio de Sucursal realizada.");
                    _this._configservice.DeleteBeareLogin();
                    _this._CommonService._NavMenuService.StatusLogin(false);
                }
                else {
                    alert("No Guardado");
                }
            });
        };
        ProjectMenuComponent_1.prototype.Route = function (name) {
            this._router.navigate([name]);
        };
        return ProjectMenuComponent_1;
    }());
    __setFunctionName(_classThis, "ProjectMenuComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectMenuComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectMenuComponent = _classThis;
}();
exports.ProjectMenuComponent = ProjectMenuComponent;
//# sourceMappingURL=app.project-menu.js.map