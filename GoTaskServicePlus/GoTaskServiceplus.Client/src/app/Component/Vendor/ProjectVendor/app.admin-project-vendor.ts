import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { tblCompany, tblProject } from "../../../Models/Admin/Admin";
import { Router } from "@angular/router";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { AlertService } from "../../../Services/Common/AlertService";
import { Title } from "@angular/platform-browser";
import { VendorProjectService } from "../../../Services/Vendor/VendorProjectService";



@Component({
  standalone: true,
  selector: 'app-admin-project-vendor',
  templateUrl: 'app.admin-project-vendor.component.html',
  styleUrls: ['app.admin-project-vendor.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, MenuGridComponent, GridComponent]

})


export class UpdateProject implements OnInit {

  _configservice: ConfigService;
  _projectService: VendorProjectService;
  
  _Permission: PermissionService
  private _cdRef: ChangeDetectorRef;


  constructor(configservice: ConfigService, private title: Title, http: VendorProjectService, cdRef: ChangeDetectorRef, Permission: PermissionService, private router: Router, private _Alert: AlertService) {

    this._configservice = configservice;
    this._projectService = http;
    this._cdRef = cdRef;
    this._Permission = Permission;

  }


  ngOnInit(): void {
    this.title.setTitle("Actualizar sucursal");
    var status = this._Permission.ValidationLogin("update-project-vendor");

    if (status) {
      this.Load();
     /* this.GetAllCompany("all");*/
    }

  }


  private Load() {
    this.GetListAdressConcept(TypeConcepValue.AdressConcept());
    this.GetAllProject("all");
  }

  async Delete(id: string) {

    var rest = await this._projectService.Delete(id).subscribe((e) => {
      if (e.status) {
        this.DeleteList(id);
        this._Alert.Alert("Eliminado");
        this.ClearData("");
      } else {
        this._Alert.Alert("No Eliminado");
      }
    })
  }



  Edit(id: string) {
   
    this._projectService.GetProjectById(id).subscribe(
      (e) => {
        this._projectService._project = e.data;
        /* this._cdRef.detectChanges();*/
      }

    );
  }

  ClearData(id: string) {
    this._projectService._project = new tblProject();
    this._projectService._rowSeletion ="";
  }

  private DeleteList(id: string) {
    const index = this._projectService._listProject.findIndex(item => item.id === id);
    if (index !== -1) {
      this._projectService._listProject.splice(index, 1);
    }
  }


   FilterCancel(value: string) {
    this.Load();
  }



   Filter(value: string) {
    this.GetAllProject(value);
  }




  async SaveAndUpdateProject() {  
    if (this._projectService._project.id != "00000000-0000-0000-0000-000000000000") {    
      this.UpdateProject();
    }
  }

  private async UpdateProject() {
    this.ValidateConcept();
    this._projectService.Upbdate(this._projectService._project)
      .subscribe(
        (e) => {
          if (e.status) {
            this._projectService._listProject = this._projectService._listProject.filter(s => s.id != this._projectService._project.id);
            this._projectService._listProject.push(e.data);
            this._projectService._project = new tblProject();;
            this._cdRef.detectChanges();
            this._Alert.Alert("Actualizado");
          } else {
            this._Alert.Alert("No Actualizado");
          }
          this.ClearData("");
        }

      );
  }

 
  onSelectChangeAdress(event: any) {
    let id = event.target.value;
    if (this._projectService._project == undefined) this._projectService._project = new tblProject();
    if (id != "0") {
      let adress = this._projectService.adressList.find(s => s.id == id);
     
      if (adress == undefined || adress == null) return false;
      this._projectService._project.addressItemId = adress.id;  
    }
    return true;
  }


  GetListAdressConcept(type: string) {
   
    this._projectService.adressList = new Array<tblConcepValue>();
    var result = this._projectService.GetListAdress("all", type, 0)
    result.subscribe(
      (e) => {
        this._projectService.adressList = e.data;    
       
      }

    );

  }


  GetAllProject(filter: string) {
    this._projectService._listProject = new Array<tblProject>();
    this._projectService.GetAllProject(filter, 0).subscribe(

      (e) => {
        if (e.status) {
             this._projectService._listProject.push(e.data);    
        }
        //this._cdRef.detectChanges();
      }

    );
  }

  GetAllCompany(filter: string) {
    this._projectService._listCompany = new Array<tblCompany>();
    this._projectService.GetAllCompanys(filter, 0).subscribe(

      (e) => {

        this._projectService._listCompany = e.data;
        //this._cdRef.detectChanges();
      }

    );
  }



 
  onSelectChangeHorEnd(event: any) {
    var id = event.target.value;
    this._projectService._project.storeClosingTime = id;

  }

  onSelectChangeHorStart(event: any) {
    var id = event.target.value;
    this._projectService._project.storeOpeningTime = id;

  }

  onSelectChangeCompany(event: any) {
    var id = event.target.value;
    var company = this._projectService._listCompany.find(s => s.id == id);

    if (company != undefined) {
      var concept = new NameConcept();
      concept.id = company.id;
      concept.name = company.name;

      this._projectService._project.conceptCompany = concept;
      this._projectService._project.idCompany = concept.id;

    }
  }



  onSelectChangeTypeProject(event: any) {
    var id = event.target.value;

    if (id != "" && id != 0) {
      this._projectService._project.typeCompanyMode = id;

    }
  }



  GetProjectAdressName(id:string) {
    var data = this._projectService.adressList.find(s => s.id == id); 
    return (data?.concept.name + " " + data?.name);
  }


  Selection(id: string) {
    this._projectService._rowSeletion = id;
    this._cdRef.detectChanges();
  }


  languageTraslate(value: string) {
    return value;
  }



  ValidateConcept() {
    if (this._projectService._project.conceptCompany == undefined) this._projectService._project.conceptCompany = new NameConcept();
    if (this._projectService._project.conceptPrevious == undefined) this._projectService._project.conceptPrevious = new NameConcept();
    if (this._projectService._project.conceptProject == undefined) this._projectService._project.conceptProject = new NameConcept();
    if (this._projectService._project.addressItemId == "") this._projectService._project.addressItemId = "";
    

  }

  Route(url: string) {
    window.open(url, '_blank');
  }


  ExtractLatLong(url:string) {
  
      const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
      const matches = url.match(regex);
      if (matches && matches.length >= 3) {
        var coordinates = `${matches[1]},${matches[2]}`;
        return coordinates;
      } else {
        return "";
      }
    }


  NullProductSelectId(id: string) {

    if (this._projectService._rowSeletion == undefined) return false;
    if (this._projectService._rowSeletion == "") return false;
    if (id != "0") {
      if (this._projectService._rowSeletion == id) return true;
    } else {
      if (this._projectService._rowSeletion != "") return true;
    }
    return false;
  }



}
