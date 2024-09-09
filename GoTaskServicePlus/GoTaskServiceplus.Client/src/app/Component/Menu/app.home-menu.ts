import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from "@angular/core";

import { Inject } from '@angular/core';
import { interval } from 'rxjs';
import { ConfigService } from "../../Services/Common/ConfigService";
import { ControInfo } from "../Common/ScrollInfo/app.common-scroll-info.component";
import { ListProduct } from "../Product/ListProduct/app.product-list-product";
import { Menu } from "../../Models/Home/MenuModel";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PermissionComponent } from "../Permission/app.permission";



@Component({
  standalone:true,
  selector: "app-home-menu",
  templateUrl: './app.home-menu-component.html',
  styleUrls: ['app.home-menu.css'],
  imports: [FormsModule, CommonModule, PermissionComponent] 

})

export class MenuComponent implements OnInit {
  _configservice: ConfigService;
  _visibleItem: number = 0;
  private _cdRef: ChangeDetectorRef;
  private _router: Router;


  constructor(configservice: ConfigService, cdRef: ChangeDetectorRef, private router: Router) {
    this._configservice = configservice;
    this._cdRef = cdRef;
    this._router = router;   
  }




  ngOnInit(): void {


    }  

  LoadMenuAdmin() {
    var _ListMenu = new Array<Menu>();
    var item = new Menu();
    item.id = "0";
    item.title = "Producto";
    item.description = "Crea o edita productos, carga imágenes, pública u ocultar los productos creados.";
    item.ico = "box2-fill";
    item.route = "add-product";

    _ListMenu.push(item);
    item = new Menu();
    item.id = "1";
    item.title = "Conceptos";
    item.route = "conceptual-product";
    item.ico = "boxes";
    item.description = "Crea o edita conceptos, estos permiten clasificar cada producto";
    _ListMenu.push(item);

   
    
    item = new Menu();
    item.id = "3";
    item.title = "Compañia";
    item.route = "admin-company";
    item.ico = "building";
    item.description = "Crea o edita empresas";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "3";
    item.title = "Sucursal";
    item.route = "admin-project";
    item.ico = "buildings";
    item.description = "Crea o edita tus sucursales";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "3";
    item.title = "Usuarios";
    item.route = "admin-user";
    item.ico = "people";
    item.description = "Editar usuarios, activar, desactivar, eliminar";
    _ListMenu.push(item);


     item = new Menu();
    item.id = "3";
    item.title = "Roles";
    item.route = "admin-rol-user";
    item.ico = "people";
    item.description = "Editar roles, activar, desactivar, eliminar";
    _ListMenu.push(item);


    item = new Menu();
    item.id = "5";
    item.title = "Configurar chat bot";
    item.route = "chat-config";
    item.ico = "chat-square-dots-fill";
    item.description = "Configurar chat bot";
    _ListMenu.push(item);
   
    item = new Menu();
    item.id = "6";
    item.title = "Menu de sucursales";
    item.route = "project-menu";
    item.ico = "signpost-split";
    item.description = "Cambiar entre sucursales";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "6";
    item.title = "Ventas";
    item.route = "admin-buy";
    item.ico = "stopwatch";
    item.description = "Ventas por status";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "7";
    item.title = "Busquedas";
    item.route = "admin-list-search";
    item.ico = "search";
    item.description = "Historial de busquedas";
    _ListMenu.push(item);


     item = new Menu();
    item.id = "7";
    item.title = "Seguimiento";
    item.route = "store-tracking";
    item.ico = "suitcase-lg";
    item.description = "Seguimiento nuevo";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "7";
    item.title = "Mapa";
    item.route = "map-store";
    item.ico = "bi-map-fill";
    item.description = "Mapa";
    _ListMenu.push(item);



    


    return _ListMenu;
  }

  LoadMenuCustomer() {
    var _ListMenuCustomer = new Array<Menu>();




    var item = new Menu();
    item.id = "0";
    item.title = "Aprende con Go Task Service";
    item.description = "Curso de desarrollo web, Android e IoT y más";
    item.ico = "cart";
    item.route = "tools";
    _ListMenuCustomer.push(item);

     var item = new Menu();
    item.id = "0";
    item.title = "Recuperar contraseña";
    item.description = "Recuperar contraseña con tu número de celular.";
    item.ico = "lock-fill";
    item.route = "changed-password-user";
    _ListMenuCustomer.push(item);



    var item = new Menu();
    item.id = "0";
    item.title = "Carrito de compras";
    item.description = "Tus productos";
    item.ico = "cart";
    item.route = "product-cart";
    _ListMenuCustomer.push(item);


    item = new Menu();
    item.id = "0";
    item.title = "Mis compras";
    item.description = "Compras realizadas para seguimiento";
    item.ico = "bag-fill";
    item.route = "product-buy";
    _ListMenuCustomer.push(item);

    item = new Menu();
    item.id = "0";
    item.title = "Favoritos";
    item.description = "Tus Productos guardados como favoritos.";
    item.ico = "heart-fill";
    item.route = "user-favorite";
    _ListMenuCustomer.push(item);
    
    item = new Menu();
    item.id = "0";
    item.title = "Buscar productos";
    item.description = "Puedes ver y buscar productos locales";
    item.ico = "search";
    item.route = "select-product-search/all";
    _ListMenuCustomer.push(item);


    item = new Menu();
    item.id = "0";
    item.title = "Descarga videos";
    item.description = "Descarga videos desde Youtube con la url";
    item.ico = "file-play-fill";
    item.route = "youtube-download";
    _ListMenuCustomer.push(item);

    item = new Menu();
    item.id = "0";
    item.title = "Texto a voz";
    item.description = "Convierte texto o voz, desde texto o PDF";
    item.ico = "file-music-fill";
    item.route = "text-to-speech";
    _ListMenuCustomer.push(item);



    item = new Menu();
    item.id = "4";
    item.title = "Home";
    item.route = "home";
    item.ico = "house";
    item.description = "Página principal";
    _ListMenuCustomer.push(item);


    item = new Menu();
    item.id = "4";
    item.title = "chat IA";
    item.route = "app-chat-bot-msg";
    item.ico = "robot";
    item.description = "Chat con IA";
    _ListMenuCustomer.push(item);



    
    return _ListMenuCustomer;

  }


  LoadMenuVenndor() {
    var _ListMenu = new Array<Menu>();


    var item = new Menu();
    item.id = "0";
    item.title = "Producto";
    item.description = "Crea o edita productos, carga imágenes, pública u ocultar los productos creados.";
    item.ico = "box2-fill";
    item.route = "add-product";

    _ListMenu.push(item);



    var item = new Menu();
    item = new Menu();
    item.id = "7";
    item.title = "Activar productos";
    item.route = "app-vendor-active-product";
    item.ico = "box2-fill";
    item.description = "Vendedor podra activar productos";
    _ListMenu.push(item);

    var item = new Menu();
    item = new Menu();
    item.id = "7";
    item.title = "Editar Sucursal";
    item.route = "update-project-vendor";
    item.ico = "shop";
    item.description = "Editar nombre, ubicación, telefono , horarios ";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "2";
    item.title = "Conceptos por empresa";
    item.route = "customer-concept";
    item.ico = "boxes";
    item.description = "Crea o edita direcciones, activar productos";
    _ListMenu.push(item);

      item = new Menu();
    item.id = "2";
    item.title = "Mis ventas";
    item.route = "list-buy-vendor";
    item.ico = "clock-history";
    item.description = "Mis ventas";
    _ListMenu.push(item);

    item = new Menu();
    item.id = "4";
    item.title = "Referencia";
    item.route = "refer-product";
    item.ico = "gear-wide-connected";
    item.description = "Referencia de Productos";
    _ListMenu.push(item);
   
    return _ListMenu;
   
  }

  Route(name: string) {   
    this._router.navigate([name]);
  }



}
