import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GridItem } from "../../../../Models/Common/GridModel";
import { GridCustomService } from "../../../../Services/Common/CustomControl/GridCustomService";
import { FormsModule } from "@angular/forms";




@Component({
  standalone: true,
  selector: "app-common-custom-grid",
  templateUrl: './app.custom-control-grid.component.html',
  styleUrls: ['./app.custom-control-grid.css'],
  imports: [CommonModule, FormsModule]
})
export class GridComponent implements OnInit, DoCheck {

  @Input() columns: string = "4";
  @Input() page: string = "0";
  @Output() Filter = new EventEmitter<string>();
  @Output() FilterCancel = new EventEmitter<string>();
  @Output() GoPage = new EventEmitter<number>();
  @Output() GoBackPage = new EventEmitter<number>();
  _Service: GridCustomService;

  filterValue: string = "";
  constructor(_Service: GridCustomService, private cdRef: ChangeDetectorRef) {
    this._Service = _Service;
  }

  ngDoCheck(): void {
    if (this.cdRef) this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    /*    this._Service.dataHeader = new Array<GridItem>();*/

  }

  FilterChanged() {
    this.Filter.emit(this.filterValue);
  }

  FilterChangeCancel() {
    this.FilterCancel.emit("");
  }

  GoPageAction() {
  
    this.GoPage.emit(1);
  }

  GoBackPageAction() {
   
    this.GoBackPage.emit(1);
  }


}
