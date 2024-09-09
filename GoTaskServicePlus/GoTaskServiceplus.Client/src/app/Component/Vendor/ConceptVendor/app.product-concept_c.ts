import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { tblConcepValue, NameConcept, TypeConcepValue } from "../../../Models/Structure/tblProduct";
import { FormsModule } from "@angular/forms";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { CommonModule } from "@angular/common";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { GpsService } from "../../../Services/Common/Gopositioning";




@Component({
  standalone: true,
  selector: 'app-product-concept_c',
  templateUrl: 'app.product-concept_c.component.html',
  styleUrls: ['app.product-concept_c.css'],
  imports: [FormsModule, CommonModule, PermissionComponent]

})


export class ConceptProductCustomer implements OnInit {

  _configservice: ConfigService;
  _concept: tblConcepValue = new tblConcepValue();
  _listTypeConcept: Array<NameConcept>;
  _http: ConceptService;
  _rowSeletion: string;
  _Permission: PermissionService

  private _cdRef: ChangeDetectorRef;
  _tab: string = TypeConcepValue.AdressConcept();

  constructor(configservice: ConfigService, http: ConceptService, cdRef: ChangeDetectorRef, Permission: PermissionService, private Gps: GpsService) {

    this._configservice = configservice;
    this._http = http;
    this._cdRef = cdRef;
    this._Permission = Permission;
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("customer-concept");

    if (status) {
      this._concept.type = TypeConcepValue.AdressConcept();
      this.GetListConceptAdress(TypeConcepValue.AdressConcept());
      this.loadData();
    }
  }

  async loadData() {
    this.GetListConceptCountry(TypeConcepValue.CoutryConcept(), 0);
    this.GetListConceptCity(TypeConcepValue.CityConcept(), 0);
  }

  changedInputName(event: any, name: string) {
    if (this._concept == undefined) this._concept = new tblConcepValue();
    this._concept.name = event.target.value;

    if (this._concept.value == "" || this._concept.value == undefined) this._concept.value = event.target.value;

    this._cdRef.detectChanges();
  }



  changedCity(event: any) {
    this._concept.concept.id = event.target.value;
    var item = this._http._cityList.find(s => s.id == this._concept.concept.id);
    if (item != undefined) {
      this._concept.concept.name = item.name;
    }
    this._cdRef.detectChanges();
  }


  SelectChangedCountry(event: any) {

  }

  ChangedIsPublic(mode: boolean) {
    this._concept.isPublic = mode;
    this._cdRef.detectChanges();
  }

  changedInputValue(event: any, name: string) {
    this._concept.value = event.target.value;
  }


  DeleteConcept(id: string) {
    this._http.DeleteConcept(id).subscribe((e) => {

      if (e.status) {
        this.DeleteConceptList(id);
        alert("Eliminado");
      } else {
        alert("No eliminado");
      }
    });

  }



  private DeleteConceptList(id: string) {

    const index = this._http._adressList.findIndex(item => item.id === id);
    if (index !== -1) {
      this._http._adressList.splice(index, 1);
      this._cdRef.detectChanges();
    }

  }

  Edit(id: string) {

    this._http.GetListById(id).subscribe(
      (e) => {
        this._concept = e.data;
        console.log(this._concept);
        // alert(this._concept.name);
        // this._cdRef.detectChanges();
      }

    );
  }



  SaveAndUpdateConcept() {
    this.ValidateConcept();  
    var response = this._http.SaveAndUpdateConcept(this._concept);
    response.subscribe(
      (e) => {
        if (e.status) {

         
          this._http._adressList = this._http._adressList.filter(s => s.id != this._concept.id);

          this._http._adressList.push(e.data);
          

          this._concept = new tblConcepValue();
          this._cdRef.detectChanges();

        } else {
          alert("No Guardado");
        }

      }

    );


  }

  GetListConceptAdress(type: string) {
    this._http._adressList = new Array<tblConcepValue>();
    this._http.GetListByName("all", type, 0).subscribe(
      (e) => {

        this._http._adressList = e.data;
       
        this._cdRef.detectChanges();
      }

    );
  }

  GetListConceptCountry(type: string, page: number) {
    this._http._contryList = new Array<tblConcepValue>();
    this._http.GetListByName("ALL", type, 0).subscribe(
      (e) => {
        this._http._contryList = e.data;
       
        this._cdRef.detectChanges();
      }

    );
  }

  GetListConceptCity(type: string, page: number) {
    this._http._cityList = new Array<tblConcepValue>();
    this._http.GetListByName("ALL", type, 0).subscribe(
      (e) => {
        this._http._cityList = e.data;

        this._cdRef.detectChanges();
      }
    );
  }



  GetConceptValue(value: NameConcept, name: string) {
    var result = "N/A";
  
    if (value != null) {
      var data = value;
      var city = this._http._cityList.find(s => s.id == data.id);

      if (value != undefined) {
        if (name == "name") result = (city?.concept.name != undefined ? city?.concept.name : "") + " - " + data.name;
      }
    }
    return result;
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
    }
    if (name == "AdressConcept") {
      this._concept.type = TypeConcepValue.AdressConcept();
    }
    if (name == "typeProduct") { this._concept.type = TypeConcepValue.TypeProduct(); }
    this.GetListConceptAdress(this._concept.type);


    if (name == "CalendarHour") {
      this._concept.type = TypeConcepValue.CalendarHour();
      this.GetListConceptAdress(this._concept.type);

    }
  }



  loadContryData(mode: string) {
    this.GetListConceptCountry(mode, 0);
  }

  loadCityData(mode: string) {
    this.GetListConceptCity(mode, 0);
  }

  Selection(id: string) {
    this._rowSeletion = id;
    this._cdRef.detectChanges();
  }


  languageTraslate(value: string) {
    return value;
  }


  LoadGps() {
    var result = this.Gps.GetGps();

    this._concept.value = "lat:   " + result.latitud + "   ,   " + "lng:   " + result.longitud;

  }


  ValidateConcept() {
    if (this._concept.conceptCompany == undefined) this._concept.conceptCompany = new NameConcept();
    if (this._concept.conceptPrevious == undefined) this._concept.conceptPrevious = new NameConcept();
    if (this._concept.conceptProject == undefined) this._concept.conceptProject = new NameConcept();
    if (this._concept.concept == undefined) this._concept.concept = new NameConcept();
  }



}
