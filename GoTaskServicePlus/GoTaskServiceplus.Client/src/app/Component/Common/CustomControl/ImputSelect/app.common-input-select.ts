import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { AlertService } from "../../../../Services/Common/AlertService";




@Component({
  standalone:true,
  selector: "app-common-input-select",
  templateUrl: './app.common-input-select.component.html',
  styleUrls: ['./app.common-input-select.css'],
  imports: [CommonModule]
})
export class SelectInputComponent implements OnInit {

  @Input({ required: false }) value: string = "";
  @Input({ required: false }) isRequired: boolean = false;
  @Input({ required: false }) enable: boolean = true;
  @Input({ required: true }) nameId!: string;
  @Input({ required: false }) list: Array<any> = new Array();
  @Output() EventChanged = new EventEmitter<string>();

  @ViewChild('selectId') selectId!: ElementRef;

  start: boolean = true;
  select: string = "";
  constructor(private _cdRef: ChangeDetectorRef) { }
   
  ngOnInit(): void {

  }

  OnSelectChange(event: any) {
    this.value = event.target.value;    
    if (this.select == "0") this.select = "";
    this.EventChanged.emit(this.value);
  }


  GetList() {
    if (this.list == undefined) this.list = new Array(); 
    return this.list;
  }

  GetValue() {

    //if(this.value != "") return this.value;

    if (this.value != undefined && this.value != null) {
      if (this.list != null) {
        var data = this.list.find(s => s.id == this.value);
        if (data != undefined) {
          return data.name;
        }
      }
    }
    //console.log("Value", value);
  
   // if (this.select != "" && this.value != "Seleccionar") return this.list.find(s => s.id == this.select).name ;

    return "Seleccionar";
  }

  languageTraslate(value: string) {
    return value;
  }

}
