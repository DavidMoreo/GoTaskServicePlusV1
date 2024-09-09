import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ConceptProduct, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { UtilitiService } from '../Common/UtilitisService';
import { ListProduct } from '../../Component/Product/ListProduct/app.product-list-product';
import { LoadingServiceControl } from '../Common/LoadingService';
import { MovementType, tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';
import { NotificationComponent } from '../../Component/Common/Notificacion/app.common-notification';
import { NotificationService } from '../Admin/Notification/NotificationService';
import { Router } from '@angular/router';
import { CartService } from './CartService';
import { CommonService } from '../Common/CommonService';




@Injectable({
  providedIn: 'root'
})



export class BuyProductService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _listProduct: Array<tblBuyerCustomer>;
  _loading: LoadingServiceControl;
  isBuyProduct: boolean = false;
  buy = new tblBuyerCustomerConcept();


  constructor(private _CommonService: CommonService,  private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl, private _Notifi: NotificationService, private route: Router, private _CartService: CartService) {
    this._host = host;
    this._http = http;
    this._loading = loading;

  }



  // PurCharse

  SaveBuyCountomer(): Observable<any> {
    const headers1 = new HttpHeaders({
      "Content-Type": "application/json"
    })

    var result = this._http.post<any>(this._host.GetHostApi() + `BuyCustomer/AddBuyCustomer?`, "");
    this._loading.Loading(true);
    result.subscribe((e) => {
      if (e.status) {
        //this._Notifi.showNotification("Compra realizada, nos comunicáremos contigo.");
        this._CommonService._AlertService.Alert("Tu compra fue guardada, muy pronto se pondrán en contacto contigo para programar la entrega, muchas gracias por tu compra.");

        this.isBuyProduct = false;
        this.buy = new tblBuyerCustomerConcept();
        this.Route("product-buy");

      }
      this._loading.Loading(false);
    });

    return result;
  }


  // End Purcharse




  //Cart

  GetAllCart() {
    var movementType = new MovementType();
    var result = this._http.get<any>(this._host.GetHostApi() + `CartCustomer/GetAllCarByUser?page=0&statusMovement=` + movementType.cartActive);
    result.subscribe({

      next: (e) => {
        console.log("All cart", e.data);
        this._listProduct = e.data;
      }

    });
  }


  AddCart(product: tblProduct) {

  }

  SaveTempCart(id: string) {

  }

  DeleteCart(id:string) {

  }

  //End Cart 


  Route(routeValue: string) {
    this.route.navigate([routeValue]);
  }



}

