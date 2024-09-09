import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './ConfigService';
import { Observable } from 'rxjs';
import { tblProduct } from '../../Models/Structure/tblProduct';
import { HtmlToImgService } from './HtmlToImg';
import { ShareService } from './ShareApi';


@Injectable({
  providedIn: 'root'
})

export class ShareControlService {


  srcImg: string;
  base64: string;
  urlShare:string;

  product: tblProduct;

  constructor(private http: HttpClient, private config: ConfigService, private HtmlToImg: HtmlToImgService, private _Share: ShareService ) {

  }


  public GetFileBase64(product: tblProduct, url:string) {
    this.product = product
      ;
  
    var rerult = this.http.get<any>(this.config.GetHostApi() + "GetFileBase64?name=" + product.firsImg.url);
    rerult.subscribe({
      next: (e) => {
  
        this.base64 = e.data;
        this.urlShare = url;
      }
    });
  

    return rerult;
  }


  public GetFileBase64Url(link: string, name: string) {

    var rerult = this.http.get<any>(this.config.GetHostApi() + "GetFileBase64?name=" + name);
    rerult.subscribe({
      next: (e) => {

        this.base64 = e.data;
        this.urlShare = link;
      }
    });


    return rerult;
  }


  


  Share() {
    this._Share.shareActive = true;
    this.HtmlToImg.convertToImage("share-product", this.urlShare);
  }


  ClearShare() {
    this.product = new tblProduct();
    this.base64 = "";
    this.urlShare = "";
  }


 


  GetActive() {
    if (this.product == null) return false;
    if (this.product == null) return false;
    if (this.base64 == undefined) return false;
    if (this.base64 == "") return false;
    if (this.product.name == null || this.product.name == "") return false;


    return true;
  }


  GetSrcImg() {
    return "data:image/png;base64," + this.base64;
  }
}

