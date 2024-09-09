import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfigService } from "../../../Services/Common/ConfigService";
import { DowloadService } from "../../../Services/SubApp/DowloadYoutobe/DowloadYoutubeService";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { EMPTY, Observable, Subject, Subscription, catchError, map, timer } from "rxjs";

import { concatMap, count, filter, mapTo, takeUntil } from 'rxjs/operators'; // Asegúrate de importar filter y map


import { ItemDowloadVideo } from '../../../Models/SubApp/DowloadYoutobe/ModelDoloadVideo';
import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { ResponseHttp } from "../../../Models/Common/Response";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";


@Component({
  standalone: true,
  selector: "app-subapp-download-videos",
  templateUrl: './app.subapp-download-videos.component.html',
  styleUrls: ['app.subapp-download-videos.css'],
  imports: [FormsModule, LoadingComponent],


})
export class DownloadVideosComponent implements OnInit {
  _Loading: LoadingServiceControl;
  _configservice: ConfigService;
  _baseApi: string;
  _dowload: DowloadService;
  _extractedText: string;
  _titleVideo: string;

  _cdRef: ChangeDetectorRef;
  _statusTask: boolean;
  _titleService: Title;


  _msg: string = "";
  _video: ItemDowloadVideo;

  _progress: number;
  _Isprogress: boolean;

  fileParts: Uint8Array[] = [];


  private _statusTaskSubject = new Subject<boolean>();
  public statusTask$ = this._statusTaskSubject.asObservable();

  private _progressSubject = new Subject<number>();
  public progress$ = this._progressSubject.asObservable();

  private httpSubscription: Subscription;




  constructor(configservice: ConfigService, dowload: DowloadService, cdRef: ChangeDetectorRef, titleService: Title, loading: LoadingServiceControl) {
    this._configservice = configservice;
    this._dowload = dowload;
    this._titleService = titleService;
    this._Loading = loading;
  }


  ngOnInit(): void {
    this._titleService.setTitle('Descarga Videos De Youtube');

  }


  getInfoVideo(text: string): string {

    if (text != "" && text != undefined) {
      this.Loading(true, true);
      if (text != "") {
        let http = this._dowload.GetVideoInfo(text);


        http.subscribe({
          next: (response: any) => {


            if (response.type == HttpEventType.DownloadProgress) {



            }
            else {


              this._video = JSON.parse(response.body.json);
              this._titleVideo = this._video.Title;



            }

            this.Loading(false, false);
          },
          error: (err) => {

            this.Loading(false, false);
          }
        });

      }

    }
    return "";
  }

  


  descargarBlob(blobData: any, fileName: string = "Prueba.mp4"): void {
    const options = {
      type: 'application/octet-stream'
    };

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blobData);
    link.download = fileName || 'archivo_descargado';

    // Simular clic en el enlace para iniciar la descarga
    link.click();

    // Liberar la URL del objeto Blob una vez que hayas terminado con ella
    URL.revokeObjectURL(link.href);

    this.Loading(false, false);
  }



  dowloadVideoPartial(url: string, mode: string): string {
    this.Loading(true, true);

    if (url != "" && url != undefined) {

      if (url != "") {

        this._dowload.GetDowloadVideoPartial(url + "&mode=" + mode)

          .subscribe({
            next: (response) => {


              var countData = Math.round((response.loaded * 100) / response.total);
              if (response.type === HttpEventType.DownloadProgress) {

                this._Loading._text = countData.toString();
              }
              else if (response instanceof HttpResponse) {

                const blob = new Blob([response.body]);
                this.descargarBlob(blob, "GotaskService_" + this._titleVideo +"."+ mode );

              }
              
            

            }, complete: () => {

            },
            error: (err) => {
            
              this.Loading(false, false);
            }
          });
      }

    }
   // this.dowloadVideoInfo(url, mode);
    return "";
  }






  loadingProgress() {
    if (this._Isprogress) {
      if (this._progress == undefined) this._progress = 0;
      console.log(this._progress);

      try {
        setInterval(() => {
          if (this._progress <= 98) {
            this._Loading._text = (this._progress++).toString() + "%";
            if (this._Isprogress) { this.loadingProgress(); }
            else {
              this._progress = 0;
            }
          }
        }, 19000);
      } catch (e) {
        console.log(e);
      }


    } else {
      this._progress = 0;
    }
    this._cdRef.detectChanges();
  }






  private Loading(visibleLoading: boolean, _statusTask: boolean) {
    this._Loading.Loading(visibleLoading);
    this._statusTask = _statusTask;

    this._Isprogress = visibleLoading;
    console.log(this._Isprogress);
    // this._cdRef.detectChanges();
  }

  public alertSmg(msg: string, time: Number = 500) {
    this.startTimer(3000); // 5000 milisegundos (5 segundos)
    this._msg = msg;
    this._cdRef.detectChanges();
  }


  startTimer(milliseconds: number) {

    var r = setTimeout(() => {
      this.closeAlert();
    }, milliseconds);
  }

  stopTimer(id: any) {
    // Detén el temporizador si está en ejecución
    if (false) {
     // this.clearTimeout(id);

    }
  }


  closeAlert() {
    this._msg = "";

  }



}
