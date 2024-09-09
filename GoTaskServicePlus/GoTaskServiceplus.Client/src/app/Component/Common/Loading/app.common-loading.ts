import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { Subject, Subscription } from "rxjs";
import { ConceptProduct, ImgItem, tblProduct } from "../../../Models/Structure/tblProduct";




@Component({
  standalone: true,
  selector: "app-common-loading",
  templateUrl: './app.common-loading.component.html',
  styleUrls: ['./app.common-loading.css']
})
export class LoadingComponent implements OnInit, DoCheck, OnDestroy {
  _Service: LoadingServiceControl;
  _configservice: ConfigService;
   @Input() active: boolean = false;

  intervalId: any;
  private _ServiceSubscription: Subscription;

  constructor(service: LoadingServiceControl, configservice: ConfigService, private _cdRef: ChangeDetectorRef) {
    this._Service = service;
    this._configservice = configservice;
  }

  ngOnInit(): void {
    this._Service._text = "Espere un momento...";
    var status = false; // this.ImgLoading();
    if (!status) {
      this._Service.productImg = new ImgItem();
      this._Service.productImg.url = "/assets/logo.png";
      this._Service.productImg.code = "";
    }
 /*   this.startTimerImg();*/
    //this._ServiceSubscription = this._Service._ActionLoading$.subscribe((e: any) => {
    //  /* this._Service._active =e.mode;*/
    //  this.alertId++;
    //  this._Service._active = e.mode;
    //  this.startTimer();

    //});
  }
  ngDoCheck(): void {
    /* alert(this._Service._active);*/
   /* this.ImgLoading();*/
  }


  ImgLoading() {

    if (this._Service.listProductImg == null || this._Service.listProductImg == undefined || this._Service.listProductImg.length <= 0) {
      this._Service.GetImgProduct("partial", "", 0);
      return false;
    }
    else {
      var count = Math.floor(Math.random() * (this._Service.listProductImg.length - 0)) + 0;
      this._Service.productImg = this._Service.listProductImg[count];
      this._Service.productImg.url = this._Service.productImg.url.replace("PC", "PHONE");
      this._cdRef.detectChanges();
      return true;
    }

  }



  close() {

    this._Service.Loading(false);
  }
  open() {
    this._Service.Loading(true);
  }

  ngOnDestroy(): void {

    if (this._ServiceSubscription != undefined) this._ServiceSubscription.unsubscribe();
  }


  GetUrlImg(image: ImgItem, scaleTo: string) {
    var url = this._configservice.GetUrlImgItem(image, scaleTo);
    return url;
  }

  startTimerImg() {

    if (!this._Service.loadImm) {
      clearInterval(this.intervalId);
      this.intervalId =setInterval(() => {
        this.ImgLoading();
       this._Service.loadImm = true;
      /* console.log("Cambiando foto");*/

      }, 1000); // Cambia el tiempo de espera según sea necesario
    }

  }


}
