import { Injectable, OnInit } from "@angular/core";
import { tblConcepValue } from "../../../Models/Structure/tblProduct";
import { NameAndId } from "../../../Models/Common/CustomControl/InputTextModel";
import { extend } from "leaflet";




@Injectable({
  providedIn: 'root'
})

export class InputTextService {
  
 private listAllData: NameAndId[] = new Array<NameAndId>;
 private listFilter: NameAndId[] = new Array<NameAndId>;

  Load(): void {
    this.listAllData = new Array<NameAndId>;
    //this.listAllData.push({ name :"prueba 1", id:"1"});
    //this.listAllData.push({ name :"prueba 2", id:"2"});
    //this.listAllData.push({ name :"prueba 3", id:"3"});
    //this.listAllData.push({ name :"prueba 4", id:"4"});
    //this.listAllData.push({ name: "prueba 5", id: "5" });
   
   
  }

  Filter(filter: string) {
    console.log("Filter", filter);
    this.listFilter = new Array<NameAndId>;
      console.log("this.listAllData", this.listAllData);
    if (this.listAllData != undefined &&   this.listAllData != null) {
      this.listFilter = this.listAllData.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
      console.log("this.listFilter", this.listFilter);
    }
    return this.listFilter;
  }

  GetFilter() {     
    return this.listAllData;
  }

}

