import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ChatBotContext, MsgChat } from '../../Models/Chat/MsgChat';
import { tblChatBotMsg } from '../../Models/Chat/ChatModel';





@Injectable({
  providedIn: 'root'
})



export class ChatBotService {

  _http: HttpClient;
  _host: ConfigService;
  chatRespose: Array<tblChatBotMsg>;
  private chatList: Array<MsgChat> = new Array<MsgChat>();
  chatListStatus: boolean = true;

  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }


  //Config 

  GetAllChat(page: number): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetListFavorite?page=${page}`);

    return result;
  }


  SaveChatBot(chat: tblChatBotMsg): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })
    console.log(chat);
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/AddChat`, chat, { headers: headers1 });
    result.subscribe((e) => {

      alert(e.status);

    });
    return result;
  }


  //Action with chat

  ChatMsg(responses: ChatBotContext) {
    var result = this._http.post<any>(this._host.GetHostApi() + `Chat/BotQuestion`, responses);
    return result;
  }


  //Util Action with chat bot

  GetChatList() {
    return this.chatList;
  }

  AddChatList(item: MsgChat) {
    this.chatList.push(item);
  }

  RemoveChatList(item: MsgChat) {
    var temp = this.chatList.find(s => s.id == item.id);
    if (temp) {
      this.chatList = this.chatList.filter(s => s.id != item.id);
    }
  }

  ClearChatList() {
    this.chatList = new Array();
  }

}

