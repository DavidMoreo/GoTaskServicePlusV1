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
exports.VendorUpdateProduct = void 0;
var core_1 = require("@angular/core");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_permission_1 = require("../../Permission/app.permission");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var app_common_loading_partial_1 = require("../../Common/LoadingPartial/app.common-loading-partial");
var app_common_menu_grid_1 = require("../../Common/MenuGrid/app.common-menu-grid");
var app_custom_control_grid_1 = require("../../Common/CustomControl/Grid/app.custom-control-grid");
var VendorUpdateProduct = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: 'app-vendor-active-product',
            templateUrl: 'app.product-vendor-update-product.component.html',
            styleUrls: ['app.product-vendor-update-product.css'],
            imports: [app_common_loading_1.LoadingComponent, app_permission_1.PermissionComponent, forms_1.FormsModule, common_1.CommonModule, app_common_loading_partial_1.LoadingPartialComponent, app_common_menu_grid_1.MenuGridComponent, app_custom_control_grid_1.GridComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VendorUpdateProduct = _classThis = /** @class */ (function () {
        function VendorUpdateProduct_1(route, configservice, _Permission, _util, _ProductService) {
            this.route = route;
            this._Permission = _Permission;
            this._util = _util;
            this.counHttp = 0;
            this.limitHttp = 3;
            this.filter = "all";
            this.type = "all";
            this.page = 0;
            this._Configservice = configservice;
            this._ProductService = _ProductService;
        }
        VendorUpdateProduct_1.prototype.ngOnInit = function () {
            var status = this._Permission.ValidationLogin("app-vendor-active-product");
            if (status) {
                this.loadPoduct();
            }
        };
        VendorUpdateProduct_1.prototype.loadPoduct = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.ReloadHttp();
                    this._ProductService.GetListStatusConcept();
                    this._ProductService.GetAllProduct(this.filter, this.type, this.page);
                    return [2 /*return*/];
                });
            });
        };
        VendorUpdateProduct_1.prototype.Edit = function (id) {
            var _this = this;
            this._ProductService.SetLoading(true);
            this._ProductService.GetProductById(id).subscribe(function (e) {
                if (e.status) {
                    _this.StastusProduct(e.data);
                }
            });
        };
        VendorUpdateProduct_1.prototype.StastusProduct = function (product) {
            var privateConcept = this._ProductService._statusList.find(function (s) { return s.value == "private"; });
            var statusPrivate = this._util.GetNameConcept(privateConcept === null || privateConcept === void 0 ? void 0 : privateConcept.name, privateConcept === null || privateConcept === void 0 ? void 0 : privateConcept.value, privateConcept === null || privateConcept === void 0 ? void 0 : privateConcept.id);
            var publicConcept = this._ProductService._statusList.find(function (s) { return s.value == "public"; });
            var statusPublic = this._util.GetNameConcept(publicConcept === null || publicConcept === void 0 ? void 0 : publicConcept.name, publicConcept === null || publicConcept === void 0 ? void 0 : publicConcept.value, publicConcept === null || publicConcept === void 0 ? void 0 : publicConcept.id);
            if (product.isPublic) {
                product.status = statusPrivate;
            }
            else {
                product.status = statusPublic;
            }
            product.isPublic = ((product === null || product === void 0 ? void 0 : product.status.value) == "public");
            this._ProductService.UpdateProduct(product);
        };
        VendorUpdateProduct_1.prototype.ProductNotNull = function (product) {
            if (product == undefined)
                return false;
            if (product == null)
                return false;
            return true;
        };
        //Mostrar para editar fin
        VendorUpdateProduct_1.prototype.OnselectStatus = function (event) {
            var id = event.target.value;
            var selected = this._ProductService._statusList.find(function (s) { return s.id == id; });
            if (id != undefined && id != "0") {
                this._ProductService.product.status =
                    this._util.GetNameConcept(selected === null || selected === void 0 ? void 0 : selected.name, selected === null || selected === void 0 ? void 0 : selected.value, selected === null || selected === void 0 ? void 0 : selected.id);
                this._ProductService.product.isPublic = ((selected === null || selected === void 0 ? void 0 : selected.value) == "public");
            }
        };
        VendorUpdateProduct_1.prototype.GetPrduct = function () {
            return this._ProductService.listProduct;
        };
        VendorUpdateProduct_1.prototype.GetListNull = function () {
            if (this.GetPrduct() == null || this.GetPrduct().length <= 0)
                return true;
            return false;
        };
        VendorUpdateProduct_1.prototype.GetLoading = function () {
            return this._ProductService.loadingStatus;
        };
        VendorUpdateProduct_1.prototype.ReloadHttp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timer;
                var _this = this;
                return __generator(this, function (_a) {
                    this.counHttp++;
                    if (this.counHttp <= this.limitHttp) {
                        timer = setInterval(function () {
                            if (_this.GetListNull()) {
                                clearInterval(timer);
                                _this.loadPoduct();
                            }
                            else
                                clearInterval(timer);
                        }, 10000);
                    }
                    return [2 /*return*/];
                });
            });
        };
        VendorUpdateProduct_1.prototype.GetUrl = function (imgName) {
            return this._Configservice.GetUrlImgItem(imgName, "PHONE");
        };
        VendorUpdateProduct_1.prototype.languageTraslate = function (value) {
            return value;
        };
        return VendorUpdateProduct_1;
    }());
    __setFunctionName(_classThis, "VendorUpdateProduct");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VendorUpdateProduct = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VendorUpdateProduct = _classThis;
}();
exports.VendorUpdateProduct = VendorUpdateProduct;
//# sourceMappingURL=app.product-vendor-update-product.js.map