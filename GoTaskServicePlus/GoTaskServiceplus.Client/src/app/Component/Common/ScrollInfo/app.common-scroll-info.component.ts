import { Component } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";



@Component({
  standalone: true,
  selector: 'app-common-scroll-info',
  templateUrl:'./app.common-scroll-info.component.html',
  styleUrls: ['app.common-scroll-info.component.css']
})


export class ControInfo {
  _configservice: ConfigService;


  constructor(configservice: ConfigService) {
    this._configservice = configservice;

  }


}
