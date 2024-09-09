import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../../Common/ConfigService";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})



export class NotificationService {

  _http: HttpClient;
  _host: ConfigService;

  constructor(private http: HttpClient, private host: ConfigService) {
    this._host = host;
    this._http = http;
  }


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

