import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ConfigService } from "../../Services/Common/ConfigService";
import { Title } from "@angular/platform-browser";
import { PermissionComponent } from "../Permission/app.permission";




@Component({
  standalone: true,
  selector: "app-tools",
  templateUrl: './app.tools.component.html',
  styleUrls: ['app.tools.css'],
  imports: [ PermissionComponent]

})
export class ToolsComponent  {

  _configservice: ConfigService;
  _visibleItem: number = 0;
  _titleService: Title;

  constructor(configservice: ConfigService, titleService: Title) {
    this._configservice = configservice;  
    this._titleService = titleService;
    this._titleService.setTitle('Más Herramientas');
  }

   



}
