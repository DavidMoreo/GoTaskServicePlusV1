import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Coordinates } from '../../Models/Common/Coordinates';
import { CommonService } from './CommonService';


@Injectable({
  providedIn: 'root'
})

export class GpsService {



  public constructor(private _CommonService: CommonService) {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          this.GetCoordinates();
        }
      });
    } else {
      console.log('El navegador no soporta el API de permisos');
    }
  }

   watchId:any;

  GetCoordinates() {
    
   var result = new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocalización no está disponible en este dispositivo.");
      } else {
        const options = {
          enableHighAccuracy: true, // Solicitar la máxima precisión posible
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordenadas = new Coordinates();
            coordenadas.latitud = position.coords.latitude;  
            coordenadas.longitud = position.coords.longitude;
            resolve(coordenadas);
          },
          (error) => {
            reject(`Error al obtener la ubicación: ${error.message}`);
          },
          options // Pasar las opciones al método getCurrentPosition
        );
      }
    });

    result.then((e) => {
      this._CommonService._StorageService.SetGps(JSON.stringify(e));
      this.GetCoordinatesAuto();
    })
  }

  GetCoordinatesAuto() {
   
    var result = new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocalización no está disponible en este dispositivo.");
      } else {
        const options = {
          enableHighAccuracy: true, // Solicitar la máxima precisión posible
          timeout: 500000,
          maximumAge:0
        };

         this.watchId = navigator.geolocation.watchPosition(
          (position) => {
            const coordenadas = new Coordinates();
            coordenadas.latitud = position.coords.latitude;
            coordenadas.longitud = position.coords.longitude;
            resolve(coordenadas);
          },
          (error) => {
            reject(`Error al obtener la ubicación: ${error.message}`);
          },
          options // Pasar las opciones al método watchPosition
        );

        // Puedes guardar el ID del watcher si necesitas detenerlo en el futuro
        // Por ejemplo: navigator.geolocation.clearWatch(watchId);
      }
    });


    result.then((e) => {
    /*  window.localStorage.setItem("GPS", JSON.stringify(e));*/
      this._CommonService._StorageService.SetGps(JSON.stringify(e));
    })
  }



  ChangedDistance() {
    var timer = setInterval(() => {
      /*console.log("gps");*/
      clearInterval(timer);
     this. GetCoordinatesAuto();
    }, 7000);
  }



  SetCordinates() {
    // this.GetCoordinatesAuto();
    this.GetCoordinates();
  }



  DeleteCordinates() {
        navigator.geolocation.clearWatch(this.watchId);
    this._CommonService._StorageService.ClearGps();    
  }

  GetGpsActive() {
    var gps = this._CommonService._StorageService.GetGps();
    if (gps != null && gps != undefined && gps != "")
      return true;
    else
      return false;

  }


  GetGps(): Coordinates {
    var cordinates = new Coordinates();
    var gps = this._CommonService._StorageService.GetGps();

    if (this.GetGpsActive() && gps != null) {
      cordinates = JSON.parse(gps);
      return cordinates;
    }
    else
      return cordinates;

  }


  GetDistance(lat: number, lng: number) {

    if (this.GetGpsActive()) {
      var GpsCustomer = this.GetGps();

      return this.CalculateDistance(lat, lng, GpsCustomer.latitud, GpsCustomer.longitud);
    }
    return "Gps ❔";
  }


  CalculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    // Convertir todas las coordenadas a radianes
    lat1 = this.gradosARadianes(lat1);
    lon1 = this.gradosARadianes(lon1);
    lat2 = this.gradosARadianes(lat2);
    lon2 = this.gradosARadianes(lon2);
    // Aplicar fórmula
    const RADIO_TIERRA_EN_KILOMETROS: number = 6371;
    let diferenciaEntreLongitudes: number = (lon2 - lon1);
    let diferenciaEntreLatitudes: number = (lat2 - lat1);
    let a: number = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var text = (RADIO_TIERRA_EN_KILOMETROS * c) >= 1 ? " km" : "m";
    var number = "";




    if ((RADIO_TIERRA_EN_KILOMETROS * c) >= 1) {
      number = (RADIO_TIERRA_EN_KILOMETROS * c).toString().substr(0, 3);
    } else {
      number = ((RADIO_TIERRA_EN_KILOMETROS * c) * 1000).toString().substr(0, 3);
      
    }


    var cor = number + " " + text;

    return cor;


  }









  gradosARadianes = (grados: number): number => {
    return grados * Math.PI / 180;
  };

  // Definir tipos para los objetos cdmx y habana






}

