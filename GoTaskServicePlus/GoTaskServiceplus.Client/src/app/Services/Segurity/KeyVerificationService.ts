import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ConceptProduct, tblProduct } from '../../Models/Structure/tblProduct';

import { UtilitiService } from '../Common/UtilitisService';

import { LoadingServiceControl } from '../Common/LoadingService';
import { tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';

import { NotificationService } from '../Admin/Notification/NotificationService';
import { Router } from '@angular/router';
import { EncryptService } from '../Common/EncryptService ';





@Injectable({
  providedIn: 'root'
})



export class KeyVerificationService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _listProduct: Array<tblBuyerCustomer>;
  _listBuyStorageTemp: Array<string>;
  _listBuyStorage: Array<string>;
  _loading: LoadingServiceControl;
  isBuyProduct: boolean = false;
  buy = new tblBuyerCustomerConcept();


  constructor(private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl, private route: Router) {
    this._host = host;
    this._http = http;
    this._loading = loading;

  }


  async GetKeyVerification(number:string): Promise<Observable<any>> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.get<any>(this._host.GetHostApi() + `KeyValidation/GetCodeVerification?number=${number}` );   

    return result;
  }













  Route(routeValue: string) {
    this.route.navigate([routeValue]);
  }



}

