import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AlertService } from "../../../../Services/Common/AlertService";
import { FormsModule } from "@angular/forms";
import { CommonService } from "../../../../Services/Common/CommonService";
import { InputTextService } from "../../../../Services/Common/CustomControl/ImputTextService";
import { NameAndId } from "../../../../Models/Common/CustomControl/InputTextModel";




@Component({
  standalone: true,
  selector: "app-common-input-text",
  templateUrl: './app.common-input-text.component.html',
  styleUrls: ['./app.common-input-text.css'],
  imports: [CommonModule, FormsModule]
})
export class InputTextComponent implements OnInit, DoCheck {

  @Input({ required: false }) typeInput: string = "text";
  @Input({ required: false }) value: string = "";
  @Input({ required: false }) width: string = "90%";
  @Input({ required: false }) textTransform: string = "capitalize";
  @Input({ required: false }) isRequired: boolean = false;
  @Input({ required: false }) enable: boolean = true;
  @Input({ required: false }) enableFilter: boolean = false;
  @Input({ required: false }) isSelect: boolean = false;
  @Input({ required: false }) byPulsation: boolean = false;
  @Input({ required: false }) isMoney: boolean = false;
  @Input({ required: true }) nameId!: string;
  @Input({ required: false }) listAllData: Array<any> = new Array<any>;

  @Output() EventChanged = new EventEmitter<string>();
  @Output() EventSelect = new EventEmitter<string>();
  listFilter: Array<any> = new Array<any>;

  filterActive: boolean = false;
  valueMony: string = "$0";


  constructor(private _CommonService: CommonService, private _InputTextService: InputTextService) {

  }

  ngDoCheck(): void {   
    this.ChangedMoney(this.value);
    this.ChangedNumber(this.value);
  }

  ngOnInit(): void {
    this._InputTextService.Load();
    // this.listAllData = this._InputTextService.GetFilter();
   
    this.ChangedMoney(this.value);
    this.ChangedNumber(this.value);
  }

  GetValue() {
    if (this.valueMony == "") this.valueMony = "$0";
    if (this.isMoney) return this.valueMony;
    if (this.typeInput == "number") return this.valueMony;

    return this.value;
  }


  ChangedInput(event: any) {
    if (this.byPulsation)
      this.Data(event);

    this.Filter(event.target.value);
  }

  Change(event: any) {
    if (!this.byPulsation && !this.isSelect)
      this.Data(event);
  }

  SelectAction(select: any) {
    this.filterActive = false;
    if (select != "0") {    
      this.EventSelect.emit(select.id);
    }
  }


  Data(event: any) {

    let data = "";
    if (event)
      if (event.target)
        if (event.target.value) {
          data = this.ChangedMoney(event.target.value);
          data = this.ChangedNumber(event.target.value);
        }
    this.EventChanged.emit(data);
  }

  ChangedMoney(valueConvert: string) {
   
    if (this.isMoney) {
      try {
        this.valueMony = this.ConverCurrency(Number.parseInt(valueConvert.replace("$", "").replace(".", "")));
        return valueConvert;
      } catch (e) {
        return "-1";
      }

    } else {
      return valueConvert;
    }
  }

  ChangedNumber(valueConvert: string) {
    if (this.typeInput.toLowerCase() == "number") {
      this.valueMony = Number.parseInt(valueConvert.replace(".", "")).toString();
      return valueConvert;
    } else {
      return valueConvert;
    }
  }


  ConverCurrency(actualPrice: number) {
    if (isNaN(actualPrice)) actualPrice = 0;
    let numberValue = this._CommonService._UtilitiService.ConverCurrency(actualPrice);
    return numberValue;
  }


  GetLisFilter() {
    return this._InputTextService.GetFilter();
  }


  Filter(filter: string) {
    this.filterActive = filter != "";
    this.listFilter = new Array<NameAndId>;

    if (this.listAllData != undefined && this.listAllData != null) {
      this.listFilter = this.listAllData.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    }
    return this.listFilter;
  }


  IsActiveFilter() {
    return this.filterActive;
  }

}
