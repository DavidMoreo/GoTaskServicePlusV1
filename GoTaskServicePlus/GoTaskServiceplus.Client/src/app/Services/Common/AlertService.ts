import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Message, Msg } from '../../Models/Common/ModelAlert';


@Injectable({
  providedIn: 'root'
})

export class AlertService {

  private intervalAlertClosed: any;
  private timer: number = 9000;
  private msg: Msg = new Msg();


  AlertApi(msg: Array<Message>, color: string = "green", timer: number = 12000) {
    if (msg) {
      clearInterval(this.intervalAlertClosed);
      var data = msg[0];
      this.msg.msg = data.msg;
      this.msg.color = color;
      this.msg.status = true;
      this.StartTimerAlert(timer);
    }
  }


  Alert(msg: string, color: string = "green", timer: number = 12000) {
    clearInterval(this.intervalAlertClosed);
    this.msg.msg = msg;
    this.msg.color = color;
    this.msg.status = true;
    this.StartTimerAlert(timer);
  }


  StartTimerAlert(timer: number) {
    this.intervalAlertClosed = setInterval(() => {
      this.CloseAlert();
      clearInterval(this.intervalAlertClosed);
    }, timer);
  }

  GetMsg() {

    return this.msg;
  }

  CloseAlert() {
    this.msg.msg = "";
    this.msg.status = false;
    this.msg.color = "";
    clearInterval(this.intervalAlertClosed);
  }

}

