import { Injectable, Input } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ConceptProduct, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { UtilitiService } from '../Common/UtilitisService';
import { ListProduct } from '../../Component/Product/ListProduct/app.product-list-product';
import { LoadingServiceControl } from '../Common/LoadingService';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})



export class AlertBuyProductService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _loading: LoadingServiceControl;
  _router: Router; _configservice: ConfigService;
  product: tblProduct | null;

  constructor(private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl, router: Router, configservice: ConfigService) {
    this._host = host;
    this._http = http;
    this._loading = loading;
    this._router = router; this._configservice = configservice;
  }


  BuyProduct(name:string) {
    this.Route(name);
  }

  CartProduct(name: string) {
    this.Route(name);
  }
  
  Route(name: string) {
    this._router.navigate([name]);
  }
  GetUrlImg(name: string, scaleFrom: string, scaleTo: string) {
    var host = this._configservice.GetHostApi();
    var url = "";
    var productUrl = "Files/product/";
    var logo = "Files/product/";

    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl + name.replace("PC", scaleTo);

    return url;
  }
}

