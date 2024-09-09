import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { CommonService } from "../../../../Services/Common/CommonService";
import { InputSearchService } from "../../../../Services/Common/CustomControl/ImputSearchService";
import { tblConcepValue } from "../../../../Models/Structure/tblProduct";





@Component({
  standalone:true,
  selector: "app-common-input-search",
  templateUrl: './app.common-input-search.component.html',
  styleUrls: ['./app.common-input-search.css']

})
export class ImputSearch implements OnInit, DoCheck {

  @Input() ChangedFilter: (value: string) => void;
 

  _InputSearch: InputSearchService;
  constructor(private _CommonService: CommonService, InputSearch: InputSearchService) {
    this._InputSearch = InputSearch;
  }

  ngDoCheck(): void {

  }

  ngOnInit(): void {

    if (!this._InputSearch.listFilterUpdate)
      this._InputSearch.listFilterUpdate = new Array<tblConcepValue>();    
  }

  ChangedFilterInput(event: any) {

    var value = event.target.value;
    if (this.ChangedFilter) {
      this.ChangedFilter(value);
    }
  }



  CloseMenu() {
   this._InputSearch.menuVisible = false;
  }


}
