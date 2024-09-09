import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable, catchError, finalize, throwError } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ConceptProduct, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { UtilitiService } from '../Common/UtilitisService';
import { ListProduct } from '../../Component/Product/ListProduct/app.product-list-product';
import { LoadingServiceControl } from '../Common/LoadingService';
import { MovementType, tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';
import { AlertBuyProductService } from './AlertBuyProductService';
import { __await } from 'tslib';



@Injectable({
  providedIn: 'root'
})



export class CartService {

  _http: HttpClient;
  _host: ConfigService;
  _util: UtilitiService;
  _listProductCart: Array<tblBuyerCustomer> = new  Array<tblBuyerCustomer>;
  _loading: LoadingServiceControl;
 
  counHttp: number = 0;
  limitHttp: number = 10;
  constructor(private _AlertBuyService: AlertBuyProductService, private http: HttpClient, private host: ConfigService, loading: LoadingServiceControl) {
    this._host = host;
    this._http = http;
    this._loading = loading;
  }


  LoadCart() {
    if (this._listProductCart) {
      this.GetAllProductCart(0);
    }
  }


  GetAllProductCart(page:number =0) {
    var movementType = new MovementType();
    var result = this._http.get<any>(this._host.GetHostApi() + `CartCustomer/GetAllCarByUser?page=0&statusMovement=` + movementType.cartActive);

    result.subscribe({
      next: (e) => {
      
        this._listProductCart = e.data;
       

      }

    });
     
  }


  GetCartById(id: string) {
    var result = this._http.delete<any>(this._host.GetHostApi() + `CartCustomer/GetCarById`);

    result.subscribe({
      next: (e) => {
       
        this._listProductCart = e.data;


      }

    });
    return this._listProductCart;
  }



  ClearCart() {
   
  }


  AddProductCart(product: tblProduct, count: number = 1, modeSelect: boolean = true) {

    var cart = new tblBuyerCustomerConcept();
    cart.product = product;
    cart.quantity = count;

  
    var result = this._http.post<any>(this._host.GetHostApi() + `CartCustomer/AddCartCustomer`, cart);
    result.subscribe({
      next: (e) => {
        if (e.status) {
          this.GetAllProductCart(0);
          if (modeSelect) this._AlertBuyService.product = product;
        }
      }
    });

  }

  RemoveCartById(id: string) {    
    this._listProductCart = this._listProductCart.filter(r => r.id != id);
    var result = this._http.delete<any>(this._host.GetHostApi() + `CartCustomer/DeleteCartItem?id=`+ id);

    result.subscribe({
      next: (e) => {
        if (e.status) {
          this._listProductCart = this._listProductCart.filter(s => s.id != id);
        }

      }

    });

  }

  async GetListCart() {

    console.log("Cart", this._listProductCart);
    if (this._listProductCart)
      return this._listProductCart;
    else
     await this.GetAllProductCart();

    return this._listProductCart;
  }


  GetListNull() {
    if (this._listProductCart == null || this._listProductCart == undefined || this._listProductCart.length <= 0)
        return true;  

    return false;
  }


  async ReloadHttp() {
    this.counHttp++;

    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {
      
        clearInterval(timer);
        if (this.GetListNull()) this.GetAllProductCart();

      }, 9000)
    }

  }

}

