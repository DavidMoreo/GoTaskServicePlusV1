import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { Inject } from '@angular/core';
import { Subject, count, interval } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { TextToSpeechService } from "../../../Services/SubApp/TextToSpeech/TextToSpeechService";
import { Language } from "../../../Models/Lenguage/Language";
import { SpeechMemory, Voice } from "../../../Models/SubApp/SpeechText/SpeechTextModel";
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ResponseHttp } from "../../../Models/Common/Response";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { ItemChatComponent } from "./common/ItemChat/app.itemchat-item-chat";
import { LanguageSpeech, SpeechLanguageModel } from "../../../Models/SubApp/SpeechToSpeech/SpeechToSpeech";
import { SpeechRecognition } from "../../../Services/SubApp/SpeechToSpeech/SpeechRecognitionService";
import { SpeechToSpeechService } from "../../../Services/SubApp/SpeechToSpeech/SpeechToSpeechService";



@Component({
  standalone: true,
  imports: [FormsModule, LoadingComponent,  ItemChatComponent],
  selector: "app-speech-to-speech",
  templateUrl: './app.speechtospeech-speech-to-speech.component.html',
  styleUrls: ['app.speechtospeech-speech-to-speech.css']

})
export class SpeechToSpeechComponent implements OnInit, AfterViewInit {

  _configservice: ConfigService;

  _utiliti: UtilitiService;

  _visibleBtn: boolean = true;
  _speechStop: boolean = false;

  _ItemLanguage: SpeechLanguageModel;
  _item = new LanguageSpeech();
  _counPage: number = 0;

  _msg: string = "";

  _extractedText: string;
  _extractedTextChanged: string;

  _listVoice: Array<SpeechSynthesisVoice>;
  _listVoiceView: Array<Voice> = new Array<Voice>();
  _selectedVoice: SpeechSynthesisVoice;

  file: TextToSpeechService;
  _SpeechToSpeechService: SpeechToSpeechService;


  statusSpeech: Boolean = false;

  pages: string;
  countSpeech: number;


  listLanguage: Array<Language>;
  _listMemory: Array<SpeechMemory> = Array<SpeechMemory>();
  _cdRef: ChangeDetectorRef;
  texSpeech: string;
  _titleService: Title;

  _visibleLoading: boolean = false;

  public searchForm: FormGroup;
  public isUserSpeaking: boolean = false
  _SpeechRecognition: SpeechRecognition

  _textrecognition: string;

  constructor(configservice: ConfigService, _file: TextToSpeechService, cdRef: ChangeDetectorRef, titleService: Title, _utiliti: UtilitiService, private fb: FormBuilder, SpeechRecognition: SpeechRecognition, SpeechToSpeechService: SpeechToSpeechService) {
    this._configservice = configservice;

    this._cdRef = cdRef;
    this._titleService = titleService;
    this._utiliti = _utiliti;
    this._SpeechRecognition = SpeechRecognition;
    this._SpeechToSpeechService = SpeechToSpeechService;
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
    });
  }



  ngAfterViewInit(): void {
    this.LoadDataAfterView();
  }

  ngOnInit(): void {

    this.saveLocalStorage("speechPageSpeech", "0");
    console.log(this._item);
    this.loadngOnInit();
    this.pageGoStart();


  }

  loadngOnInit() {

    this._titleService.setTitle('Aprender inglés');
    var lan = new Language();
    lan.language = "Español";
    lan.value = "en-US";
    //this.listLanguage = new Language();
    //this.listLanguage.push(lan);
    this.getListSpeech();

    const recognition = new (window as any).webkitSpeechRecognition();

    this.initVoiceInput();
    this.loadMemory();
  }




  LoadDataAfterView(): void {
    const synth = window.speechSynthesis;
    synth.onvoiceschanged = () => {
      this._listVoice = window.speechSynthesis.getVoices();

      this._listVoice.forEach(elemet => {
        if (elemet.localService) {
          let voice = new Voice();
          voice.name = elemet.name;
          voice.id = this._listVoiceView.length + 1;
          this._listVoiceView.push(voice);
          console.log(elemet.name);
        }
      });

    };

  }





  speech(value: string) {

    this.stopRecording();
    let lang = window.localStorage.getItem("languageSpeech");
    if (lang != undefined) {

      if (lang != "") {
        this._listVoice.forEach(elemet => {

          if (lang == elemet.name) {

            this._selectedVoice = elemet;

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


        item.onend = () => {

          this.statusSpeech = false;
          this.speechCancel();

          console.log("Terminado : " + item);
        };


        if (item.text == "undefined" || item.text == null) {
          item.text = "Lectura finalizada";
        }

        speechSynthesis.speak(item);



        item.onresume = () => {
          console.log("onresume : " + " " + " " + " ");
        }
        item.onerror = () => {
          console.log("error : " + " ");
        }

        item.onboundary = () => {
          console.log("fin : " + " " + " ");
        }


        if (speechSynthesis.speaking || speechSynthesis.pending) {
          this.statusSpeech = true;
          this._visibleBtn = false;
        }

      } catch (e) {
        console.log("Error : " + e);
        this.alertSmg("No se puede continuar");
        this.statusSpeech = false;
      }
    }
  
    this._cdRef.detectChanges();

  }

  modeSpeechLang(event: any) {

    if (this._listVoice == undefined || this._listVoice.length > 0) this.LoadDataAfterView();
    this._listVoiceView = new Array<Voice>();
    let voice = new Voice();
    this._listVoice.forEach(elemet => {
      voice = new Voice();
      if (event.target.value == "todos") {

        voice.name = elemet.name;
        voice.id = this._listVoiceView.length + 1;
        this._listVoiceView.push(voice);
      } else {
        if (elemet.localService) {
          this._listVoiceView.push(voice);
        }
      }

    });

    this._cdRef.detectChanges();
    this.alertSmg("realizado");
  }

  pageGo(mode: string) {
   
    if (mode == "+" && this._ItemLanguage.ListLanguageText.length > this._counPage) { this._counPage++; }
    else
      if (mode == "-" && this._counPage > 0) { this._counPage--; }

    let coun = 0;
    this._ItemLanguage.ListLanguageText.forEach(s => {
      if (coun == this._counPage) {
        this._item = s;
      }
      coun++;
    })

    this._textrecognition = "";
    this._cdRef.detectChanges();

    this.saveLocalStorage("speechPageSpeech",this._counPage + "");

    console.log("List", this._counPage);
    this._cdRef.detectChanges();
  }

  pageGoStart() {
    var level = this.getMemory("speechPageSpeech");

    level.then(d => { 
      this._counPage = parseInt(d);

    }, (error) => {
      this._counPage = 0;
    }).catch(s => {

      this._counPage = 0;
    });



    let coun = 0;
    this._ItemLanguage.ListLanguageText.forEach(s => {
      if (coun == this._counPage) {
        this._item = s;
      }
      coun++;
    })
    this.saveLocalStorage("speechPageSpeech", this._counPage + "");

   
    this._cdRef.detectChanges();
  }


  pageGoClear() {
    this._counPage = 0;
    this.saveLocalStorage("speechPageSpeech", this._counPage + "");
    this.pageGoStart();
    this._cdRef.detectChanges();
  }



  /**
  * @description Function to stop recording.
  */
  stopRecording() {
    this._SpeechRecognition.stop();
    this.isUserSpeaking = false;
    this._textrecognition = "";
    this._cdRef.detectChanges();
  }

  /**
   * @description Function for initializing voice input so user can chat with machine.
   */
  initVoiceInput() {
    // Subscription for initializing and this will call when user stopped speaking.
    this._SpeechRecognition.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
    });

    // Subscription to detect user input from voice to text.
    this._SpeechRecognition.speechInput().subscribe((input) => {
      // Set voice text output to
      //this.searchForm.controls.searchText.setValue(input);      
      this._textrecognition = input;
    });
  }

  /**
   * @description Function to enable voice input.
   */
  startRecording() {
    this.isUserSpeaking = true;
    this._SpeechRecognition.start();
    this._cdRef.detectChanges();
    //his.searchForm.controls.searchText.reset();
  }

  speechCancel() {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.speaking) { this.speechCancel(); }
    this.statusSpeech = false;
    this._visibleBtn = true;
  }



  //Recognition

  recognition() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-ES';
  }

  onSelectChange(event: any) {

    this._listVoice.forEach(elemet => {
      if (elemet.name == event.target.value) {
        this._selectedVoice = elemet;
        console.log("saved", JSON.stringify(this._selectedVoice.name));
        window.localStorage.setItem("languageSpeech", this._selectedVoice.name);

      }
    });
  }

  inputTextChanged() {

    this._extractedTextChanged = this._extractedText;

  }




  getListSpeech() {

    var speechName = this.getMemory("speechLanguageName");
    var level = this.getMemory("speechPageSpeech");
    
    let languageName = "";
    this._counPage = 0;

  

    speechName.then(d => {
      languageName = d;
    }, (error) => {
      languageName = "Español_Ingles";
    });

    if (languageName == "") {
      languageName = "Español_Ingles";
    }


  

    let get = this._SpeechToSpeechService.GetListlanguage(languageName);

    get.subscribe(read => {

      this._visibleLoading = false;
      this._ItemLanguage = JSON.parse(read.body?.json??"");

      this._item = this._ItemLanguage.ListLanguageText[0];

      this.pageGoStart();


    }, (error) => {
      this.alertSmg("Error");
    });

  }










  //memory

  loadMemory() {
    var list = this.getMemory("MemoryList");

    let value = "";

    let listTem = list.then(s => {

      console.log("memoria");
      console.log(s);
      if (s != "") this._listMemory = JSON.parse(s);
      this._cdRef.detectChanges();

    });

    if (value != null && value != undefined && value != "") {


    }

    console.log("memory load");

  }

  async getMemory(name: string) {
    return this._utiliti.GetLocalStorage(name);
  }

  async savedMemory(value: string) {
    let memory = new SpeechMemory();
    let status: boolean = true;

    var obj = await this.MemoryExist(value);

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
  }

  async SelectionMemory(obj: string) {

    var value = await this.MemoryExist(obj);
    if (value != null && value != undefined && value.name != "") {
      console.log("Cargando:" + value.name);
      this._extractedText = value.content;
    } else {
      console.log("error cargando" + value);
    }

  }

  async deleteMemory(obj: string) {

    var value = await this.MemoryExist(obj);
    if (value != null && value != undefined && value.name != "") {
      var lista = this._listMemory.filter(item => item.name != value.name);
      this._listMemory = lista;
      this.saveLocalStorage("MemoryList");

      this.alertSmg("Eliminado...");
      this.closeAlert();

    } else {
      console.log("error cargando" + value);
      this.closeAlert();
    }
  }

  private saveLocalStorage(name: string, value: string = "") {
    if (value != "") {
      this._utiliti.SetLocalStorage(name, value);
    } else {
      this._utiliti.SetLocalStorage(name, JSON.stringify(this._listMemory));

    }
  }

  private MemoryExist(name: string): SpeechMemory {

    var result = new SpeechMemory();
    this._listMemory.forEach(item => {
      if (item.name.toUpperCase().replace("...", "") == name.toUpperCase().replace("...", "")) {
        console.log("Encontrado : " + JSON.stringify(item));
        result = item;
      }

    });

    return result;
  }







  alertSmg(msg: string) {
    this.startTimer(3000); // 5000 milisegundos (5 segundos)
    this._msg = msg;
    this._cdRef.detectChanges();
  }

  startTimer(milliseconds: number) {
    this.stopTimer(this);
    var r = setTimeout(() => {
      this.closeAlert();
    }, milliseconds);
  }

  closeAlert() {
    this._msg = "";
    this._cdRef.detectChanges();
  }

  stopTimer(id: any) {
    // Detén el temporizador si está en ejecución
    if (id !== null && id != undefined) {
      clearTimeout(id);

    }
  }







}
