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
exports.SearchProductService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SearchProductService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SearchProductService = _classThis = /** @class */ (function () {
        function SearchProductService_1(http, host, loading) {
            this.http = http;
            this.host = host;
            this._listProduct = new Array;
            this._statust = false;
            this._listProductIA = new Array;
            this._statustIA = false;
            this.pageActive = 1;
            this.pageTotal = 0;
            this.pageActiveIA = 1;
            this.pageTotalIA = 1;
            this.listBotAvailable = false;
            this.isBotActive = false;
            this.loadingPageGo = false;
            this.lisConceptCategory = new Array();
            this.type = "00000000-0000-0000-0000-000000000000";
            this.counHttp = 0;
            this.limitHttp = 10;
            this._host = host;
            this._http = http;
            this._loading = loading;
        }
        SearchProductService_1.prototype.GetAllProduct = function (filter, page) {
            var _this = this;
            this.filterTemp = filter;
            this.loadingPageGo = true;
            var result = this._http.get(this._host.GetHostApi() + "Product/GetProductByName?filter=".concat(filter, "&typeId=").concat(this.type, "&page=").concat(page));
            try {
                /*      this.isBotActive = false;*/
                result.subscribe({
                    next: function (e) {
                        if (_this._listProduct == undefined || _this._listProduct == null || _this._listProduct.length <= 0) {
                            _this._listProduct = e.data;
                        }
                        else {
                            var temp = new Array();
                            temp = e.data;
                            temp.forEach(function (e) {
                                _this._listProduct.push(e);
                            });
                        }
                        //if (e.data != null && e.data.length <= 0)
                        //  this._loading.Loading(false);
                        _this.pageTotal = e.pages;
                        _this.loadingPageGo = false;
                        _this._statust = true;
                        //if (this._listProduct.length <= 0) {
                        //  this.isBotActive = true;
                        //} else {
                        //}
                        _this._loading.Loading(false);
                        _this.pageActive++;
                        _this.pageActiveIA++;
                    },
                    error: function (error) {
                        _this.ReloadHttp();
                    }
                });
                return result;
            }
            catch (e) {
                this._loading.Loading(false);
                this._statust = true;
                return new rxjs_1.Observable;
            }
        };
        SearchProductService_1.prototype.GetAllProductIA = function (filter, page) {
            this.loadingPageGo = true;
            this._loading._loadingPartial = false;
            var result = this._http.get(this._host.GetHostApi() + "Product/GetProductByNameIA?filter=".concat(filter, "&type=").concat(this.type, "&page=").concat(page));
            //result.subscribe({
            //  next: (e) => {
            //    if (this._listProductIA == undefined || this._listProductIA == null || this._listProductIA.length <= 0) {
            //      this._listProductIA = e.data;
            //    }
            //    else {
            //      var temp = new Array();
            //      temp = e.data;
            //      temp.forEach((e) => {
            //        this._listProductIA.push(e);
            //      })
            //    }
            //    this.loadingPageGo = false;
            //    this.pageTotal = e.pages;
            //    if (this._listProductIA.length <= 0) {
            //      this.isBotActive = false;
            //    }
            //    this._loading.Loading(false);
            //    this._loading._loadingPartial = true;
            //    if (this._listProductIA != null && this._listProductIA.length > 0) this.listBotAvailable = true;
            //    this.limitHttp = 0;
            //  },
            //  error: (error) => {
            //    this.ReloadHttp();
            //  }
            //});
            return result;
        };
        SearchProductService_1.prototype.SetTypeProduct = function (type) {
            this.type = type;
            this.filterTemp = "all";
            this.isBotActive = false;
            this.FilterProduct();
        };
        SearchProductService_1.prototype.SetType = function (type) {
            this.type = type;
            this.filterTemp = "all";
        };
        SearchProductService_1.prototype.GetType = function () {
            return this.type;
        };
        SearchProductService_1.prototype.GetAllCategory = function () {
            var _this = this;
            var result = this._http.get(this._host.GetHostApi() + "Product/GetAllCategoryList");
            try {
                result.subscribe({
                    next: function (e) {
                        _this.lisConceptCategory = e.data;
                    },
                    error: function (error) {
                        _this.ReloadHttp();
                    }
                });
                return result;
            }
            catch (e) {
                this._loading.Loading(false);
                this._statust = true;
                return new rxjs_1.Observable;
            }
        };
        SearchProductService_1.prototype.ReloadModel = function () {
            this._listProductIA = new Array();
            this._listProduct = new Array();
            this.pageActive = 0;
            this.pageActiveIA = 0;
        };
        SearchProductService_1.prototype.FilterProduct = function () {
            this.ReloadModel();
            if (this.isBotActive) {
                this.GetAllProductIA(this.filterTemp, this.pageActiveIA);
            }
            else {
                this.GetAllProduct(this.filterTemp, this.pageActiveIA);
            }
        };
        SearchProductService_1.prototype.ReloadHttp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timer;
                var _this = this;
                return __generator(this, function (_a) {
                    this.counHttp++;
                    if (this.counHttp <= this.limitHttp) {
                        timer = setInterval(function () {
                            clearInterval(timer);
                            if (_this.isBotActive) {
                                _this.GetAllProductIA(_this.filterTemp, _this.pageActiveIA);
                            }
                            else {
                                _this.GetAllProduct(_this.filterTemp, _this.pageActiveIA);
                            }
                        }, (10000 + (this.counHttp * 100)));
                    }
                    return [2 /*return*/];
                });
            });
        };
        return SearchProductService_1;
    }());
    __setFunctionName(_classThis, "SearchProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SearchProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchProductService = _classThis;
}();
exports.SearchProductService = SearchProductService;
//# sourceMappingURL=SeaarchProductService.js.map