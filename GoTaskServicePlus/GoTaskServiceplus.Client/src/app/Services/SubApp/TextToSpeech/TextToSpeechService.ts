import { Injectable } from '@angular/core';

import { ConfigService } from '../../Common/ConfigService';
import { HttpClientService } from '../../Common/HttpService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseHttp } from '../../../Models/Common/Response';



@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  _configservice: ConfigService;
  constructor(private http: HttpClient, private configservice: ConfigService) {

    this._configservice = configservice;
   
  }

  public  ReaderFile(selectedFile: File) {

    const formData = new FormData();
    formData.append('file', selectedFile);


    const headers1 = new HttpHeaders({  
      "Content-Type": "multipart/form-data"
    })

    var rerult = this.http.post<any>(this._configservice.GetHostApi() + "TextToSpeech/ReadFile", formData);


   /* var rerult =  this.http.postFromDataHttp("TextToSpeech/ReadFile", formData);*/

    return rerult;
  }



}

