import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {  ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { tblProduct } from "../../../Models/Structure/tblProduct";
import { ItemProductView } from "../../Product/ProductItem/app.product-item-product";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { MenuPhone } from "../../Common/MenuPhone/app.menu-phone";
import { ItemRowProductView } from "../../Product/ProductItemRow/app.product-item-row-product";




@Component({
  standalone: true,
  selector:'app-product-list-favorite-search',
  templateUrl: './app.product-list-favorite-search.component.html',
  styleUrls: ['app.product-list-favorite-search.css'],
  imports: [ItemProductView, ItemRowProductView, LoadingComponent, FormsModule, MenuPhone]
})


export class ListFavorite implements OnInit {


  type: string = "all";
  page: number =0;
  _titleService: Title;
  _param: ActivatedRoute;
  _search: FavoriteService;

  
  _productItemService: ProductItemService;

  constructor(private route: Router, titleService: Title, param: ActivatedRoute, search: FavoriteService, productItemService:ProductItemService) {
    this._param = param;
    this._titleService = titleService; 
    this._search = search; 
    this._productItemService = productItemService; 
  }
    ngOnInit(): void {
      this._titleService.setTitle('Mis Productos');
      this.Search();
    }

  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);

  }

  Search() {
    this._search.GetAllProductFavorite(this.page);
  }
}
