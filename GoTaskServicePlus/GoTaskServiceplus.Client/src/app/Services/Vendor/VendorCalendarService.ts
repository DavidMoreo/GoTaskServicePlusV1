import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';
import { Observable } from 'rxjs';
import { TypeConcepValue, tblConcepValue, tblProduct } from '../../Models/Structure/tblProduct';
import { ConceptService } from '../Product/Concept/ConceptService';



@Injectable({
  providedIn: 'root'
})



export class VendorCalendarService {

  _http: HttpClient;
  _Configservice: ConfigService;
  visibleCalendar: boolean = false;


  constructor(private http: HttpClient, private Configservice: ConfigService) {
    this._Configservice = Configservice;
    this._http = http;
  }








}

