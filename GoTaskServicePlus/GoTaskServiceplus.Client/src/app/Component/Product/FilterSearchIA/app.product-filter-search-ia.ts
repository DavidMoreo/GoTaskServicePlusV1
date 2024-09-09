import { FormsModule } from "@angular/forms";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { PermissionComponent } from "../../Permission/app.permission";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../../Services/Product/AddUpdateProduct";
import { FilterSearchService } from "../../../Services/Product/Util/FilterSearch";




@Component({
  standalone: true,
  selector: 'app-product-filter-search-ia',
  templateUrl: 'app.product-filter-search-ia.component.html',
  styleUrls: ['app.product-filter-search-ia.css'],
  imports: [ LoadingComponent, FormsModule, CommonModule],
})


export class FilterSearchIAt implements OnInit {

  _Filter: FilterSearchService;
  textInput: string;
  constructor(private route: Router, private productService: ProductService, _Filter: FilterSearchService) {  
    this._Filter = _Filter; 
  }




  ngOnInit(): void {   
    this.loadData();
    
  }

  async loadData() {
   
  }


  AgregateFilter() {
    if (this.textInput != "") {
      this._Filter.AddListFilter(this.textInput);
      this.textInput = "";
    }
  }

  RemoveFilter(name:string) {
   
      this._Filter.RemoveFilter(name);
      this.textInput = "";
 
  }


  ClosePage() {
    this._Filter.isVisible = false;
  }

}
