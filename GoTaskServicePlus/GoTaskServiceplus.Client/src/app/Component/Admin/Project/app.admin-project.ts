import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { tblCompany, tblProject } from "../../../Models/Admin/Admin";
import { ProjectService } from "../../../Services/Admin/Project/ProjectService";
import { Router } from "@angular/router";



@Component({
  standalone: true,
  selector: 'app-admin-project',
  templateUrl: 'app.admin-project.component.html',
  styleUrls: ['app.admin-project.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]

})


export class CreateProject implements OnInit {

  _configservice: ConfigService;
  _projectService: ProjectService;
  _rowSeletion: string;
  _Permission: PermissionService
  private _cdRef: ChangeDetectorRef;


  constructor(configservice: ConfigService, http: ProjectService, cdRef: ChangeDetectorRef, Permission: PermissionService, private router: Router) {

    this._configservice = configservice;
    this._projectService = http;
    this._cdRef = cdRef;
    this._Permission = Permission;

  }


  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-project");

    if (status) {
     // this.GetListAdressConcept(TypeConcepValue.AdressConcept());
    
      this.GetAllCompany("all");
    }

  }




  async Delete(id: string) {

    var rest = await this._projectService.Delete(id).subscribe((e) => {
      if (e.status) {
        this.DeleteList(id);
        alert("Eliminado");
      } else {
        alert("No Eliminado");
      }
    })
  }



  Edit(id: string) {
    this.GetListAdressConcept(TypeConcepValue.AdressConcept(), id);
    this._projectService.GetProjectById(id).subscribe(
      (e) => {
        this._projectService._project = e.data;
        /* this._cdRef.detectChanges();*/
      }

    );
  }



  async SaveAndUpdateProject() {
    console.log("Save", this._projectService._project);
    console.log("addressItemId", this._projectService._project.addressItemId);
    if (this._projectService._project.addressItemId == "")
      this._projectService._project.addressItemId = "00000000-0000-0000-0000-000000000000";
    if (this._projectService._project.id == "00000000-0000-0000-0000-000000000000") {
      this.SavedProject();
    } else {
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
            alert("Actualizado");
          } else {
            alert("No Actualizado");
          }
        }

      );
  }

  private async SavedProject() {
    this.ValidateConcept();
   
    this._projectService.Saved(this._projectService._project)
      .subscribe(
        (e) => {
          if (e.status) {
            this._projectService._listProject.push(e.data);
            this._projectService._project = new tblProject();
            this._cdRef.detectChanges();
            alert("guardado");
          } else {
            alert("No guardado");
          }
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

  GetCompany(project: tblProject) {
    if (this._projectService._listCompany != undefined) {
      var company = this._projectService._listCompany.find(s => s.id == project.idCompany);  
      return company != undefined ? company.name : "..";
    }

    return "";

  }

  GetListAdressConcept(type: string, idProject:string) {
   
    this._projectService.adressList = new Array<tblConcepValue>();
    var result = this._projectService.GetAdminAllConceptByIdProject("all", type, 0, idProject)
    result.subscribe(
      (e) => {
        this._projectService.adressList = e.data;    
       
      }

    );

  }


  GetAllProject(filter: string, idCompany: string) {
    this._projectService._listProject = new Array<tblProject>();
    this._projectService.GetAllProject(filter, idCompany, 0).subscribe(

      (e) => {
        this._projectService._listProject = e.data;    
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



  private DeleteList(id: string) {

    const index = this._projectService._listProject.findIndex(item => item.id === id);
    if (index !== -1) {
      this._projectService._listProject.splice(index, 1);
      // this._cdRef.detectChanges();

    }

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

  onSelectChangeFilterByCompany(event: any) {
    var id = event.target.value;
   
    this.GetAllProject("all", id);
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
    this._rowSeletion = id;
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

}
