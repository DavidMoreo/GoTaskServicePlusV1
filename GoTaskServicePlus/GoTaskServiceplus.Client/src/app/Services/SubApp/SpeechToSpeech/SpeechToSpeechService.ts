import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';


import { HttpClientService } from '../../Common/HttpService';
import { ResponseHttp } from '../../../Models/Common/Response';
import { ConfigService } from '../../Common/ConfigService';


@Injectable({
  providedIn: 'root'
})
export class SpeechToSpeechService {


  constructor(private http: HttpClientService, private _host: ConfigService) {

    this._host = this._host;
  }

  public GetListlanguage(language: string): Observable<any> {

    var result = this.http.getHttp("GetListLanguageSpeech?Language=" + language)   
    return result;
   
  }

  public GetListGroupSpeech(language: string): Observable<any> {

    var result = this.http.getHttp("GetListGroupSpeech?language=" + language);
    
    return result;

  }

  public DeleteLanguageSpeech(url: string, id: number): Observable<any> {
    var result = this.http.getHttp("DeleteLanguageSpeech?language="+url+"&id="+id);
    return result;
  }




}

