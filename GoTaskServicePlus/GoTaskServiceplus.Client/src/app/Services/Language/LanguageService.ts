
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';
import { Injectable } from '@angular/core';
import { Language } from '../../Models/Lenguage/Language';


@Injectable({
  providedIn: 'root'
})



export class ConfigLanguage {
 private _baseUrl: string;

  private _language: Array<Language>;
  public _host: ConfigService;

  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
  }

  getLanguage(page: string): Promise<Array<Language>> {
    if (this._language != undefined) {

      return this.getPromise();
    }

    var rerult = this.http.get<Array<Language>>(this._baseUrl + "Login/loging")
      .subscribe(result => {

        this._language = result;
      },
        (error) => { this._language = new Array<Language> })


    return this.getPromise();
  }

  private getPromise(): Promise<Array<Language>> {

    return new Promise<Array<Language>>((resolve, reject) => {
      if (this._language && this._language.length > 0) {
        resolve(this._language);
      } else {
        reject(Array<Language>);
      }
    });

  }


}

