import { Injectable } from '@angular/core';

import CryptoJS from "crypto-js";
import { Router } from '@angular/router';
import { tblRol } from '../../Models/Segurity/Register/RegisterModel';
import { ImgItem } from '../../Models/Structure/tblProduct';
import { tblBuyerCustomer } from '../../Models/Structure/tblBuyerCustomer';
import { LoginSevice } from '../Segurity/Login/LoginService';
import { LocalStorageService } from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  public secretKey() { return 'miClaveSecreta' }
private hostApi: string = "https://localhost:7192/";
// private hostApi: string = "https://gotaskservice.com/";


  nameCompany: string = "Go Task Service";
  nameProject: string = "Go Task Service";
  nameUser: string;

  constructor(private route: Router, private _Storage: LocalStorageService) {

  }

  GetHostImg(): string {
    return "https://gotaskservice.com/";
    //return "https://localhost:7192/";
    //return "https://migestion.bsite.net/";
  }

  GetHostApi(): string {
    return this.hostApi;
  }

  GetBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  GetUrlImgItem(image: ImgItem, scaleTo: string) {
    var idFolderCompany = "";
    image.idCompany.toString().split("-").forEach((e) => {
      idFolderCompany += e;
    });

    var host = this.GetHostImg();
    var url = "";
    var productUrl = "Files/product/";
    var name = image.url;
    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl + idFolderCompany + "/" + name.replace("PC", scaleTo);
    return url;
  }


  GetUrlImg(urlImg: string,  scaleTo: string) {
    var host = this.GetHostImg();
    var url = "";
    var productUrl = "Files/product/";
    var name = urlImg;
    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl  + name.replace("PC", scaleTo);
    return url;
  }


  GetUrlImgAndIdCompany(urlImg: string, idCompnay: string, scaleTo: string) {


    var host = this.GetHostImg();
    var url = "";
    var productUrl = "Files/product/";
    var name = urlImg;
    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl + idCompnay.replace("-", "") + "/" + name.replace("PC", scaleTo);
    return url;
  }

  
  GetUrlImgBuy(image: tblBuyerCustomer, scaleTo: string) {

    var idFolderCompany = "";
    image.idCompany.toString().split("-").forEach((e) => {
      idFolderCompany += e;
    });

    var host = this.GetHostImg();
    var url = "";
    var productUrl = "Files/product/";
    var name = image.ico;
    if (name == "")
      url = host + "Img/logo.png";
    else
      url = host + productUrl + idFolderCompany + "/" + name.replace("PC", scaleTo);
    return url;
  }


  public ValidationLogin() {
    var keyDesEncript = this._Storage.GetKeyUser();

    if (keyDesEncript) {
      return true;      
    }
    return false;
  }


  public GetRols(): Array<tblRol> {
    var rol = new Array<tblRol>();
    var contect = this._Storage.GetRol();
    rol = JSON.parse(contect);

    return rol;
  }

 

  public DeleteBeareLogin() {

    this._Storage.ClearKeyUser();
    this._Storage.ClearNameUser();
    this._Storage.ClearProject();
    this._Storage.ClearRol();
    var exist = this._Storage.GetKeyUser();

    if (exist == null || exist == "" || exist == undefined) {
      this.route.navigate(["/Login"]);
      return true;
    } else {
      return false;
    }
  }








}

