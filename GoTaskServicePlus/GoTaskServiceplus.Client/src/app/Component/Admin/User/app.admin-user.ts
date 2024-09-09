import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue, ConceptProduct } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { CompanyService } from "../../../Services/Admin/Company/CompanyService";
import { tblCompany, tblProject } from "../../../Models/Admin/Admin";
import { tblRol, tblUser } from "../../../Models/Segurity/Register/RegisterModel";
import { UserService } from "../../../Services/Admin/User/UserService";
import { ConceptProductControl } from "../../Product/Concept/app.product-concept";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { GridCustomService } from "../../../Services/Common/CustomControl/GridCustomService";
import { GridItem } from "../../../Models/Common/GridModel";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { CommonService } from "../../../Services/Common/CommonService";



@Component({
  standalone: true,
  selector: 'app-admin-user',
  templateUrl: 'app.admin-user.component.html',
  styleUrls: ['app.admin-user.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, GridComponent, MenuGridComponent, GridComponent]

})


export class AdminteUser implements OnInit {

  _configservice: ConfigService;

  _UserService: UserService;
  _Permission: PermissionService
  private _cdRef: ChangeDetectorRef;


  constructor(private _CommonService: CommonService ,configservice: ConfigService, cdRef: ChangeDetectorRef, CompanyService: UserService, Permission: PermissionService, private _GridCustom: GridCustomService, private _util: UtilitiService) {

    this._configservice = configservice;
    this._cdRef = cdRef;
    this._UserService = CompanyService;
    this._Permission = Permission;
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-user");

    if (status) {
    
      this.LoadData();
      this.LoadCompanys();
    }
  }

  async LoadCompanys() {
     
    //this.GetAllByIdProject("all");   
    this.GetAllRol("all");
    this.GetAllCompany("all");
  }



  async Delete(id: string) {

    var rest = await this._UserService.Delete(id).subscribe((e) => {
      if (e.status) {
        this._UserService._listUser = this._UserService._listUser.filter(item => item.id != id);
        this._CommonService._AlertService.Alert("Eliminado");
      } else {
        /* alert("No Eliminado");*/
      }
    })
  }



  Edit(id: string) {

    this._UserService.GetById(this._UserService.rowSelection).subscribe(
      (e) => {
        console.log(e.data);
        this._UserService.user = e.data;
      }

    );
  }



  Clone(id: string) {
  
    this._UserService.GetById(this._UserService.rowSelection).subscribe(
      (e) => {
        console.log(e.data);
        this._UserService.user = e.data;
        this._UserService.user.id = this._util.GuidEmpty();
        alert(this._UserService.user.id);
      }

    );
  }


  ClearData(id: string) {
    this._UserService.rowSelection = "";
    this._UserService.user = new tblUser();
    this._UserService.user.id = this._util.GuidEmpty();
  }


  async SaveUser() {

    this.ValidateConcept();
    if (this._UserService.user.id == "00000000-0000-0000-0000-000000000000") {

      await this._UserService.Saved(this._UserService.user)
        .subscribe(
          (e) => {
            if (e.status) {
              this._UserService._listUser = this._UserService._listUser.filter(s => s.id != this._UserService.user.id);
              this._UserService._listUser.push(e.data);

              this._cdRef.detectChanges();
              alert("guardado");
            } else {
              alert("No guardado");
            }
          }

        );
    } else {

      await this._UserService.Upbdate(this._UserService.user)
        .subscribe(
          (e) => {
            if (e.status) {
              this._UserService._listUser = this._UserService._listUser.filter(s => s.id != this._UserService.user.id);
              this._UserService._listUser.push(e.data);
              this._cdRef.detectChanges();
              alert("Actualizado");
            } else {
              alert("No Actualizado");
            }
          }

        );

    }


  }


  GetAllUserByProject(idProject: string) {

    this._UserService._listUser = new Array<tblUser>();
    this._UserService.GetAllUserByProject("all",idProject, 0).subscribe((e) => {
      this._UserService._listUser = e.data;
      console.log("user",this._UserService._listUser);
      if (!this._UserService._listUser) this._CommonService._AlertService.Alert("No se encontraron datos a mostrar");
     }
    );
  }


  GetAllCompany(filter: string) {
    this._UserService._listCompany = new Array<tblCompany>();
    this._UserService.GetAllCompany(filter, 0).subscribe(
      (e) => {
        this._UserService._listCompanyFilter = e.data;
        this._UserService._listCompany = e.data;
        //this._cdRef.detectChanges();
      }

    );
  }

  GetAllProject(filter: string, idCompany: string) {   
    this._UserService._listProject = new Array<tblProject>();
    this._UserService.GetAllProject(filter, idCompany, 0).subscribe(
      (e) => {      
        
          this._UserService._listProjectFilter = e.data;
      
        //this._cdRef.detectChanges();
      }

    );
  }

  GetAllProjectUserUpdate(filter: string, idCompany: string) {
    this._UserService._listProject = new Array<tblProject>();
    this._UserService.GetAllProject(filter, idCompany, 0).subscribe(
      (e) => {

        this._UserService._listProject = e.data;

        //this._cdRef.detectChanges();
      }

    );
  }


  GetAllProjectUpdate(filter: string, idCompany: string) {
    this._UserService._listProject = new Array<tblProject>();
    this._UserService.GetAllProject(filter, idCompany, 0).subscribe(
      (e) => {
       
          this._UserService._listProject = e.data;
     
        //this._cdRef.detectChanges();
      }

    );
  }



  //GetAllUser(filter: string) {

  //  this._UserService._listUser = new Array<tblUser>();
  //  this._UserService.GetAll(filter, 0).subscribe(

  //    (e) => {
  //      this._UserService._listUser = e.data;
  //      //this._cdRef.detectChanges();

  //    }

  //  );
  //}


  GetAllRol(filter: string) {

    this._UserService.listRolUser = new Array<tblRol>();
    this._UserService.GetRolsByProject(filter, 0).subscribe(
      (e) => {
        this._UserService.listRolUser = e.data;
        //this._cdRef.detectChanges();
      }
    );
  }




  //changet



  onSelectRol(event: any) {
    var id = event.target.value;
    var existe = this._UserService.listRolUser.find(s => s.id == id);
    if (existe != null) {
      if (this._UserService.user.rolUser.find(s => s.id == id) == null) this._UserService.user.rolUser.push(existe);
      if (this._UserService.user.rolUserActive != null || this._UserService.user.rolUserActive == undefined) this._UserService.user.rolUserActive = existe;

    }
  }


  DeleteRol(id: string) {
    this._UserService.user.rolUser = this._UserService.user.rolUser.filter(s => s.id != id);
  }



  onSelectUpdateCompanyInUser(event: any) {
    var id = event.target.value;
    this._UserService._listProject = new Array<tblProject>;
    var company = this._UserService._listCompany.find(s => s.id == id);
    if (company != undefined) {
      var concept = new NameConcept();
      concept.id = company.id;
      concept.name = company.name;
      this._UserService.user.idCompany = concept.id;
      this._UserService.user.conceptCompany = concept;
      this.GetAllProjectUserUpdate("all", id);
    }
  }




  onSelectChangeCompany(event: any) {
    var id = event.target.value;
    this._UserService._listProjectFilter = new Array<tblProject>;
    this._UserService._listUser = new Array<tblUser>;
    this.GetAllProject("all", id );
  }




  onSelectUpdateProjectInUser(event: any) {
    var id = event.target.value;

    var project = this._UserService._listProject.find(s => s.id == id);
    if (project != undefined) {
      var concept = new NameConcept();
      concept.id = project.id;
      concept.name = project.name;
      this._UserService.user.idProject = concept.id;
      this._UserService.user.conceptProject = concept;
      
    }

  }



  onSelectChangeProject(event: any) {
    var id = event.target.value;
  
      this.GetAllUserByProject(id);
    

  }




  changedInputName(event: any, name: string) {
    this.LoadData();
  }
  //changet


  GetNameProject(id:string) {
    if (!this._UserService._listProjectFilter) return "";

    var  project = this._UserService._listProjectFilter.find(s => s.id == id);
    if (project == undefined || project == null) return "";
    return project?.name;
  }

  GetNameCompany(id: string) {

    if (this._UserService._listCompanyFilter != undefined && this._UserService._listCompanyFilter.length > 0) {
     
      var project = this._UserService._listCompanyFilter.find(s => s.id == id);

      if (project == undefined || project == null) return "";
     
      return project?.name;
    }
    return "";
  }



  LoadData() {
    if (this._UserService.user == undefined) this._UserService.user = new tblUser();
  }




  Selection(id: string) {
    this._UserService.rowSelection = "";
    this._UserService.rowSelection = id;
  }


  languageTraslate(value: string) {
    return value;
  }

  ValidateConcept() {
    if (this._UserService.user.conceptCompany == undefined) this._UserService.user.conceptCompany = new NameConcept();
    if (this._UserService.user.conceptPrevious == undefined) this._UserService.user.conceptPrevious = new NameConcept();
    if (this._UserService.user.conceptProject == undefined) this._UserService.user.conceptProject = new NameConcept();
    if (this._UserService.user.code == undefined) this._UserService.user.code = "";
    if (this._UserService.user.imgUrl == undefined) this._UserService.user.imgUrl = "";
    if (this._UserService.user.rolUser == undefined) this._UserService.user.rolUser = new Array<tblRol>;
    if (this._UserService.user.rolUserActive == undefined) this._UserService.user.rolUserActive = new tblRol;
    if (this._UserService.user.rolUserActive.conceptCompany == undefined) this._UserService.user.rolUserActive.conceptCompany = new NameConcept();
    if (this._UserService.user.rolUserActive.conceptPrevious == undefined) this._UserService.user.rolUserActive.conceptPrevious = new NameConcept();
    if (this._UserService.user.rolUserActive.conceptProject == undefined) this._UserService.user.rolUserActive.conceptProject = new NameConcept();
    if (this._UserService.user.password == null) this._UserService.user.password = "";
    if (this._UserService.user.keyPassword == null) this._UserService.user.keyPassword = "";
    if (this._UserService.user.mobileNumber == null) this._UserService.user.mobileNumber = "";
    if (this._UserService.user.listShoppingCart == null) this._UserService.user.listShoppingCart = new Array<ConceptProduct>();
    if (this._UserService.user.listFavorites == undefined) this._UserService.user.listFavorites = new Array<ConceptProduct>();
    if (this._UserService.user.listMyLikes == undefined) this._UserService.user.listMyLikes = new Array<NameConcept>;


  }



  NullProductSelectId(id: string) {

    if (this._UserService.rowSelection == "") return false;

    if (id != "0") {
      if (this._UserService.rowSelection == id) return true;
    } else {
      if (this._UserService.rowSelection != "") return true;
    }
    return false;
  }



}
