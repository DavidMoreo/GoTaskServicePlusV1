import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable, ViewChild } from "@angular/core";
import html2canvas from "html2canvas";
import { ShareService } from "./ShareApi";
import { NgxCaptureService } from "ngx-capture";
import { delay } from "rxjs";
import { ConfigService } from "./ConfigService";

@Injectable({
  providedIn: 'root'
})
export class HtmlToImgService {

  visible: boolean = false;

  constructor(private http: HttpClient, private _Share: ShareService, private ngxCaptureService: NgxCaptureService,private _configservice: ConfigService,) { }


  @ViewChild('content') content: ElementRef;











  convertToImageqqq(name: string) {

    const elementToCapture = document.getElementById(name);
    if (elementToCapture != null) {
      this.ngxCaptureService.getImage(elementToCapture, true).subscribe((imagenBase64) => {
      
        var blob = this.base64ToBlob(imagenBase64);
        this._Share.shareFileFromUrl(blob, "https://gotaskservice.com/");
        // Aquí puedes hacer lo que necesites con la imagen en base64
      });
    }
  }


  convertToImageHtml(name: string)  {
    this.visible = true;
    const elementToCapture = document.getElementById(name);
    var result;
    if (elementToCapture != null) {     
      result = this.ngxCaptureService.getImage(elementToCapture, true)
        .pipe(delay(2000)); // Retraso de 2000 milisegundos (2 segundos)
        //.subscribe((imagenBase64) => {
        //  console.log("img", imagenBase64);
        //  // Aquí puedes hacer lo que necesites con la imagen en base64
      //});

    }
      return result;
  }



  base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' }); // Cambia 'image/png' al tipo de imagen correcto si es diferente
  }

  base64ToBlob2(base64: string, tipoDeMime: string = 'image/png'): Blob {
  // Decodificar base64 para obtener datos binarios
  const datosBinarios = window.atob(base64);
  // Convertir datos binarios a un array de bytes
  const bytes = new Uint8Array(datosBinarios.length);
  for (let i = 0; i < datosBinarios.length; i++) {
    bytes[i] = datosBinarios.charCodeAt(i);
  }
  // Crear y retornar un objeto Blob con los bytes
  return new Blob([bytes], { type: tipoDeMime });
}






 
















  convertToImage78(name: string, url: string ="convertToImage") {
  /*  this.visible = true;*/
    const elementToCapture = document.getElementById(name);
    console.log(elementToCapture);
    if (elementToCapture != null) {
      // Agregar un retraso de 1 segundo (1000 milisegundos) antes de tomar la captura de pantalla
      setTimeout(() => {
        html2canvas(elementToCapture, {
          useCORS: true, // Asegúrate de que las imágenes cumplan con CORS
          allowTaint: true, // No permitas que el canvas se "contamine"

          // Otras opciones que podrías necesitar
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const blob = this.dataURItoBlob(imgData);
          this._Share.shareFileFromUrl(blob, url);
          console.log(blob);
          /* this.visible = false; */

        });
      }, 2000); // Retraso de 1 segundo (1000 milisegundos)
    }
  }


  convertToImage(name: string, url:string) {
    const elementToCapture = document.getElementById(name);
    if (elementToCapture != null) {
      html2canvas(elementToCapture).then(canvas => {


        const imgData = canvas.toDataURL('image/png');
        const blob = this.dataURItoBlob(imgData);
        this._Share.shareFileFromUrl(blob, url);
 
      });
    }
  }


  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}





