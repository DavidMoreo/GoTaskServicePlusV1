import { Component } from "@angular/core";
import { PermissionComponent } from "../../Permission/app.permission";
import { Title } from "@angular/platform-browser";





@Component({
  standalone: true,
  selector: "app-Iot",
  templateUrl: './app.Iot.component.html',
  styleUrls: ['app.Iot.css'],
  imports: [ PermissionComponent]

})
export class IotComponent  {

  _visibleItem: number = 0;
 

  constructor(private _titleService: Title) {
 
    this._titleService.setTitle('Iot Con Esp 8266');
  }

   



}
