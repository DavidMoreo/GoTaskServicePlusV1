import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList, SimpleChanges } from "@angular/core";

import { Location } from '@angular/common';

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { AlertBuyProductService } from "../../../Services/Customer/AlertBuyProductService";
import { tblProduct } from "../../../Models/Structure/tblProduct";



@Component({
  standalone: true,
  selector: "app-alert-buy-product",
  templateUrl: './app.alert-buy-product-component.html',
  styleUrls: ['app.alert-buy-product.css'],
  imports: [FormsModule, CommonModule]


})

export class AlertBuyProductComponent implements OnInit {
  _configservice: ConfigService;
  _router: Router;

  _isNotLlogin: boolean;

/*  @ContentChild("header") cardContentHeader: ElementRef;*/
  _location: Location;
  _BuyProduct: AlertBuyProductService;
  constructor(private location: Location, configservice: ConfigService, cdRef: ChangeDetectorRef, private router: Router, BuyProduct: AlertBuyProductService ) {
    this._configservice = configservice;
    this._location = location;

    this._router = router;
    this._BuyProduct = BuyProduct;
    /*    this._autenticate = autenticate;*/


  }

  ngOnInit(): void {
    
  }



  Close() {
    this._BuyProduct.product = null;
  }

  CartProduct() {
    this.Close();
    this._BuyProduct.BuyProduct("product-cart");
  }

  GetImgUrl(product: tblProduct) {

    var url = this._configservice.GetUrlImgItem(product.firsImg, "PC");
   
    return url;

  }

}
