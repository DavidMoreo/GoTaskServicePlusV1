import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "../../../../Services/Common/CommonService";




@Component({
  standalone:true,
  selector: "app-common-btn-on-off",
  templateUrl: './app.custom-control-btn-on-off.component.html',
  styleUrls: ['./app.custom-control-btn-on-off.css'],
  imports: [CommonModule]
})
export class BtnOnOffComponent implements OnInit {



  @Input() Status: boolean = false;
  @Input() Enable: boolean = true;
  @Input() Msg: string ="";
  @Output() Changed = new  EventEmitter<boolean>();


  constructor(private _CommonService: CommonService) {
 
  }
  ngOnInit(): void {
    
  }

  ChangedStatus(Status: boolean) {
  
    if (this.Enable) {
      this.Status = Status;
      this.Changed.emit(this.Status);
    } else {
      if (this.Msg!="")
        this._CommonService._AlertService.Alert(this.Msg);
    }
  }

}
