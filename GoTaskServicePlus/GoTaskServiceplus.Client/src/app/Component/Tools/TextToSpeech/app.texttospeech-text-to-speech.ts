import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { Inject } from '@angular/core';
import { interval } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { TextToSpeechService } from "../../../Services/SubApp/TextToSpeech/TextToSpeechService";
import { Language } from "../../../Models/Lenguage/Language";
import { SpeechMemory, Voice } from "../../../Models/SubApp/SpeechText/SpeechTextModel";
import { FormsModule } from "@angular/forms";
import { ResponseHttp } from "../../../Models/Common/Response";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";



@Component({
  standalone: true,
  imports: [FormsModule, LoadingComponent],
  selector: "app-text-to-speech",
  templateUrl: './app.texttospeech-text-to-speech.component.html',
  styleUrls: ['app.texttospeech-text-to-speech.css']

})
export class TextToSpeechComponent implements OnInit, AfterViewInit {

  _configservice: ConfigService;
  _baseApi: string;
  _utiliti: UtilitiService;

  _visibleBtn: boolean = true;
  _speechStop: boolean = false;


  _msg: string = "";

  _extractedText: string;
  _extractedTextChanged: string;




  _listVoice: Array<SpeechSynthesisVoice>;
  _listVoiceView: Array<Voice> = new Array<Voice>();
  _selectedVoice: SpeechSynthesisVoice | null = null;;

  file: TextToSpeechService;
  statusSpeech: Boolean = false;
  countSpeech: number = 0;
  pages: string;

  listLanguage: Array<Language>;
  _listMemory: Array<SpeechMemory> = Array<SpeechMemory>();
  _cdRef: ChangeDetectorRef;
  texSpeech: string;
  _titleService: Title;

  _visibleLoading: boolean = false;


  constructor(configservice: ConfigService, _file: TextToSpeechService, cdRef: ChangeDetectorRef, titleService: Title, _utiliti: UtilitiService,private loading: LoadingServiceControl) {
    this._configservice = configservice;
    this._baseApi = this._configservice.GetHostApi();
    this.file = _file;
    this._cdRef = cdRef;
    this._titleService = titleService;
    this._utiliti = _utiliti;
  }



  ngAfterViewInit(): void {
    this.LoadDataAfterView();
  }

  ngOnInit(): void {


    this.loadngOnInit();


  }

  loadngOnInit() {
    this._utiliti.SetTitle("Hola",this);
   // this._titleService.setTitle('Convierte texto a Voz');
    var lan = new Language();
    lan.language = "Español";
    lan.value = "en-US";
    //this.listLanguage = new Language();
    //this.listLanguage.push(lan);


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

  onSelectChange(event: any) {
    this._listVoice.forEach(elemet => {
      if (elemet.name == event.target.value) {
        this._selectedVoice = elemet;
        console.log(this._selectedVoice);
      }
    });




  }

  speech(value: string) {
    this.statusSpeech = true;
    if (value != "" && value != undefined) {

      try {

        this.statusSpeech = false;
        let wordsString = this.getReplace(value);
        let words = wordsString.split(/\. (?=[A-Z])|\.$|\.\n/);

        this.texSpeech = words[this.countSpeech];

        var item = new SpeechSynthesisUtterance();



        item.text = this.texSpeech;
        item.volume = 1; // Establecer el volumen al máximo (rango de 0 a 1)
        item.rate = 0.6; // Establecer la velocidad de lectura (rango de 0.1 a 10)
        item.pitch = 0.7; // Establecer el tono de voz (rango de 0 a 2)

        if (this._selectedVoice != null) {
          console.log("Voz activa");
          item.voice = this._selectedVoice;
        }

        this.pages = this.countSpeech + " de " + words.length;

        item.onend = () => {
          if (this.countSpeech < words.length) {
            console.log("ejecuto : " + words[this.countSpeech] + " Conteo " + this.countSpeech + " de " + words.length);
            this.countSpeech = this.countSpeech + 1;

            this.speech(value);


          } else if (this.countSpeech >= words.length) {

            this.countSpeech = 0;
            console.log("Cancelada : " + words[this.countSpeech] + " > " + this.countSpeech);
            this.statusSpeech = false;
            this.speechCancel();
          }



          console.log("Terminado : " + item);
        };
        

        if (item.text == "undefined" || item.text == null) {
          item.text = "Lectura finalizada";
        }
        speechSynthesis.speak(item);



        item.onresume = () => {
          console.log("onresume : " + " " + " " + this.countSpeech + " " + " " + words.length + "");
        }
        item.onerror = () => {
          console.log("error : " + " " + " " + this.countSpeech + " " + " " + words.length + "");
        }

        item.onboundary = () => {
          console.log("fin : " + " " + " " + this.countSpeech + " " + " " + words.length + "");
        }


        if (speechSynthesis.speaking || speechSynthesis.pending) {
          this.pages = this.countSpeech + " de " + words.length;
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

  private getReplace(value: string): string {

    let result = value.replace("/", "");
    result = result.replace("#", "");
    result = result.replace("–", "");
    result = result.replace("_", "");

    return result;

  }

  speechCancel() {
    window.speechSynthesis.cancel();
    
    if (window.speechSynthesis.speaking) { this.speechCancel(); }
    this.statusSpeech = false;
    this._visibleBtn = true;
  }

  speechGoPage(value: string, mode: string) {
    window.speechSynthesis.cancel();
    if (mode == "min") this.countSpeech = this.countSpeech - 1;
    if (mode == "max") this.countSpeech = this.countSpeech + 1;
    this.alertSmg("pagina " + this.countSpeech);
    this.speech(value);
  }

  onFileSelected(event: any) {
    console.log("File...");
    this._visibleLoading = true;
    const file = event.target.files[0];
    console.log("File...Load");
    if (file) {
      this.loading.Loading(true);
      this.extractTextFromPDF(file);
    }

  }

  extractTextFromPDF(fileRead: File) {

    this.alertSmg("Esperando...");
    this.file.ReaderFile(fileRead).subscribe({

      next: (read: ResponseHttp) => {
        this._visibleLoading = false;
        this._extractedText = read.json;
        console.log("File...fin" + this._extractedText);
        this.countSpeech = 0;
        this.loading.Loading(false);
        this._cdRef.detectChanges();
      }
    });

  }

  inputTextChanged() {

    this._extractedTextChanged = this._extractedText;

  }

  loadMemory() {
    var list = this.getMemory("MemoryList");
    console.log("memori Back");
    console.log(list);
    let value = "";

    let listTem = list.then(s => {

      console.log("memoria");
      console.log(s);
      if (s != "") this._listMemory = JSON.parse(s);

    });

    if (value != null && value != undefined && value != "") {


    }

    console.log("memory load");
    this._cdRef.detectChanges();
  }

  async getMemory(name: string) {
    return this._utiliti.GetLocalStorage("MemoryList");
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

  private saveLocalStorage(name: string) {
    this._utiliti.SetLocalStorage(name, JSON.stringify(this._listMemory));
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

  Clean() {
    this._visibleLoading = true;
    this._extractedText = "";
    this.countSpeech = 0;
    this._visibleLoading = false;
    this._cdRef.detectChanges();
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

  stopTimer(id:any) {
    // Detén el temporizador si está en ejecución
    if (id !== null && id != undefined) {
      clearTimeout(id);

    }
  }


}
