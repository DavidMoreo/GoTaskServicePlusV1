
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ShareControlService } from "../../../Services/Common/ShareControlService";
import { tblProduct } from "../../../Models/Structure/tblProduct";
import { ShareService } from "../../../Services/Common/ShareApi";




@Component({

  selector: "app-common-share",
  templateUrl: './app.common-share.component.html',
  styleUrls: ['./app.common-share.css'],
 
})
export class ShareComponent implements OnInit {

  _Service: ShareControlService;
  _Share: ShareService;

  constructor(service: ShareControlService, _Share: ShareService, private cdRef: ChangeDetectorRef) {
    this._Service = service;
    this._Share = _Share;
  }

  ngOnInit(): void {
    
  }

  Share() {
    this._Share.shareActive = true;
    this.cdRef.detectChanges();
    this._Service.Share();
  }

  DowloadImgBase64(product: tblProduct, url: string) {
    this._Service.GetFileBase64(product,url);
  }

  ClearUrl(text: string) {
   
  }

  IsService(product: tblProduct) {

    if (product.isProduct) return true;
    if (!product.isProduct) {
      if (product.actualPrice > 0)
        return true;
    }
    return false;
  }


}
