import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { CommonService } from "../../../Services/Common/CommonService";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { FormControl } from "@angular/forms";
import { CommonModule } from "@angular/common";



@Component({
  standalone: true,
  selector: 'app-common-scroll-category',
  templateUrl: './app.common-scroll-category.component.html',
  styleUrls: ['app.common-scroll-category.component.css'],
  imports: [CommonModule]
})


export class ScrollCategory implements OnInit {

  @Output() Filter = new EventEmitter<string>();
  @Input() Id = "0";
  /*  "GetAllCategoryList"*/
  constructor(private _CommonService: CommonService, private _SearchProductService: SearchProductService) {



  }
  ngOnInit(): void {
    this._SearchProductService.GetAllCategory();
  }

  GetCategory() {
    return this._SearchProductService.lisConceptCategory;
  }


  GetImg(url: string, idCompany: string) {
    return this._CommonService._ConfigService.GetUrlImgAndIdCompany(url, idCompany,"PHONE");
  }


  FilterChange(value: string) {
    if (this.Id == value) {
      this.Filter.emit("00000000-0000-0000-0000-000000000000");
      this._CommonService._AlertService.Alert("Filtro eliminado");
    } else {
      this.Filter.emit(value);
    }

  }

}
