
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { ConceptStoreTrackingService } from "../../../Services/Admin/ConceptStoreTracking/ConceptStoreTrackingService";
import { Component, OnInit } from "@angular/core";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { CommonService } from "../../../Services/Common/CommonService";
import { BtnOnOffComponent } from "../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off";



@Component({
  standalone: true,
  selector: 'app-admin-store-tracking',
  templateUrl: 'app.admin-store-tracking.component.html',
  styleUrls: ['app.admin-store-tracking.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, MenuGridComponent, GridComponent, BtnOnOffComponent]

})


export class ConceptStoreTrackingControl implements OnInit {

  _Permission: PermissionService;
  _Concept: ConceptStoreTrackingService;

  constructor(Permission: PermissionService, _Concept: ConceptStoreTrackingService, private _CommonService: CommonService) {
    this._Permission = Permission;
    this._Concept = _Concept;
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("store-tracking");
    this._Concept.concept.type = TypeConcepValue.ConceptStoreTracking();
    this._Concept.concept.isPublic = false;   
    if (status) {
      this.GetListConcept(TypeConcepValue.ConceptStoreTracking());
    }
  }






  async DeleteConcept(id: string) {
    var rest = await this._Concept.DeleteConcept(id).subscribe((e) => {
      if (e.status) {
      
      } else {
        alert("No Eliminado");
      }
    })
  }

  ChangedIsPublic(mode: boolean) {
    this._Concept.concept.isPublic = mode;   
  }

  ChangedStatus(mode: boolean) {
    this._Concept.concept.disable = mode;   
  }

  Edit(id: string) {
    this._Concept.GetListById(id);
  }

  async SaveAndUpdateConcept() {
    this.ValidateConcept();
    await this._Concept.SaveAndUpdateConcept(this._Concept.concept)
      .subscribe(
        (e) => {
          if (e.status) {
            this._Concept.conceptList.push(e.data);           
          } else {
            alert("No guardado");
          }
        }

      );
  }

  GetListConcept(type: string, filter: string = "all") {
    this._Concept.conceptList = new Array<tblConcepValue>();
    this._Concept.GetListByName(filter, type, 0);
  }


  GetConceptList() {
    return this._Concept.conceptList;
  }

  GetRowSelect() {
    if (!this._Concept.rowSeletion) return "";
    return this._Concept.rowSeletion.id;
  }

  GetConcept() {
    return this._Concept.concept;
  }

  LoadGps() {
    this._Concept.LoadGps();
  }

  ClearData(id: string) {
    this._Concept.ClearData();
   
  }

  Delete(id: string) {
    this._Concept.DeleteConcept(id);
  }

  ChangeMenu(id: string) {

  }

  pageTab(mode: string) {
    
    this.changeType(mode);
  }

  changeType(name: string) {
    this._Concept.concept.type = TypeConcepValue.ConceptStoreTracking();
  }

  FilterProduct(value:string) {
    this.GetListConcept(TypeConcepValue.ConceptStoreTracking(), value);
  }

  FilterCancel(id: string) {
    this.GetListConcept(TypeConcepValue.ConceptStoreTracking());
  }



  Selection(item: tblConcepValue) {
    this._Concept.rowSeletion = item;
  }

  NullProductSelectId(id: string) {
    if (this._Concept.rowSeletion == undefined) return false;
    if (this._Concept.rowSeletion.id == this._CommonService._UtilitiService.GuidEmpty()) return false;
    if (this._Concept.rowSeletion.id == this._Concept.rowSeletion.id) return true;
   
    return false;
  }


  GetMap(item: tblConcepValue) {
    var cordinates = item.value;
    if (!cordinates) return "";
    return cordinates.replace("lat:", "").replace("lng:", "");
    //"https://www.google.com/maps/search/4.7156132,-74.2234972?sa=X"
  }





  languageTraslate(value: string) {
    return value;
  }

  ValidateConcept() {
    if (this._Concept.concept.conceptCompany == undefined) this._Concept.concept.conceptCompany = new NameConcept();
    if (this._Concept.concept.conceptPrevious == undefined) this._Concept.concept.conceptPrevious = new NameConcept();
    if (this._Concept.concept.conceptProject == undefined) this._Concept.concept.conceptProject = new NameConcept();
    if (this._Concept.concept.concept == undefined) this._Concept.concept.concept = new NameConcept();

  }


}
