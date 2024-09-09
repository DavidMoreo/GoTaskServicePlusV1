import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { AlertService } from "../../../Services/Common/AlertService";
import * as L from 'leaflet';
import { GpsService } from "../../../Services/Common/Gopositioning";
import { CommonService } from "../../../Services/Common/CommonService";
import { Coordinates } from "../../../Models/Common/Coordinates";

@Component({
  standalone: true,
  selector: "app-common-mapa",
  templateUrl: './app.common-mapa.component.html',
  styleUrls: ['./app.common-mapa.css']
})
export class MapComponent implements OnInit {
  map: L.Map;

  @Input() Height: string = "300px";
  @Input() IsList: boolean = false;
  @Input() Range: number = 100;
  @Input() coordinaesProyectLat: string = "";
  @Input() coordinaesProyectLng: string = "";
  @Input() ListStoreLocation: L.LatLngExpression[] =
    [[4.713342394520654, -74.21854652795646],
    [4.719342394520654, -74.22054652795646], // Tienda 1
    [4.715342394520654, -74.21654652795646], // Tienda 2
    [4.710342394520654, -74.21954652795646], // Tienda 3
    [4.712342394520654, -74.22354652795646]  // Tienda 4
    ];



  // Coordenadas de los dos puntos
  myLocation: L.LatLngExpression = [4.713342394520654, -74.21854652795646];
  storeLocation: L.LatLngExpression = [4.713342394520654, -74.21854652795646]; // Reemplaza estas coordenadas con las de la tienda

  constructor(private _Coordinates: GpsService) { }

  ngOnInit(): void {
    var timer = setTimeout(() => {
   
    var coordinates = this._Coordinates.GetGps();
    this.myLocation = [coordinates.latitud, coordinates.longitud];
    
      if (this.map != undefined || true) {

      
        if (!this.IsList) {

          this.storeLocation = [Number.parseFloat(this.coordinaesProyectLat), Number.parseFloat(this.coordinaesProyectLng)];
          this.LoadMap();
          this.initMap();
        } else {
          this.LoadMap();
          this.UpdateMap(this.myLocation, this.ListStoreLocation);
        }
        clearTimeout(timer);
      }
    }, 100);

  }



  LoadMap() {
  
      if (!this.map) {
        this.map = L.map('map').setView(this.myLocation, 19);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
       
      }
  
  }


  initMap(): void {
    // Inicializa el mapa en la ubicación del vendedor


    // Definir íconos personalizados
    const myIcon = L.icon({
      iconUrl: 'assets/CustomerGps.png', // Ruta a la imagen personalizada
      iconSize: [38, 38], // Tamaño del ícono
      iconAnchor: [22, 38], // Punto del ícono que se corresponderá con la posición del marcador
      popupAnchor: [-3, -38] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
    });

    const storeIcon = L.icon({
      iconUrl: 'assets/StoreGps.png', // Ruta a la imagen personalizada
      iconSize: [28, 38], // Tamaño del ícono
      iconAnchor: [10, 35], // Punto del ícono que se corresponderá con la posición del marcador
      popupAnchor: [-3, -40] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
    });

    // Añade un marcador en la ubicación del vendedor con el ícono personalizado
    const myMarker = L.marker(this.myLocation, { icon: myIcon }).addTo(this.map);
    myMarker.bindPopup('Tú').openPopup();

 
    // Añade un marcador en la ubicación de la tienda con el ícono personalizado
    const storeMarker = L.marker(this.storeLocation, { icon: storeIcon }).addTo(this.map);
    storeMarker.bindPopup('Ubicación tienda');

    // Dibuja una línea entre los dos puntos
    const line = L.polyline([this.myLocation, this.storeLocation], { color: 'blue' }).addTo(this.map);

    // Ajusta el mapa para mostrar ambos puntos y la línea
    this.map.fitBounds(line.getBounds());
  }







  UpdateMap(clientCoords: L.LatLngExpression, storeCoordsList: L.LatLngExpression[]): void {
   
    // Actualiza la ubicación del cliente
    this.myLocation = clientCoords;

    // Limpia los marcadores y líneas previas
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        this.map.removeLayer(layer);
      }
    });

    // Añade un nuevo marcador en la ubicación del cliente
    const myIcon = L.icon({
      iconUrl: 'assets/CustomerGps.png', // Ruta a la imagen personalizada
      iconSize: [38, 38], // Tamaño del ícono
      iconAnchor: [22, 38], // Punto del ícono que se corresponderá con la posición del marcador
      popupAnchor: [-3, -38] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
    });
    const myMarker = L.marker(this.myLocation, { icon: myIcon }).addTo(this.map);
    myMarker.bindPopup('Tú').openPopup();

    // Añade nuevos marcadores en las ubicaciones de las tiendas y dibuja líneas
    const storeIcon = L.icon({
      iconUrl: 'assets/StoreGps.png', // Ruta a la imagen personalizada
      iconSize: [28, 38], // Tamaño del ícono
      iconAnchor: [10, 35], // Punto del ícono que se corresponderá con la posición del marcador
      popupAnchor: [-3, -40] // Punto desde el cual el popup debe abrirse relativo al iconAnchor
    });

    storeCoordsList.forEach((storeCoords) => {
      const storeMarker = L.marker(storeCoords, { icon: storeIcon }).addTo(this.map);
      storeMarker.bindPopup('Ubicación tienda');

      // Dibuja una línea entre el cliente y cada tienda
     /* const line = L.polyline([this.myLocation, storeCoords], { color: 'blue' }).addTo(this.map);*/
    });

    // Ajusta el mapa para mostrar todos los puntos y las líneas
    const bounds = L.latLngBounds([this.myLocation, ...storeCoordsList]);
    this.map.fitBounds(bounds);
  }










}
