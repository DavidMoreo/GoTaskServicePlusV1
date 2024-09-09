import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router'
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { SelectProductService } from "../../../Services/Product/SelectProductService";
import { ImgItem, tblConcepValue, tblProduct } from "../../../Models/Structure/tblProduct";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { CommonModule } from "@angular/common";
import { LoadingServiceControl } from "../../../Services/Common/LoadingService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { CartService } from "../../../Services/Customer/CartService";
import { AlertBuyProductService } from "../../../Services/Customer/AlertBuyProductService";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { MapComponent } from "../../Common/Mapa/app.common-mapa";



@Component({
  standalone: true,
  selector: 'app-product-select-product',
  templateUrl: './app.product-select-product-component.html',
  styleUrls: ['app.product-select-product.css'],
  imports: [LoadingComponent, CommonModule, MapComponent]

})


export class SelectProduct implements OnInit, AfterViewInit {

  _param: ActivatedRoute;
  id: string = "0";
  @ViewChild('zoom') zoom: ElementRef;
  globalListenFunc: Function;

/*  @ViewChild('map', { static: false }) map: ElementRef<HTMLIFrameElement>;*/

  _imgSelect: ImgItem;
  _product: tblProduct;
  _service: SelectProductService;
  _configservice: ConfigService;

  _CartService: CartService;
  _ProductItemService: ProductItemService;
  private _cdRef: ChangeDetectorRef;
  _BuyProduct: AlertBuyProductService;
  counHttp: number = 0;

  constructor(private routeActivate: ActivatedRoute, private render: Renderer2, service: SelectProductService, param: ActivatedRoute, configservice: ConfigService, cdRef: ChangeDetectorRef, CartService: CartService, ProductItemService: ProductItemService, BuyProduct: AlertBuyProductService, private _Util: UtilitiService) {
    this._service = service;
    this._param = param;
    this._cdRef = cdRef;
    this._configservice = configservice;
    this._CartService = CartService;
    this._BuyProduct = BuyProduct;
    this._ProductItemService = ProductItemService;
  }


  @HostListener('mouseover', ['$event.target'])
  onClick(btn: Event) {



  }





  GetUrlImg(image: ImgItem) {
    var url = this._configservice.GetUrlImgItem(image, "PC");
    return url;
  }



  GetUrlImgSelect(image: ImgItem) {
    var url = "";
    if (this._imgSelect == undefined || this._imgSelect == null) {
      url = this._configservice.GetUrlImgItem(image, "PC");
    } else {

      url = this._configservice.GetUrlImgItem(this._imgSelect, "PC");
    }

    return url;


  }



  ngOnInit(): void {
    this._param.params.subscribe((param: Params) => {
      this.id = param["id"];     
      this.Search();
    
    });
    

  }

  SelectionImg(img: ImgItem) {
    this._imgSelect = img;
    this._cdRef.detectChanges();
  }



  Search() {
    this.ReloadHttp();
    this._service.GetProductById(this.id).subscribe((e) => {
      this._product = e.data;     
      this._Util.scrollToBottom("scrollSelect", 400);
      this.LoadMap();
    });
  }



  async ReloadHttp() {
    this.counHttp++;
    if (this.counHttp <= 8) {
      var timer = setInterval(() => {
        if (this._product == undefined) {
          clearInterval(timer);
          this.Search();

        }
        else {
          clearInterval(timer);
        }
      }, 50000)
    }

  }



  offZoon() {
    const zoomItem = this.zoom.nativeElement;

    this.render.addClass(zoomItem, "img-zoom-off");
    this.render.removeClass(zoomItem, "img-zoom-on");

  }

  onZoon(url: string) {
    const zoomItem = this.zoom.nativeElement;

    this.render.addClass(zoomItem, "img-zoom-on");
    this.render.removeClass(zoomItem, "img-zoom-off");

  }


  CartBuyAdd() {

    this._CartService.AddProductCart(this._product, 1, false);


  }


  CartRemove() {
    this._CartService.RemoveCartById(this._product.id);

  }


  IsBuyCart() {

    // Pendiente


    if (this._CartService._listProductCart) {
      var exist = this._CartService._listProductCart.filter(f => f.idProduct == this._product.id);
      if (exist != null && exist.length > 0) {
        return true;
      }
    }
    return false;


  }


  CartProduct() {
    this.CartBuyAdd();
    this._BuyProduct.product = null;
    this._BuyProduct.BuyProduct("product-cart");
  }



  isDragging = false;
  startX = 0;
  startY = 0;
  positionX = 0;
  positionY = 0;
  scale = 1;
  zoomOrigin: number = 1;




  onDragStart(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.startX = clientX - this.positionX;
    this.startY = clientY - this.positionY;
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (this.isDragging) {
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

      // Calcular la diferencia entre la posición actual y la nueva posición
      const deltaX = (clientX - this.startX) - this.positionX;
      const deltaY = (clientY - this.startY) - this.positionY;

      // Definir una velocidad de suavizado
      const smoothness = 0.29; // Puedes ajustar este valor según la velocidad de suavizado deseada

      // Aplicar suavizado para hacer movimientos lentos y suaves
      this.positionX += deltaX - smoothness;
      this.positionY += deltaY - smoothness;
    }
  }


  onDragEnd() {
    this.isDragging = false;
  }



  Zoon(mode: boolean) {

    if (mode) {
      this.zoomOrigin = 2.5;
      /*      alert(this.zoomOrigin);*/

    } else {
      this.zoomOrigin = 1;
    }

    this.positionX = 0;
    this.positionY = 0;
    this._cdRef.detectChanges();
  }

  languageTraslate(value: string) {
    return value;
  }



  IsService(product: tblProduct) {

    if (product.isProduct) return true;
    if (!product.isProduct) {
      if (product.actualPrice > 0)
        return true;
    }
    return false;
  }






  GetMap(product: any, name: string = ""): string {

    let data = "";
    if (!product.adress) return "";

    const coordinates = product.adress.value;
    if (!coordinates) return "";

    if (name === "Lat") {
      data = coordinates.replace("lat:", "").split(',')[0].replaceAll(" ", "");

    } else if (name === "Lng") {
      data = coordinates.replace("lng:", "").split(',')[1].replaceAll(" ", "");

    } else {
      data = coordinates.trim().replace("lat:", "").replace("lng:", "").replace(" ", "")
     
    }
   
    return data;
  }

  LoadMap() {
    console.log("Load map");
    var timer = setInterval(() => {     

       
     
        //const iframe = this.map.nativeElement;
        const lat = this.GetMap(this._product, "Lat");
        const lng = this.GetMap(this._product, "Lng");
        var url = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3976.312870821943!2d" + lng + "!3d" + lat + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwNDInNTYuMiJOIDc0wrAxMycyNC42Ilc!5e0!3m2!1ses!2sco!4v1719853653479!5m2!1ses!2sco";

       // iframe.src = url;
        clearInterval(timer);
    

     // console.log("Map", this.map);

    }, 1100)
   
  }


  ngAfterViewInit() {

   /* this.LoadMap();*/

  }

}
