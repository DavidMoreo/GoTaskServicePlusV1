
import {  Component, OnInit, ContentChild, Input} from "@angular/core";



@Component({
  standalone: true,
  selector: "app-common-popup-msg",
  templateUrl: './app.common-popup-msg.component.html',
  styleUrls: ['./app.common-popup-msg.css']
})
export class PopupMsgComponent implements OnInit {

  @Input() count:string = "";
  constructor() {
  }

  ngOnInit(): void {
   
  }


  }





