import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../../Models/Common/Response';
import { ImgItem, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClientService } from '../Common/HttpService';
import { MovementType, tblBuyerCustomer, tblBuyerCustomerConcept } from '../../Models/Structure/tblBuyerCustomer';
import { UtilitiService } from '../Common/UtilitisService';



@Injectable({
  providedIn: 'root'
})



export class FavoriteService {
  _favoritesList: Array<tblProduct> = new Array<tblProduct>();
  _http: HttpClient;
  _host: ConfigService;
  counHttp: number = 0;
  limitHttp: number = 10;
  listFavorite: Array<string>;

  constructor(private http: HttpClient, private host: ConfigService, private _Util: UtilitiService) {
    this._host = host;
    this._http = http;
  }



  LoadFavorite() {
    if (this._favoritesList) {
      this.GetAllProductFavorite(0);
      console.log("Favorite load");
    }
  }


  GetAllProductFavorite(page: number = 0) {
    var movementType = new MovementType();
    var result = this._http.get<any>(this._host.GetHostApi() + `FavoriteCustomer/GetAllFavoriteByUser?page=0&statusMovement=` + movementType.favoriteActive);

    result.subscribe({
      next: (e) => {
      /*  if (this._favoritesList == undefined) this._favoritesList = new Array<tblProduct>; */
        this._favoritesList = e.data;
      }

    });

  }


  GetListTblProduct(list: Array<tblBuyerCustomer>) {
    var data = new Array<tblProduct>(); 

    list.filter((e: tblBuyerCustomer) => {

      var product = new tblProduct();
      product.actualPrice = e.salePrice;
      product.name = e.name;
      var itemImg = new ImgItem();
      itemImg.url = e.ico;
      itemImg.name = e.ico;
      product.firsImg = itemImg;
      product.priceString = this._Util.ConverCurrency(e.salePrice);
      data.push(product);

    });
    return data;
  }



  GetFavoriteById(id: string) {
    var result = this._http.delete<any>(this._host.GetHostApi() + `/FavoriteCustomer/GetAllFavoriteByUser`);

    result.subscribe({
      next: (e:any) => {

      /*  this._favoritesList = e.data;*/
        console.log( e);


      }

    });

  }



  ClearCart() {

  }


  AddProductFavorite(product: tblProduct, count: number = 0) {

    var cart = new tblBuyerCustomerConcept();
    cart.product = product;
    cart.quantity = count;

    this._favoritesList.push(product);       

    var result = this._http.post<any>(this._host.GetHostApi() + `FavoriteCustomer/AddFavoriteCustomer`, cart);
    result.subscribe({
      next: (e) => {
        if (e.status) {
          if (this._favoritesList == undefined) this._favoritesList = new Array<tblProduct>();
         
        }
      }
    });

  }

  RemoveFavoriteById(id: string) {
    this._favoritesList = this._favoritesList.filter(r => r.id != id);
    var result = this._http.delete<any>(this._host.GetHostApi() + `FavoriteCustomer/DeleteavoriteItem?id=` + id);
    this._favoritesList = this._favoritesList.filter(s => s.id != id);
    result.subscribe({
      next: (e) => {
        if (e.status) {
         
        }

      }

    });

  }




  GetListNull() {
    if (this._favoritesList == null || this._favoritesList == undefined || this._favoritesList.length <= 0)
      return true;
    return false;
  }


  async ReloadHttp() {
    this.counHttp++;

    if (this.counHttp <= this.limitHttp) {
      var timer = setInterval(() => {

        clearInterval(timer);
        if (this.GetListNull()) this.GetAllProductFavorite();

      }, 9000)
    }

  }


}

