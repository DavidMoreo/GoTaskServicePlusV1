import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NameConcept } from '../../Models/Structure/tblProduct';
import { AlertService } from './AlertService';
import { LoginSevice } from '../Segurity/Login/LoginService';

@Injectable({
  providedIn: 'root'
})

export class UtilitiService {
  _titleService: Title;

  constructor(titleService: Title, private _viewAlert: AlertService, private Login: LoginSevice, private _Alert: AlertService) {
    this._titleService = titleService;
  }


  GetLocalStorage(name: string): any {
    try {
      var item = window.localStorage.getItem(name);

      return item !== null && item != undefined ? item : "";
    } catch (e) {

      return undefined;
    }

  }

  SetLocalStorage(name: string, value: string) {

    window.localStorage.setItem(name, value);
  }




  SetTitle(title: string, obj: any) {
    obj._titleService.setTitle('Más Herramientas');
  }

  async scrollToBottom(Byid: string, scroll: number = 0) {
    // Espera 1000 milisegundos (1 segundo)
    await new Promise(resolve => setTimeout(resolve, 800));
    const container = document.getElementById(Byid);

    if (container) {
      container.scrollTo({
        top: scroll == 0 ? (container.scrollHeight + container.scrollHeight) : (scroll),
        behavior: 'smooth'
      });
    }

  }


  async scrollTop(Byid: string, scroll: number = 0) {
    // Espera 1000 milisegundos (1 segundo)
    await new Promise(resolve => setTimeout(resolve, 800));
    const container = document.getElementById(Byid);

    if (container) {
      container.scrollTo({
        top: scroll > 1 ? (container.scrollHeight + container.scrollHeight) : (scroll),
        behavior: 'smooth'
      });
    }
  }


  GuidIsEmpty(guid: string) {
    return guid == "00000000-0000-0000-0000-000000000000";
  }
  GuidEmpty() {
    return "00000000-0000-0000-0000-000000000000";
  }

  GetNameConcept(name: string | undefined, value: string | undefined, id: string | undefined): NameConcept {
    var data = new NameConcept();
    data.name = name != null ? name : "";
    data.value = value != null ? value : "";
    data.id = id != null ? id : "";
    return data;
  }

  ConverCurrency(actualPrice: number, currency: string = "es-CO", currencyName: string = "COP", style: string = "currency") {
    if (isNaN(actualPrice)) actualPrice = 0;
    let numberValue = Intl.NumberFormat(currency, {  currency: currencyName, minimumFractionDigits: 0 }).format(actualPrice);
    return numberValue;
  }

  alertMsg(msg: string) {
    this._Alert.Alert(msg)
  }



  languageTraslate(value: string) {
    return value;
  }


  //public SaveStorageText(value: string, name: string, encrypt: boolean = true) {
  //  if (encrypt) value = this.Login.encryptData(value);
  //  window.localStorage.setItem(name, value);
  //}

  //public GetStorageText(name: string, dencrypt: boolean = false) {
  //  var data;
  //  data = window.localStorage.getItem(name);   
  //  if (dencrypt && data && data != "") {    
  //    data = this.Login.encryptData(data);
  //  }
  //  if (!data) data = "";
  //  return data;
  //}



}

