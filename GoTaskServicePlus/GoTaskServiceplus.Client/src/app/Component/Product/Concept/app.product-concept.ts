import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { map } from "rxjs";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";



@Component({
  standalone: true,
  selector: 'app-product-concept',
  templateUrl: 'app.product-concept.component.html',
  styleUrls: ['app.product-concept.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]

})


export class ConceptProductControl implements OnInit {

  _configservice: ConfigService;
  _concept: tblConcepValue = new tblConcepValue();
  _http: ConceptService;
  _rowSeletion: string;
  _Permission: PermissionService
  private _cdRef: ChangeDetectorRef;

  _tab: string = "country";
  constructor(configservice: ConfigService, http: ConceptService, cdRef: ChangeDetectorRef, Permission: PermissionService) {

    this._configservice = configservice;
    this._http = http;
    this._cdRef = cdRef;
    this._Permission = Permission;

  }

  ngOnInit(): void {
     var status = this._Permission.ValidationLogin("conceptual-product");
    this._concept.type = TypeConcepValue.CoutryConcept();

    if (status) {
      this.GetListConcept(TypeConcepValue.CoutryConcept());
    }
  }


  changedInputName(event: any, name: string) {

    if (this._concept == undefined) this._concept = new tblConcepValue();
    this._concept.name = event.target.value;
    if (this._concept.value == "" || this._concept.value == undefined) this._concept.value = event.target.value;
   
    this._cdRef.detectChanges();
  }


  changedInputValue(event: any, name: string) {
    this._concept.value = event.target.value;
  }

  changedSelectCountry(event: any) {
    this._concept.concept = new NameConcept();
    this._concept.concept.id = event.target.value;

    var item = this._http._contryList.find(s => s.id == this._concept.concept.id);


    if (item != undefined) {
      this._concept.concept.name = item.name;

    }
  }

  GetConceptValue(value: any, name: string) {
    var result = "N/A";

    if (value != null) {
      var data = value;

      if (value != undefined) {
        if (name == "name") result = data.name;
      }
    }
    return result;
  }


  async DeleteConcept(id: string) {
    var rest = await this._http.DeleteConcept(id).subscribe((e) => {
      if (e.status) {
        this.DeleteConceptList(id);
      
      } else {
        alert("No Eliminado");
      }
    })
  }

  ChangedIsPublic(mode: boolean) {
    this._concept.isPublic = mode;
    this._cdRef.detectChanges();
  }

  Edit(id: string) {

    this._http.GetListById(id).subscribe(
      (e) => {
        this._concept = e.data;
       /* this._cdRef.detectChanges();*/
      }

    );
  }



  async SaveAndUpdateConcept() {
    this.ValidateConcept();
  
    await this._http.SaveAndUpdateConcept(this._concept)
      .subscribe(
        (e) => {
          if (e.status) {
            this._http._conceptList.push(e.data);
            this._cdRef.detectChanges();
          
          } else {
            alert("No guardado");
          }
        }

      );


  }

  GetListConcept(type: string) {
    this._http._conceptList = new Array<tblConcepValue>();
    this._http.GetListByName("all", type, 0).subscribe(

      (e) => {
        this._http._conceptList = e.data;
        this._cdRef.detectChanges();
       
      }

    );
  }

  GetListConceptCountry(type: string, page: number) {
    this._http._conceptList = new Array<tblConcepValue>();
    this._http.GetListByName("ALL", type, 0).subscribe(
      (e) => {
        this._http._contryList = e.data;
       
        this._cdRef.detectChanges();
      }

    );
  }


  private DeleteConceptList(id: string) {

    const index = this._http._conceptList.findIndex(item => item.id === id);
    if (index !== -1) {
      this._http._conceptList.splice(index, 1);
      // this._cdRef.detectChanges();

    }

  }


  pageTab(mode: string) {
    this._concept = new tblConcepValue();
    this._tab = mode;
    this.changeType(mode);
  }

  changeType(name: string) {
    if (name == "country") {
      this._concept.type = TypeConcepValue.CoutryConcept();
    }
    if (name == "city") {
      this._concept.type = TypeConcepValue.CityConcept();
      this.loadCityData(TypeConcepValue.CoutryConcept());
    }
    if (name == "delivery") {
      this._concept.type = TypeConcepValue.DeliveryModeConcept();
    }
    if (name == "status") { this._concept.type = TypeConcepValue.StatusProductConcept(); }
    if (name == "available") { this._concept.type = TypeConcepValue.AvailableDayConcept(); }
    if (name == "typeProduct") { this._concept.type = TypeConcepValue.TypeProduct(); }
    this.GetListConcept(this._concept.type);
  }



  loadCityData(mode: string) {
    this.GetListConceptCountry(mode, 0);
  }


  Selection(id: string) {
    this._rowSeletion = id;
    this._cdRef.detectChanges();
  }


  languageTraslate(value: string) {
    return value;
  }

  ValidateConcept() {
    if (this._concept.conceptCompany == undefined) this._concept.conceptCompany = new NameConcept();
    if (this._concept.conceptPrevious == undefined) this._concept.conceptPrevious = new NameConcept();
    if (this._concept.conceptProject == undefined) this._concept.conceptProject = new NameConcept();
    if (this._concept.concept == undefined) this._concept.concept = new NameConcept();

  }


}
