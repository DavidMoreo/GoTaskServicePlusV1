
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AlertService } from "../../../Services/Common/AlertService";





@Component({
  selector: "app-common-alert",
  templateUrl: './app.common-alert.component.html',
  styleUrls: ['./app.common-alert.css']
})
export class AlertComponent implements OnInit {

  constructor(private _Service: AlertService) {
  }

  ngOnInit(): void {
   
  }

  CloseAlert() {
    return this._Service.CloseAlert();
  }

  GetAlert() {
    return this._Service.GetMsg();
    
  }





}
