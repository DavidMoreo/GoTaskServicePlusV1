import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { CompanyService } from "../../../Services/Admin/Company/CompanyService";
import { tblCompany } from "../../../Models/Admin/Admin";
import { ListSearchService } from "../../../Services/Admin/Data/ListSearchService";
import { SearchFilter } from "../../../Models/Admin/SearchFilter";



@Component({
  standalone: true,
  selector: 'app-admin-list-search',
  templateUrl: 'app.admin-list-search.component.html',
  styleUrls: ['app.admin-list-search.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]

})


export class ListSearchComponent implements OnInit {

  _configservice: ConfigService;
  _rowSeletion: string;

  _Permission: PermissionService
  _ListSearchService: ListSearchService

  
  private _cdRef: ChangeDetectorRef;


  constructor(configservice: ConfigService, cdRef: ChangeDetectorRef, Permission: PermissionService,private ListSearchService: ListSearchService) {

    this._configservice = configservice;   
    this._cdRef = cdRef;  
    this._Permission = Permission;
    this._ListSearchService = ListSearchService;    
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-list-search");
    if (status) {
      this.LoadCompnys();
    }
  }

 async  LoadCompnys() {
   this.GetAllSearch();
  }

 

  async Delete(id: string) {
   
  }


 

  GetAllSearch() {

    this._ListSearchService.GetAllProduct();
   
  }


 

  GetCountData(filter: string) {

    var data = this._ListSearchService.listSearchFilter.filter(s => s.filter == filter);


    return data.length;

  }
  GetIp(filter: string)  {

    var list = new Array();
    var data = this._ListSearchService.listSearchFilter.filter(s => s.filter == filter);
    data.forEach((e) => {
      if (!list.includes(e.ip))
        list.push(e.ip);
    })


    return list;

  }



}
