import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { ChatBotMsg } from '../../Component/Common/ChatBotMsg/app.chat-bot-msg';
import { IAByNameProduct, IntentChat, tblChatBotMsg } from '../../Models/Chat/ChatModel';



@Injectable({
  providedIn: 'root'
})


//const headers = new HttpHeaders({
//  "Content-Type": "application/json"
//});
export class ChatBotIntentConfigService {

  _http: HttpClient;
  _host: ConfigService;
  intents: Array<IntentChat>;

  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  //Intemt

  GetAllIntent(page: number, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/ConfigGetAllIntent?page=${page}`);
    result.subscribe((e) => {
      this.intents = e.data;
      this.Alert(activeAlert, e.data);
      this.Console(true, "GetAllIntentChat on", e);
    },
      error => {
        this.Console(activeConsole, "GetAllIntentChat error", error);
      });
    return result;
  }

  GetIntentById(id: string, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/GetIaIntentById?id=${id}`);
   
    return result;
  }

  DeleteIntentById(id: string, activeAlert: boolean = true): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentDelete?id=${id}`);
    result.subscribe((e) => {
      if (e.status)
      this.intents = this.intents.filter(s => s.id != id);
      this.Alert(activeAlert, e.data);      
    },
      error => {
        this.Console(!activeAlert, "DeleteIntentById error", error);
      });
    return result;


  }

  SaveIntentBot(intent: IntentChat,  activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })
    if (!this.intents) this.intents = Array();
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentAdd`, intent, { headers: headers1 });
    result.subscribe((e) => {
    
      if (e.data)
      this.intents.push(e.data);
      this.Alert(activeAlert, e.data);

    },
      error => {
        this.Console(true, "SaveIntentBot error " , error);
      });
    return result;
  }

  UpdateIntentBot(intent: IntentChat, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.Console(activeConsole, "UpdateIntentBot on", intent);
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentUpdate`, intent, { headers: headers1 });
    result.subscribe((e) => {

      if (e.status) {
        let temp = this.intents.filter(s => s.id != e.data.id);
        temp.push(e.data);
        this.intents = temp;
        this.Alert(activeAlert, e.data);
      }
    },
      error => {
        this.Console(activeConsole, "UpdateIntentBot error", error);
      });
    return result;

  }





  //Util intents

  AddintentChat(intentChat: IntentChat) {
    this.intents.push(intentChat);
  }

  RemoveIntentChat(intentChat: IntentChat) {
    let temp = this.intents.find(s => s.id == intentChat.id);
    if (temp) {
      this.intents = this.intents.filter(s => s.id == intentChat.id);
    }
  }

  GetAllIntentChat() {
    let temp = this.intents;
    return temp;
  }

  GetIntentChat(intentChat: IntentChat) {
    let temp = this.intents.find(s => s.id == intentChat.id);
    return temp;
  }

  ClearIntent() {
    this.intents = Array();

  }

  //Util Console

  private Console(active: boolean = false, name: string, data: any) {
    console.log(name, data);
  }

  private Alert(active: boolean = false, data: any) {
    console.log(name, data);
  }

}

export class ChatBotByNameConfigService {

  _http: HttpClient;
  _host: ConfigService;
  data: Array<IAByNameProduct>;


  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  //Intemt

  GetAllIntent(page: number, activeAlert: boolean = true): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/GetChatGotask?page=${page}`);
    result.subscribe((e) => {
      this.data = e.data;
      this.Alert(activeAlert, e.data);      
    },
      error => {
        this.Console(false, "GetAllIntentChat on", error);
      });
    return result;
  }

  GetIntentByid(id: string, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/GetChatById?id=${id}`);
    result.subscribe((e) => {
      this.data = e.data;
      this.Alert(activeAlert, e.data);
      this.Console(activeConsole, "GetIntentById on", e);
    },
      error => {
        this.Console(activeConsole, "GetIntentById error", error);
      });
    return result;
  }

  DeleteIntentById(id: string, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + `Chat/DeleteChat?id=${id}`);
    result.subscribe((e) => {
      this.data = this.data.filter(s => s.id != id);
      this.Alert(activeAlert, e.data);
      this.Console(activeConsole, "DeleteIntentById on", e);
    },
      error => {
        this.Console(activeConsole, "DeleteIntentById error", error);
      });
    return result;


  }

  SaveIntent(intent: IAByNameProduct, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/AddChat`, intent, { headers: headers1 });
    result.subscribe((e) => {
      this.data.push(e.data);
      this.Alert(activeAlert, e.data);
      this.Console(activeConsole, "SaveIntentBot on", e);
    },
      error => {
        this.Console(activeConsole, "SaveIntentBot error " + this._host.GetHostApi() + `Chat/AddChat`, error);
      });
    return result;
  }

  UpdateIntent(intent: IAByNameProduct, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/UpdateChat`, intent, { headers: headers1 });
    result.subscribe((e) => {
      this.data.forEach((update) => {
        if (update.id == intent.id)
          update = intent;
      });

      this.Alert(activeAlert, e.data);
      this.Console(activeConsole, "UpdateIntentBot on", e);
    },
      error => {
        this.Console(activeConsole, "UpdateIntentBot error", error);
      });
    return result;
  }





  //Util intents

  AddByNameChat(intentChat: IAByNameProduct) {
    this.data.push(intentChat);
  }

  RemoveByNameChat(intentChat: IAByNameProduct) {
    let temp = this.data.find(s => s.id == intentChat.id);
    if (temp) {
      this.data = this.data.filter(s => s.id == intentChat.id);
    }
  }

  GetAllByNameChat() {
    let temp = this.data;
    return temp;
  }

  GetByNameChat(intentChat: IntentChat) {
    let temp = this.data.find(s => s.id == intentChat.id);
    return temp;
  }

  ClearByName() {
    this.data = Array();

  }

  //Util Console

  private Console(active: boolean = false, name: string, data: any) {
    console.log(name, data);
  }

  private Alert(active: boolean = false, data: any) {
    console.log(name, data);
  }

}
