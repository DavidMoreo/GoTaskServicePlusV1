import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";




@Component({
  standalone:true,
  selector: "app-common-loading-partial",
  templateUrl: './app.common-loading-partial.component.html',
  styleUrls: ['./app.common-loading-partial.css']
})
export class LoadingPartialComponent  {

  _Service: LoadingServiceControl;
  constructor(service: LoadingServiceControl) {
    this._Service = service;    
  }

  close() {
    this._Service._active = false;
  }
  open() {
    this._Service._active = true;
  }

}
