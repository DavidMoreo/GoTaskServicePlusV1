import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { Permission, tblRol } from "../../../Models/Segurity/Register/RegisterModel";
import { RolUserService } from "../../../Services/Admin/RolUserService/RolUserService";
import { Pages } from "../../../Models/Segurity/PageModel";
import { CheckBoxComponent } from "../../Common/CustomControl/CheckBox/app.custom-control-check-box";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { GridItem } from "../../../Models/Common/GridModel";
import { GridCustomService } from "../../../Services/Common/CustomControl/GridCustomService";
import { UtilitiService } from "../../../Services/Common/UtilitisService";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";



@Component({
  standalone: true,
  selector: 'app-admin-rol-user',
  templateUrl: 'app.admin-rol-user.component.html',
  styleUrls: ['app.admin-rol-user.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, CheckBoxComponent, GridComponent, MenuGridComponent]

})


export class AdminRolUserComponent implements OnInit {

  _configservice: ConfigService;
  _http: ConceptService; 
  _Permission: PermissionService
  _rowSeletion: string;



  private _cdRef: ChangeDetectorRef;

  _Rol: RolUserService;
  _tab: string = "";
  constructor(configservice: ConfigService, private _util: UtilitiService, http: ConceptService, cdRef: ChangeDetectorRef, Permission: PermissionService, Rol: RolUserService, private _GridCustom: GridCustomService) {

    this._configservice = configservice;
    this._http = http;
    this._cdRef = cdRef;
    this._Rol = Rol;
    this._Permission = Permission;
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("admin-rol-user");
    if (status) {
      this.InitialLoad();
      this.LoadData();
      this.LoadHeaderGrid();
    }
  }

  async LoadData() {
    this._Rol.GetPagesPermission();
    var result = this._Rol.GetRolsByProject("all", 0);
  }


  Prueba(value: string) {
    return value;
  }

  Saved() {

    if (this._Rol.rol.id == this._util.GuidEmpty()) {
      var validate = this.Validate();
      if (validate == "") {
        this._Rol.SaveRols(this._Rol.rol);
      } else {
        alert(validate);
      }
    } else {
      this.UpdateRol();
    }
  }


  UpdateRol() {
    var validate = this.Validate();
    if (validate == "") {
      this._Rol.UpdateRols(this._Rol.rol);
    } else {
      alert(validate);
    }
  }


  Edit(id: string) {

    if (id != "") {
      this._Rol.GetRolById(id);
    }
  }


  Delete(id: string) {
    if (id != "") {
      this._Rol.DeleteRol(id);
    }
  }



  onSelectChangePage(event: any) {
    this.InitialLoad();
    var value = event.target.value;
    this._Rol.rol.permissionByRoll.page = value;
  }


  ChangedIsPermission(mode: string, status: boolean) {
    this.InitialLoad();
    if (mode == "delete") this._Rol.rol.permissionByRoll.delete = status;
    if (mode == "read") { this._Rol.rol.permissionByRoll.read = status; }
    if (mode == "write") this._Rol.rol.permissionByRoll.write = status;
    if (mode == "share") this._Rol.rol.permissionByRoll.share = status;
    if (mode == "save") this._Rol.rol.permissionByRoll.save = status;

    this._cdRef.detectChanges();
  }

  ChangedRolType(mode: string) {
    this.InitialLoad();
    this._Rol.rol.isCustomer = false;
    this._Rol.rol.isVendor = false;
    this._Rol.rol.isMaker = false;
    this._Rol.rol.isAdmin = false;


    if (mode == "isCustomer") this._Rol.rol.isCustomer = true;
    if (mode == "isVendor") { this._Rol.rol.isVendor = true; }
    if (mode == "isMaker") this._Rol.rol.isMaker = true;
    if (mode == "isAdmin") this._Rol.rol.isAdmin = true;


    this._cdRef.detectChanges();
  }


  async LoadHeaderGrid() {

    var item = new GridItem();
    this._GridCustom.dataHeader = Array<GridItem>();
    item.id = "0";
    item.value = "Nombre";
    this._GridCustom.dataHeader.push(item);

    item = new GridItem();
    item.id = "0";
    item.value = "Pagina";
    this._GridCustom.dataHeader.push(item);

    item = new GridItem();
    item.id = "0";
    item.value = "Permiso";
    this._GridCustom.dataHeader.push(item);

    item = new GridItem();
    item.id = "0";
    item.value = "Es publico";
    this._GridCustom.dataHeader.push(item);

    item = new GridItem();
    item.id = "0";
    item.value = "Tipo de rol";
    this._GridCustom.dataHeader.push(item);

  }



  changedInputName(event: any) {
    var id = event.target.value;
    this._Rol.rol.code = this._Rol.rol.name;
    /*    this._cdRef.detectChanges();*/
  }


  ChangedIsPublic(mode: boolean) {
    this._Rol.rol.isPublic = mode;
    this._cdRef.detectChanges();
  }


  GetTypeRol(mode: tblRol) {
    if (mode.isCustomer) return "Cliente";
    if (mode.isVendor) return "Vendedor";
    if (mode.isMaker) return "Fabricante";
    if (mode.isAdmin) return "Administrador";
    return "";
  }

  Getpermission(mode: tblRol) {
    var value = "";
    if (mode.permissionByRoll.read) value += "Leer,";
    if (mode.permissionByRoll.write) value += "Escribir,";
    if (mode.permissionByRoll.save) value += "Guardar,";
    if (mode.permissionByRoll.delete) value += "Eliminar,";
    if (mode.permissionByRoll.share) value += "Compartir,";
    return value;
  }

  IsPublic(mode: tblRol) {
    if (mode.isPublic) return "Publico";
    else return "Privado";
  }

  Selection(id: string) {

    this._rowSeletion = id;
    this._cdRef.detectChanges();
  }


  languageTraslate(value: string) {
    return value;
  }

  Validate() {
    var msg = "";
    if (this._Rol.rol.name == undefined) msg = "nombre requerido";
    if (this._Rol.rol.permissionByRoll == null) msg = "Permisos requeridos";
    if (this._Rol.rol.permissionByRoll == undefined) msg = "Permisos requeridos";
    if (!this._Rol.rol.isCustomer && !this._Rol.rol.isVendor && !this._Rol.rol.isMaker && !this._Rol.rol.isAdmin) msg = "Tipo de rol requeridos";
    return msg;
  }



  InitialLoad() {

    if (this._Rol.rol.permissionByRoll == null) this._Rol.rol.permissionByRoll = new Permission;
    if (this._Rol.rol.permissionByRoll == undefined) this._Rol.rol.permissionByRoll = new Permission;
    if (this._Rol.listPages == undefined) this._Rol.listPages = new Array<Pages>();
    if (this._Rol.listPages == null) this._Rol.listPages = new Array<Pages>();
  }

  ClerRol() {
    this._Rol.ClearRol();
  }

}
