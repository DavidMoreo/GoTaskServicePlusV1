import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Msg } from '../../Models/Common/ModelAlert';
import { EncryptService } from './EncryptService ';
import { ConfigService } from './ConfigService';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  public secretKey() { return 'miClaveSecreta' }
  constructor() {

  }


  SetKeyUser(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("key", value);
  }
  GetKeyUser() {
    var data = localStorage.getItem("key");
    if (data)
      data = this.DecryptData(data);
    if (data) {
      return data;
    } else {
      return "";
    }
  }
  ClearKeyUser() {
    localStorage.setItem("key", "");
  }


  SetRol(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("rol", value);
  }
  GetRol() {
    var data = localStorage.getItem("rol");
    if (data)
      data = this.DecryptData(data);
    if (data) {
      return data;
    } else {
      return "";
    }
  }
  ClearRol() {
    localStorage.setItem("rol", "");
  }


  SetProject(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("project", value);
  }
  GetProject() {

    var data = localStorage.getItem("project");
    if (data)
      data = this.DecryptData(data);
    if (data) {
      return data;
    } else {
      return "";
    }
  }
  ClearProject() {
    localStorage.setItem("project", "");
  }


  SetNameUser(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("user", value);
  }
  GetNameUser() {
    var data = localStorage.getItem("user");
    if (data)
      data = this.DecryptData(data);
    if (data) {
      return data;
    } else {
      return "";
    }
  }
  ClearNameUser() {
    localStorage.setItem("user", "");
  }



  SetCityFilter(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("cityFilter", value);
  }
  GetCityFilter(): string {
    var data = localStorage.getItem("cityFilter");
    if (data)
      data = this.DecryptData(data);
    if (data)
      data = this.DecryptData(data);
    if (data) {
      return data;
    } else {
      return "";
    }
  }
  ClearCityFilter() {
    localStorage.setItem("cityFilter", "");
  }




  SetIUser(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("idUSer", value);
  }
  GetIUser() {
    var data = localStorage.getItem("idUSer");
    if (data) {
      data = this.DecryptData(data);
      return data;
    } else {
      return "";
    }
  }



  SetGps(value: string) {
    /*value = this.EncryptData(value);*/
    localStorage.setItem("GPS", value);
  }
  GetGps() {
    var data = localStorage.getItem("GPS");
    if (data) {
     /* data = this.DecryptData(data);*/
      return data;
    } else {
      return "";
    }
  }

  ClearIP() {    
    localStorage.setItem("IP", "");
  }

  SetIP(value: string) {
    value = this.EncryptData(value);
    localStorage.setItem("IP", value);
  }
  GetIP() {
    var data = localStorage.getItem("IP");
    if (data) {
       data = this.DecryptData(data);
      return data;
    } else {
      return "";
    }
  }

  ClearGps() {
    /*value = this.EncryptData(value);*/
    localStorage.setItem("GPS", "");
  }


  private EncryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this.secretKey()).toString();

    return encrypted;
  }

  // Función para descifrar texto
  private DecryptData(ciphertext: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey());

      const originalText = bytes.toString(CryptoJS.enc.Latin1);

      return originalText;
    } catch (e) {

      return "";
    }

  }



}

