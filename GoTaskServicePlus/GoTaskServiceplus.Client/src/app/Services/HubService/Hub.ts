import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Msg } from '../../Models/Common/ModelAlert';
import { ConfigService } from '../Common/ConfigService';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor(private host: ConfigService) { }

  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.host.GetHostApi()+'Hub') // Ajusta esta URL según la ruta de tu hub de SignalR
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Conexión exitosa con SignalR');       
        this.enviarMensaje("Prueba");

      
      })
      .catch(err => console.error('Error al conectar con SignalR:', err));
  }


  enviarMensaje(mensaje: string) {
    this.hubConnection.invoke('Send', mensaje) // Reemplaza 'EnviarMensaje' con el nombre del método en tu servidor SignalR
      .catch(err => console.error('Error al enviar mensaje a SignalR:', err));
  }

  // Método para escuchar eventos desde el servidor
  addReceiveMessageListener(callback: (message: string) => void) {
    this.hubConnection.on('msg', (message: string) => {   
      callback(message);
    });
  }
}
