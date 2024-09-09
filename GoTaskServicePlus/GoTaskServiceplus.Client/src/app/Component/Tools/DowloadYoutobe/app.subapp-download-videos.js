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
exports.DownloadVideosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var DownloadVideosComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            selector: "app-subapp-download-videos",
            templateUrl: './app.subapp-download-videos.component.html',
            styleUrls: ['app.subapp-download-videos.css'],
            imports: [forms_1.FormsModule, app_common_loading_1.LoadingComponent],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DownloadVideosComponent = _classThis = /** @class */ (function () {
        function DownloadVideosComponent_1(configservice, dowload, cdRef, titleService, loading) {
            this._msg = "";
            this.fileParts = [];
            this._statusTaskSubject = new rxjs_1.Subject();
            this.statusTask$ = this._statusTaskSubject.asObservable();
            this._progressSubject = new rxjs_1.Subject();
            this.progress$ = this._progressSubject.asObservable();
            this._configservice = configservice;
            this._dowload = dowload;
            this._titleService = titleService;
            this._Loading = loading;
        }
        DownloadVideosComponent_1.prototype.ngOnInit = function () {
            this._titleService.setTitle('Descarga Videos De Youtube');
        };
        DownloadVideosComponent_1.prototype.getInfoVideo = function (text) {
            var _this = this;
            if (text != "" && text != undefined) {
                this.Loading(true, true);
                if (text != "") {
                    var http = this._dowload.GetVideoInfo(text);
                    http.subscribe({
                        next: function (response) {
                            if (response.type == http_1.HttpEventType.DownloadProgress) {
                            }
                            else {
                                _this._video = JSON.parse(response.body.json);
                                _this._titleVideo = _this._video.Title;
                            }
                            _this.Loading(false, false);
                        },
                        error: function (err) {
                            _this.Loading(false, false);
                        }
                    });
                }
            }
            return "";
        };
        DownloadVideosComponent_1.prototype.descargarBlob = function (blobData, fileName) {
            if (fileName === void 0) { fileName = "Prueba.mp4"; }
            var options = {
                type: 'application/octet-stream'
            };
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blobData);
            link.download = fileName || 'archivo_descargado';
            // Simular clic en el enlace para iniciar la descarga
            link.click();
            // Liberar la URL del objeto Blob una vez que hayas terminado con ella
            URL.revokeObjectURL(link.href);
            this.Loading(false, false);
        };
        DownloadVideosComponent_1.prototype.dowloadVideoPartial = function (url, mode) {
            var _this = this;
            this.Loading(true, true);
            if (url != "" && url != undefined) {
                if (url != "") {
                    this._dowload.GetDowloadVideoPartial(url + "&mode=" + mode)
                        .subscribe({
                        next: function (response) {
                            var countData = Math.round((response.loaded * 100) / response.total);
                            if (response.type === http_1.HttpEventType.DownloadProgress) {
                                _this._Loading._text = countData.toString();
                            }
                            else if (response instanceof http_1.HttpResponse) {
                                var blob = new Blob([response.body]);
                                _this.descargarBlob(blob, "GotaskService_" + _this._titleVideo + "." + mode);
                            }
                        }, complete: function () {
                        },
                        error: function (err) {
                            _this.Loading(false, false);
                        }
                    });
                }
            }
            // this.dowloadVideoInfo(url, mode);
            return "";
        };
        DownloadVideosComponent_1.prototype.loadingProgress = function () {
            var _this = this;
            if (this._Isprogress) {
                if (this._progress == undefined)
                    this._progress = 0;
                console.log(this._progress);
                try {
                    setInterval(function () {
                        if (_this._progress <= 98) {
                            _this._Loading._text = (_this._progress++).toString() + "%";
                            if (_this._Isprogress) {
                                _this.loadingProgress();
                            }
                            else {
                                _this._progress = 0;
                            }
                        }
                    }, 19000);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                this._progress = 0;
            }
            this._cdRef.detectChanges();
        };
        DownloadVideosComponent_1.prototype.Loading = function (visibleLoading, _statusTask) {
            this._Loading.Loading(visibleLoading);
            this._statusTask = _statusTask;
            this._Isprogress = visibleLoading;
            console.log(this._Isprogress);
            // this._cdRef.detectChanges();
        };
        DownloadVideosComponent_1.prototype.alertSmg = function (msg, time) {
            if (time === void 0) { time = 500; }
            this.startTimer(3000); // 5000 milisegundos (5 segundos)
            this._msg = msg;
            this._cdRef.detectChanges();
        };
        DownloadVideosComponent_1.prototype.startTimer = function (milliseconds) {
            var _this = this;
            var r = setTimeout(function () {
                _this.closeAlert();
            }, milliseconds);
        };
        DownloadVideosComponent_1.prototype.stopTimer = function (id) {
            // Detén el temporizador si está en ejecución
            if (false) {
                // this.clearTimeout(id);
            }
        };
        DownloadVideosComponent_1.prototype.closeAlert = function () {
            this._msg = "";
        };
        return DownloadVideosComponent_1;
    }());
    __setFunctionName(_classThis, "DownloadVideosComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DownloadVideosComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DownloadVideosComponent = _classThis;
}();
exports.DownloadVideosComponent = DownloadVideosComponent;
//# sourceMappingURL=app.subapp-download-videos.js.map