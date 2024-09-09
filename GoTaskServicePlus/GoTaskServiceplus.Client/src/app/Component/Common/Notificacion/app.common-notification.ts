import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AlertService } from "../../../Services/Common/AlertService";
import { Msg } from "../../../Models/Common/ModelAlert";




@Component({
  standalone:true,
  selector: "app-common-notification",
  templateUrl: './app.common-notification.component.html',
  styleUrls: ['./app.common-notification.css'],
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }


  constructor() { }

  showNotification(title: string, options?: NotificationOptions) {
    // Comprobar si las notificaciones son soportadas por el navegador
    if (!('Notification' in window)) {
      console.error('Este navegador no soporta notificaciones');
      return;
    }

    // Solicitar permiso para mostrar notificaciones
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Mostrar la notificación
        const notification = new Notification(title, options);
      }
    });
  }
 

 
 

}
