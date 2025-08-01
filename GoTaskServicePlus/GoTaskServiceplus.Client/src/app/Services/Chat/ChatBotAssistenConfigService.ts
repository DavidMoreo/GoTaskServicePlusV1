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


export class ChatBotAssistenConfigService {

  _http: HttpClient;
  _host: ConfigService;
  byName: Array<IAByNameProduct>;

  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }

  //By Name

  GetAllAssisten(page: number, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/ConfigGetAllIntent?page=${page}`);
    result.subscribe((e) => {
      this.byName = e.data;
      this.Alert(activeAlert, e.data);
      this.Console(true, "GetAllIntentChat on", e);
    },
      error => {
        this.Console(activeConsole, "GetAllIntentChat error", error);
      });
    return result;
  }

  GetAssistenById(id: string, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.get<any>(this._host.GetHostApi() + `Chat/GetIaIntentById?id=${id}`);
   
    return result;
  }

  DeleteAssistenById(id: string, activeAlert: boolean = true): Observable<any> {

    var result = this._http.delete<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentDelete?id=${id}`);
    result.subscribe((e) => {
      if (e.status)
      this.byName = this.byName.filter(s => s.id != id);
      this.Alert(activeAlert, e.data);      
    },
      error => {
        this.Console(!activeAlert, "DeleteIntentById error", error);
      });
    return result;
  }

  SaveAssistenBot(intent: IntentChat,  activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })
    if (!this.byName) this.byName = Array();
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentAdd`, intent, { headers: headers1 });
    result.subscribe((e) => {
    
      if (e.data)
      this.byName.push(e.data);
      this.Alert(activeAlert, e.data);

    },
      error => {
        this.Console(true, "SaveIntentBot error " , error);
      });
    return result;
  }

  UpdateAssistenBot(intent: IntentChat, activeConsole: boolean = false, activeAlert: boolean = true): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    this.Console(activeConsole, "UpdateIntentBot on", intent);
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/ConfigIaIntentUpdate`, intent, { headers: headers1 });
    result.subscribe((e) => {

      if (e.status) {
        let temp = this.byName.filter(s => s.id != e.data.id);
        temp.push(e.data);
        this.byName = temp;
        this.Alert(activeAlert, e.data);
      }
    },
      error => {
        this.Console(activeConsole, "UpdateIntentBot error", error);
      });
    return result;

  }





  //Util intents

  AddAssistenChat(intentChat: IntentChat) {
    this.byName.push(intentChat);
  }

  RemoveAssistenChat(intentChat: IntentChat) {
    let temp = this.byName.find(s => s.id == intentChat.id);
    if (temp) {
      this.byName = this.byName.filter(s => s.id == intentChat.id);
    }
  }

  GetAllAssistenChat() {
    let temp = this.byName;
    return temp;
  }

  GetAssistenChat(intentChat: IntentChat) {
    let temp = this.byName.find(s => s.id == intentChat.id);
    return temp;
  }

  ClearAssisten() {
    this.byName = Array();

  }

  //Util Console

  private Console(active: boolean = false, name: string, data: any) {
    console.log(name, data);
  }

  private Alert(active: boolean = false, data: any) {
    console.log(name, data);
  }

}

