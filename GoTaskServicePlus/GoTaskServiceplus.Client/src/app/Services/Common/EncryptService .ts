import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ConfigService } from './ConfigService';
import CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})

export class EncryptService {


  constructor(private _host: ConfigService) {

  }


  // Función para cifrar texto
  public EncryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this._host.secretKey()).toString();

    return encrypted;
  }

  // Función para descifrar texto
  DecryptData(ciphertext: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this._host.secretKey());

      const originalText = bytes.toString(CryptoJS.enc.Latin1);

      return originalText;
    } catch (e) {

      return "";
    }

  }



  KeyCrypt(palabra: string, numero: number = 10): string {
    let caracteres = palabra.split('');
    for (let i = 0; i < caracteres.length; i++) {
      caracteres[i] = String.fromCharCode(caracteres[i].charCodeAt(0) + numero);
    }
    return caracteres.join('');
  }

  KeyDesCrypt(palabra: string, numero: number = 10): string {
    let caracteres = palabra.split('');
    for (let i = 0; i < caracteres.length; i++) {
      caracteres[i] = String.fromCharCode(caracteres[i].charCodeAt(0) - numero);
    }
    return caracteres.join('');
  }


  GenerateKey(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_$#';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


}

