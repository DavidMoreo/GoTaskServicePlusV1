import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";


import { Inject } from '@angular/core';
import { interval } from 'rxjs';
import { ConfigService } from "../../Services/Common/ConfigService";



@Component({
  selector: "app-add-product",
  templateUrl: './app.user-add-product.component.html',
  styleUrls: ['app.user-add-product.component.css']

})
export class AddProductComponent  {


  _configservice: ConfigService;
  baseApi: string;
  _visibleItem: number = 0;
  constructor(configservice: ConfigService) {
    this._configservice = configservice;
    this.baseApi = this._configservice.GetHostApi();
    
  }
  

  GetVisible(number: Number): boolean {

    if (this._visibleItem > 2) this._visibleItem = 0;
    console.log(this._visibleItem+" "+ number);
    return this._visibleItem === number;

  }

  
 public intervalSlider(): void {
   
  }


}
