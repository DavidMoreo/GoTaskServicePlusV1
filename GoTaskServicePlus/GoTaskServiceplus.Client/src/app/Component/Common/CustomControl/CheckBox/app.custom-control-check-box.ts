import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";




@Component({
  standalone:true,
  selector: "app-common-custom-check-box",
  templateUrl: './app.custom-control-check-box.component.html',
  styleUrls: ['./app.custom-control-check-box.css'],
  imports: [CommonModule]
})
export class CheckBoxComponent implements OnInit {



  @Input() Status!: boolean;
  @Input() Changed!: (parametro: boolean) => void;

  constructor() {
 
  }
  ngOnInit(): void {
    
  }

  ChangedStatus() {
    this.Status = !this.Status;
    this.Changed(this.Status);
  }

}
