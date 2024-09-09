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



@Component({
  standalone: true,
  selector: 'app-admin-company',
  templateUrl: 'app.admin-company.component.html',
  styleUrls: ['app.admin-company.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]

})


export class CreateCompany implements OnInit {

  _configservice: ConfigService;
  _company: tblCompany = new tblCompany();

  _rowSeletion: string;
  _CompanyService: CompanyService;
  _Permission: PermissionService
  private _cdRef: ChangeDetectorRef;


  constructor(configservice: ConfigService, cdRef: ChangeDetectorRef, CompanyService: CompanyService, Permission: PermissionService) {

    this._configservice = configservice;
   
    this._cdRef = cdRef;
    this._CompanyService = CompanyService;
    this._Permission = Permission;
    
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-company");

    if (status) {
      this.LoadData();
      this.LoadCompnys();
    }
  }

 async  LoadCompnys() {
    this.GetAllCompany("all");
  }

 

  async Delete(id: string) {
    var rest = await this._CompanyService.Delete(id).subscribe((e) => {
      if (e.status) {
        this.DeleteList(id);
        alert("Eliminado");
      } else {
       /* alert("No Eliminado");*/
      }
    })
  }



  Edit(id: string) {

    this._CompanyService.GetCompanyById(id).subscribe(
      (e) => {
        this._company = e.data;
       /* this._cdRef.detectChanges();*/
      }

    );
  }



  async SaveCompany() {
    this.ValidateConcept();
    +console.log(this._company);
    await this._CompanyService.Saved(this._company)
      .subscribe(
        (e) => {
          if (e.status) {
            this._CompanyService._listCompany.push(e.data);
            this._cdRef.detectChanges();
          
          } else {
            alert("No guardado");
          }
        }

      );


  }

  GetAllCompany(filter: string) {
    this._CompanyService._listCompany = new Array<tblConcepValue>();
    this._CompanyService.GetAllCompanys(filter, 0).subscribe(

      (e) => {
        this._CompanyService._listCompany = e.data;
        //this._cdRef.detectChanges();
       
      }

    );
  }


  private DeleteList(id: string) {

    const index = this._CompanyService._listCompany.findIndex(item => item.id === id);
    if (index !== -1) {
      this._CompanyService._listCompany.splice(index, 1);
      // this._cdRef.detectChanges();

    }

  }

  //changet


  changedInputName(event: any, name: string) {
    this.LoadData();
    
 
  }
  //changet


  LoadData(){

    if (this._company == undefined) this._company = new tblCompany();

  }




  Selection(id: string) {
    this._rowSeletion = id;
    this._cdRef.detectChanges();
  }


  languageTraslate(value: string) {
    return value;
  }

  ValidateConcept() {
    if (this._company.conceptCompany == undefined) this._company.conceptCompany = new NameConcept();
    if (this._company.conceptPrevious == undefined) this._company.conceptPrevious = new NameConcept();
    if (this._company.conceptProject == undefined) this._company.conceptProject = new NameConcept();

  }



}
