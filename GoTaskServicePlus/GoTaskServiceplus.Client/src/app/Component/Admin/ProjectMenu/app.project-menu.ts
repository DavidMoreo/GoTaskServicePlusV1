import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from "@angular/core";

import { Inject } from '@angular/core';
import { interval } from 'rxjs';

import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PermissionComponent } from "../../Permission/app.permission";
import { FormsModule } from "@angular/forms";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { Menu } from "../../../Models/Home/MenuModel";
import { ProjectService } from "../../../Services/Admin/Project/ProjectService";
import { tblCompany, tblProject } from "../../../Models/Admin/Admin";
import { CompanyService } from "../../../Services/Admin/Company/CompanyService";
import { NameConcept, tblConcepValue } from "../../../Models/Structure/tblProduct";
import { ProjectMenuService } from "../../../Services/Admin/PojectMenu/ProjectMenuService";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { CommonService } from "../../../Services/Common/CommonService";






@Component({
  standalone: true,
  selector: "app-project-menu",
  templateUrl: './app.project-menu-component.html',
  styleUrls: ['app.project-menu.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]


})

export class ProjectMenuComponent implements OnInit {
  _configservice: ConfigService;
  _visibleItem: number = 0;
  private _cdRef: ChangeDetectorRef;
  private _router: Router;
  _project: ProjectService;
  _CompanyService: CompanyService;
  _company: tblCompany;
  _menu: ProjectMenuService;
  _Permission: PermissionService
  _ListMenu: Array<Menu> = new Array<Menu>;
  _ListMenuCustomer: Array<Menu> = new Array<Menu>;



  constructor(private _CommonService: CommonService,  configservice: ConfigService, cdRef: ChangeDetectorRef, private router: Router, project: ProjectService, companyService: CompanyService, menu: ProjectMenuService, Permission: PermissionService) {
    this._configservice = configservice;
    this._cdRef = cdRef;
    this._router = router;
    this._project = project;
    this._menu = menu;
    this._CompanyService = companyService;
    this._Permission = Permission;
  }




  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("project-menu");

    if (status) {
      this.GetAllProject();
      this.GetAllCompany("all");
    }
  }



  GetAllProject(id: string = "") {
    this._project._listProject = new Array<tblProject>();
    this._project.GetAllProjectByCompany(id, 0);
    //.subscribe(

    //    (e) => {
    //      this._project._listProject = e.data;
    //      console.log(this._project._listProject);
    //      //this._cdRef.detectChanges();
    //    }

    //  );
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


  SelectionCompany(event: any) {
    var id = event.target.value;
    this.GetAllProject(id);
  }

  Prueba(prueba: any) {
    console.log("prueba",prueba);
  }

  SelectionProject(project: string, company: string) {



    this._menu.UpbdateProjectActive(project, company).subscribe((e) => {
      if (e.status) {
        this._CommonService._AlertService.Alert("Cambio de Sucursal realizada.");
        this._configservice.DeleteBeareLogin();
        this._CommonService._NavMenuService.StatusLogin(false);  
      } else {
        alert("No Guardado");
      }
    
    });
  }



  Route(name: string) {
    this._router.navigate([name]);
  }



}
