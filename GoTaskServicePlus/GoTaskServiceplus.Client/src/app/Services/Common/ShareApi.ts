import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './ConfigService';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  shareActive: boolean = false;
  constructor(private http: HttpClient, configservice: ConfigService) { }

  shareData(title: string, text: string, url: string) {
    // Lógica para compartir datos utilizando la API de navegador
    // Por ejemplo, puedes usar navigator.share si está disponible en el navegador
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      }).then(() => {
        console.log('Datos compartidos exitosamente');
      }).catch((error) => {
        console.error('Error al compartir:', error);
      });
    } else {
      console.error('La API de compartir no está soportada en este navegador');
    }
  }





  async shareFile(file: File) {
    this.shareActive = true;
    if (navigator.share) {
      const blob = await this.readFileAsBlob(file);
      const fileArray = [new File([blob], file.name, { type: blob.type })];

      navigator.share({
        files: fileArray
      }).then(() => {
        this.shareActive = false;
        console.log('Archivo compartido exitosamente');
      }).catch((error) => {
        this.shareActive = false;
        console.error('Error al compartir archivo:', error);
      });
    } else {
      this.shareActive = false;
      console.error('La API de compartir no está soportada en este navegador');
    }
  }

  private async readFileAsBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Blob([new Uint8Array(reader.result)], { type: file.type }));
        } else {
          reject(new Error('Error al leer el archivo'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };
      reader.readAsArrayBuffer(file);
    });
  }








  public async shareFileFromUrl(blob: Blob, url: string) {
  
    if (navigator.share) {
      this.shareActive = true;

        const file = new File([blob], "Producto.png", { type: blob.type });
        const shareData = {

          url: url,
          title: "Producto",
          text: "Compra o vende productos",
          files: [file]
      };

      if (navigator.canShare(shareData)) {

        navigator.share(shareData)
          .then(() => { this.shareActive = false; } )
        
          .catch((error) =>
          {
            console.error('Error al compartir archivo:', error);
            this.shareActive = false;
          });
      } else {
        this.shareActive = false;
        alert("no se puede compartir");
      }

    } else {
      this.shareActive = false;
      console.error('La API de compartir no está soportada en este navegador');
    }
  }

  private getFileNameFromUrl(url: string): string {
    // Extraer el nombre del archivo de la URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }








}
