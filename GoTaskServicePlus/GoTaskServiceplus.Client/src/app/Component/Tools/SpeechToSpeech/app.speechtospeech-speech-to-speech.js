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
exports.SpeechToSpeechComponent = void 0;
var core_1 = require("@angular/core");
var Language_1 = require("../../../Models/Lenguage/Language");
var SpeechTextModel_1 = require("../../../Models/SubApp/SpeechText/SpeechTextModel");
var forms_1 = require("@angular/forms");
var app_common_loading_1 = require("../../Common/Loading/app.common-loading");
var app_itemchat_item_chat_1 = require("./common/ItemChat/app.itemchat-item-chat");
var SpeechToSpeech_1 = require("../../../Models/SubApp/SpeechToSpeech/SpeechToSpeech");
var SpeechToSpeechComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            standalone: true,
            imports: [forms_1.FormsModule, app_common_loading_1.LoadingComponent, app_itemchat_item_chat_1.ItemChatComponent],
            selector: "app-speech-to-speech",
            templateUrl: './app.speechtospeech-speech-to-speech.component.html',
            styleUrls: ['app.speechtospeech-speech-to-speech.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SpeechToSpeechComponent = _classThis = /** @class */ (function () {
        function SpeechToSpeechComponent_1(configservice, _file, cdRef, titleService, _utiliti, fb, SpeechRecognition, SpeechToSpeechService) {
            this.fb = fb;
            this._visibleBtn = true;
            this._speechStop = false;
            this._item = new SpeechToSpeech_1.LanguageSpeech();
            this._counPage = 0;
            this._msg = "";
            this._listVoiceView = new Array();
            this.statusSpeech = false;
            this._listMemory = Array();
            this._visibleLoading = false;
            this.isUserSpeaking = false;
            this._configservice = configservice;
            this._cdRef = cdRef;
            this._titleService = titleService;
            this._utiliti = _utiliti;
            this._SpeechRecognition = SpeechRecognition;
            this._SpeechToSpeechService = SpeechToSpeechService;
            this.searchForm = this.fb.group({
                searchText: ['', forms_1.Validators.required],
            });
        }
        SpeechToSpeechComponent_1.prototype.ngAfterViewInit = function () {
            this.LoadDataAfterView();
        };
        SpeechToSpeechComponent_1.prototype.ngOnInit = function () {
            this.saveLocalStorage("speechPageSpeech", "0");
            console.log(this._item);
            this.loadngOnInit();
            this.pageGoStart();
        };
        SpeechToSpeechComponent_1.prototype.loadngOnInit = function () {
            this._titleService.setTitle('Aprender inglés');
            var lan = new Language_1.Language();
            lan.language = "Español";
            lan.value = "en-US";
            //this.listLanguage = new Language();
            //this.listLanguage.push(lan);
            this.getListSpeech();
            var recognition = new window.webkitSpeechRecognition();
            this.initVoiceInput();
            this.loadMemory();
        };
        SpeechToSpeechComponent_1.prototype.LoadDataAfterView = function () {
            var _this = this;
            var synth = window.speechSynthesis;
            synth.onvoiceschanged = function () {
                _this._listVoice = window.speechSynthesis.getVoices();
                _this._listVoice.forEach(function (elemet) {
                    if (elemet.localService) {
                        var voice = new SpeechTextModel_1.Voice();
                        voice.name = elemet.name;
                        voice.id = _this._listVoiceView.length + 1;
                        _this._listVoiceView.push(voice);
                        console.log(elemet.name);
                    }
                });
            };
        };
        SpeechToSpeechComponent_1.prototype.speech = function (value) {
            var _this = this;
            this.stopRecording();
            var lang = window.localStorage.getItem("languageSpeech");
            if (lang != undefined) {
                if (lang != "") {
                    this._listVoice.forEach(function (elemet) {
                        if (lang == elemet.name) {
                            _this._selectedVoice = elemet;
                        }
                    });
                }
                console.log(this._listMemory);
            }
            this.statusSpeech = true;
            if (value != "" && value != undefined) {
                try {
                    this.statusSpeech = false;
                    this.texSpeech = value;
                    var item = new SpeechSynthesisUtterance();
                    item.text = this.texSpeech;
                    item.volume = 1; // Establecer el volumen al máximo (rango de 0 a 1)
                    item.rate = 0.6; // Establecer la velocidad de lectura (rango de 0.1 a 10)
                    item.pitch = 0.7; // Establecer el tono de voz (rango de 0 a 2)
                    if (this._selectedVoice != null) {
                        item.voice = this._selectedVoice;
                    }
                    item.onend = function () {
                        _this.statusSpeech = false;
                        _this.speechCancel();
                        console.log("Terminado : " + item);
                    };
                    if (item.text == "undefined" || item.text == null) {
                        item.text = "Lectura finalizada";
                    }
                    speechSynthesis.speak(item);
                    item.onresume = function () {
                        console.log("onresume : " + " " + " " + " ");
                    };
                    item.onerror = function () {
                        console.log("error : " + " ");
                    };
                    item.onboundary = function () {
                        console.log("fin : " + " " + " ");
                    };
                    if (speechSynthesis.speaking || speechSynthesis.pending) {
                        this.statusSpeech = true;
                        this._visibleBtn = false;
                    }
                }
                catch (e) {
                    console.log("Error : " + e);
                    this.alertSmg("No se puede continuar");
                    this.statusSpeech = false;
                }
            }
            this._cdRef.detectChanges();
        };
        SpeechToSpeechComponent_1.prototype.modeSpeechLang = function (event) {
            var _this = this;
            if (this._listVoice == undefined || this._listVoice.length > 0)
                this.LoadDataAfterView();
            this._listVoiceView = new Array();
            var voice = new SpeechTextModel_1.Voice();
            this._listVoice.forEach(function (elemet) {
                voice = new SpeechTextModel_1.Voice();
                if (event.target.value == "todos") {
                    voice.name = elemet.name;
                    voice.id = _this._listVoiceView.length + 1;
                    _this._listVoiceView.push(voice);
                }
                else {
                    if (elemet.localService) {
                        _this._listVoiceView.push(voice);
                    }
                }
            });
            this._cdRef.detectChanges();
            this.alertSmg("realizado");
        };
        SpeechToSpeechComponent_1.prototype.pageGo = function (mode) {
            var _this = this;
            if (mode == "+" && this._ItemLanguage.ListLanguageText.length > this._counPage) {
                this._counPage++;
            }
            else if (mode == "-" && this._counPage > 0) {
                this._counPage--;
            }
            var coun = 0;
            this._ItemLanguage.ListLanguageText.forEach(function (s) {
                if (coun == _this._counPage) {
                    _this._item = s;
                }
                coun++;
            });
            this._textrecognition = "";
            this._cdRef.detectChanges();
            this.saveLocalStorage("speechPageSpeech", this._counPage + "");
            console.log("List", this._counPage);
            this._cdRef.detectChanges();
        };
        SpeechToSpeechComponent_1.prototype.pageGoStart = function () {
            var _this = this;
            var level = this.getMemory("speechPageSpeech");
            level.then(function (d) {
                _this._counPage = parseInt(d);
            }, function (error) {
                _this._counPage = 0;
            }).catch(function (s) {
                _this._counPage = 0;
            });
            var coun = 0;
            this._ItemLanguage.ListLanguageText.forEach(function (s) {
                if (coun == _this._counPage) {
                    _this._item = s;
                }
                coun++;
            });
            this.saveLocalStorage("speechPageSpeech", this._counPage + "");
            this._cdRef.detectChanges();
        };
        SpeechToSpeechComponent_1.prototype.pageGoClear = function () {
            this._counPage = 0;
            this.saveLocalStorage("speechPageSpeech", this._counPage + "");
            this.pageGoStart();
            this._cdRef.detectChanges();
        };
        /**
        * @description Function to stop recording.
        */
        SpeechToSpeechComponent_1.prototype.stopRecording = function () {
            this._SpeechRecognition.stop();
            this.isUserSpeaking = false;
            this._textrecognition = "";
            this._cdRef.detectChanges();
        };
        /**
         * @description Function for initializing voice input so user can chat with machine.
         */
        SpeechToSpeechComponent_1.prototype.initVoiceInput = function () {
            var _this = this;
            // Subscription for initializing and this will call when user stopped speaking.
            this._SpeechRecognition.init().subscribe(function () {
                // User has stopped recording
                // Do whatever when mic finished listening
            });
            // Subscription to detect user input from voice to text.
            this._SpeechRecognition.speechInput().subscribe(function (input) {
                // Set voice text output to
                //this.searchForm.controls.searchText.setValue(input);      
                _this._textrecognition = input;
            });
        };
        /**
         * @description Function to enable voice input.
         */
        SpeechToSpeechComponent_1.prototype.startRecording = function () {
            this.isUserSpeaking = true;
            this._SpeechRecognition.start();
            this._cdRef.detectChanges();
            //his.searchForm.controls.searchText.reset();
        };
        SpeechToSpeechComponent_1.prototype.speechCancel = function () {
            window.speechSynthesis.cancel();
            if (window.speechSynthesis.speaking) {
                this.speechCancel();
            }
            this.statusSpeech = false;
            this._visibleBtn = true;
        };
        //Recognition
        SpeechToSpeechComponent_1.prototype.recognition = function () {
            var recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'es-ES';
        };
        SpeechToSpeechComponent_1.prototype.onSelectChange = function (event) {
            var _this = this;
            this._listVoice.forEach(function (elemet) {
                if (elemet.name == event.target.value) {
                    _this._selectedVoice = elemet;
                    console.log("saved", JSON.stringify(_this._selectedVoice.name));
                    window.localStorage.setItem("languageSpeech", _this._selectedVoice.name);
                }
            });
        };
        SpeechToSpeechComponent_1.prototype.inputTextChanged = function () {
            this._extractedTextChanged = this._extractedText;
        };
        SpeechToSpeechComponent_1.prototype.getListSpeech = function () {
            var _this = this;
            var speechName = this.getMemory("speechLanguageName");
            var level = this.getMemory("speechPageSpeech");
            var languageName = "";
            this._counPage = 0;
            speechName.then(function (d) {
                languageName = d;
            }, function (error) {
                languageName = "Español_Ingles";
            });
            if (languageName == "") {
                languageName = "Español_Ingles";
            }
            var get = this._SpeechToSpeechService.GetListlanguage(languageName);
            get.subscribe(function (read) {
                var _a, _b;
                _this._visibleLoading = false;
                _this._ItemLanguage = JSON.parse((_b = (_a = read.body) === null || _a === void 0 ? void 0 : _a.json) !== null && _b !== void 0 ? _b : "");
                _this._item = _this._ItemLanguage.ListLanguageText[0];
                _this.pageGoStart();
            }, function (error) {
                _this.alertSmg("Error");
            });
        };
        //memory
        SpeechToSpeechComponent_1.prototype.loadMemory = function () {
            var _this = this;
            var list = this.getMemory("MemoryList");
            var value = "";
            var listTem = list.then(function (s) {
                console.log("memoria");
                console.log(s);
                if (s != "")
                    _this._listMemory = JSON.parse(s);
                _this._cdRef.detectChanges();
            });
            if (value != null && value != undefined && value != "") {
            }
            console.log("memory load");
        };
        SpeechToSpeechComponent_1.prototype.getMemory = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._utiliti.GetLocalStorage(name)];
                });
            });
        };
        SpeechToSpeechComponent_1.prototype.savedMemory = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var memory, status, obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            memory = new SpeechTextModel_1.SpeechMemory();
                            status = true;
                            return [4 /*yield*/, this.MemoryExist(value)];
                        case 1:
                            obj = _a.sent();
                            if (obj.name != "" && obj.name != undefined) {
                                this.alertSmg("Ya existe");
                                status = false;
                            }
                            if (value != undefined && value != "" && status) {
                                memory.content = value;
                                if (value.length >= 20)
                                    memory.name = value.substring(0, 20) + "...";
                                else
                                    memory.name = value.toUpperCase() + "...";
                                memory.id = Math.max(this._listMemory.length) + 1;
                                this._listMemory.push(memory);
                                console.log("Saved");
                                this.alertSmg("Guardado...");
                                console.log(this._listMemory);
                                this.saveLocalStorage("MemoryList");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SpeechToSpeechComponent_1.prototype.SelectionMemory = function (obj) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.MemoryExist(obj)];
                        case 1:
                            value = _a.sent();
                            if (value != null && value != undefined && value.name != "") {
                                console.log("Cargando:" + value.name);
                                this._extractedText = value.content;
                            }
                            else {
                                console.log("error cargando" + value);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SpeechToSpeechComponent_1.prototype.deleteMemory = function (obj) {
            return __awaiter(this, void 0, void 0, function () {
                var value, lista;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.MemoryExist(obj)];
                        case 1:
                            value = _a.sent();
                            if (value != null && value != undefined && value.name != "") {
                                lista = this._listMemory.filter(function (item) { return item.name != value.name; });
                                this._listMemory = lista;
                                this.saveLocalStorage("MemoryList");
                                this.alertSmg("Eliminado...");
                                this.closeAlert();
                            }
                            else {
                                console.log("error cargando" + value);
                                this.closeAlert();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SpeechToSpeechComponent_1.prototype.saveLocalStorage = function (name, value) {
            if (value === void 0) { value = ""; }
            if (value != "") {
                this._utiliti.SetLocalStorage(name, value);
            }
            else {
                this._utiliti.SetLocalStorage(name, JSON.stringify(this._listMemory));
            }
        };
        SpeechToSpeechComponent_1.prototype.MemoryExist = function (name) {
            var result = new SpeechTextModel_1.SpeechMemory();
            this._listMemory.forEach(function (item) {
                if (item.name.toUpperCase().replace("...", "") == name.toUpperCase().replace("...", "")) {
                    console.log("Encontrado : " + JSON.stringify(item));
                    result = item;
                }
            });
            return result;
        };
        SpeechToSpeechComponent_1.prototype.alertSmg = function (msg) {
            this.startTimer(3000); // 5000 milisegundos (5 segundos)
            this._msg = msg;
            this._cdRef.detectChanges();
        };
        SpeechToSpeechComponent_1.prototype.startTimer = function (milliseconds) {
            var _this = this;
            this.stopTimer(this);
            var r = setTimeout(function () {
                _this.closeAlert();
            }, milliseconds);
        };
        SpeechToSpeechComponent_1.prototype.closeAlert = function () {
            this._msg = "";
            this._cdRef.detectChanges();
        };
        SpeechToSpeechComponent_1.prototype.stopTimer = function (id) {
            // Detén el temporizador si está en ejecución
            if (id !== null && id != undefined) {
                clearTimeout(id);
            }
        };
        return SpeechToSpeechComponent_1;
    }());
    __setFunctionName(_classThis, "SpeechToSpeechComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SpeechToSpeechComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SpeechToSpeechComponent = _classThis;
}();
exports.SpeechToSpeechComponent = SpeechToSpeechComponent;
//# sourceMappingURL=app.speechtospeech-speech-to-speech.js.map