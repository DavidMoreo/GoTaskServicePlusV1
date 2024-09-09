import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConceptProduct, ImgItem, tblProduct } from '../../Models/Structure/tblProduct';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './ConfigService';

@Injectable({
  providedIn: 'root'
})

export class LoadingServiceControl {


  _host: ConfigService;

  _ActionLoading = new Subject();
  _ActionLoading$ = this._ActionLoading.asObservable();

  _loadingPartial: boolean;
  listProductImg: Array<ImgItem>;
  productImg: ImgItem;
  loadImm: boolean = false;
  statusLoading: boolean = false;

  _active: boolean = false;
  _count: number =0;
  _text: string;

  intervalId: any;
  intervaLoading: any;
  alertId: number = 0;
  alertIdTimer: number = 0;
  timer: any;
  public constructor(private _http: HttpClient, host: ConfigService) {
    this._host = host;
  }



  public Loading(mode: boolean, msg: string = "Espere un momento...", count: number = 0) {

    //if (mode == true) this._active = mode;
     this.LoadingTimer();
    this._active = mode;
    this._count = count;
    this._text = msg;
    this._ActionLoading.next({ mode,count ,msg });
 
  }

  LoadingTimer() {
  
    if (!this.statusLoading) {
      this.statusLoading = true;
      clearInterval(this.timer);
     this.timer =  setInterval(() => {       
        this._active = false;
        clearInterval(this.timer);
      }, 100); // Cambia el tiempo de espera según sea necesario
    }
  }



  startTimer() {

    this.intervalId = setInterval(() => {

      if (this.alertIdTimer == this.alertId) {
        if (this._active) {

          this._active = false;
          clearInterval(this.intervalId);
          /* alert("Lo sentimos, ya estamos trabajando para solucionarlo, Tiempo agotado.");*/
        }
      }

    }, 39000); // Cambia el tiempo de espera según sea necesario

    this.alertIdTimer = this.alertId;
  }



  GetImgProduct(filter: string, type: string, page: number): Observable<any> {
    type = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    var result = this._http.get<any>(this._host.GetHostApi() + `Product/GetProductImageByName?filter=${filter}&typeId=${type}`);

    result.subscribe({

      next: (e) => {
        this.listProductImg = e.data;
        this.productImg = this.listProductImg[0];
        this.productImg.url = this.productImg.url.replace("PC", "PHONE");
      },
        error: (error) => {
         
        }
    });


    return result;
  }



}



