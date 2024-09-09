
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonService } from "../../../Services/Common/CommonService";
import { NameConcept, TypeConcepValue, tblConcepValue } from "../../../Models/Structure/tblProduct";
import { CityFilterFilterService } from "../../../Services/Common/CityFilterService";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { RegisterService } from "../../../Services/Segurity/Register/RegisterService";
import { LocalStorageService } from "../../../Services/Common/LocalStorageService";
import { Route, Router } from "@angular/router";





@Component({

  selector: "app-common-city-filter",
  templateUrl: './app.common-city-filter.component.html',
  styleUrls: ['./app.common-city-filter.css']

})
export class CityFilterComponent implements OnInit {





  constructor(private _Route: Router, private CommonService: CommonService, private _search: SearchProductService, private cdRef: ChangeDetectorRef, private _StorageService: LocalStorageService, private Register: RegisterService) {


  }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.GetListConcept(TypeConcepValue.CityConcept());
  }


  GetListConcept(type: string) {
    var response = this.CommonService._CityFilterFilterService.GetListByName(type, "");

    response.subscribe((e) => {
      if (this.CommonService._CityFilterFilterService.listCity == undefined) this.CommonService._CityFilterFilterService.listCity = new Array<tblConcepValue>;
      this.CommonService._CityFilterFilterService.listCity = e.data;

    });

  }


  GetFIlter() {

    if (!this.CommonService._CityFilterFilterService.listCityFilter) return new Array<tblConcepValue>;
    return this.CommonService._CityFilterFilterService.listCityFilter;
  }


  ChangedFilterInput(event: any) {

    var value = event.target.value;

    if (this.CommonService._CityFilterFilterService.listCity && value) {
      var data =
        this.CommonService._CityFilterFilterService.listCity.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));

      this.CommonService._CityFilterFilterService.listCityFilter = data;

      if (this.cdRef != undefined) this.cdRef.detectChanges();


    } else {
      this.CommonService._CityFilterFilterService.listCityFilter = new Array<tblConcepValue>;
    }


  }


  AddCityFilter(city: tblConcepValue) {

    var listCityFilter = new Array<NameConcept>();
    var exist;

    var dataList = this._StorageService.GetCityFilter();

    if (listCityFilter && dataList) {
      listCityFilter = JSON.parse(dataList);
    }

    if (listCityFilter) {
      exist = listCityFilter.find(s => s.id == city.id);
    }

    if (listCityFilter) listCityFilter = listCityFilter.filter(s => s.id != city.id);
    if (!exist) {

      var item = new NameConcept();
      item.id = city.id;
      item.value = city.value;

      listCityFilter.push(item);
    }

    this._StorageService.SetCityFilter(JSON.stringify(listCityFilter));
  }


  Remove(id: string) {
    var listCityFilter = new Array<NameConcept>();
    var dataList = this._StorageService.GetCityFilter();

    if (listCityFilter && dataList) {
      listCityFilter = JSON.parse(dataList);
      listCityFilter = listCityFilter.filter(s => s.id != id);
    }

    this._StorageService.SetCityFilter(JSON.stringify(listCityFilter));
  }


  ExisteCity(id: string) {
    var listCityFilter = new Array<NameConcept>();
    var exist;

    var dataList = this._StorageService.GetCityFilter();

    if (listCityFilter && dataList) {
      listCityFilter = JSON.parse(dataList);
    }

    if (listCityFilter) {
      exist = listCityFilter.find(s => s.id == id);
    }

    if (exist) {
      return true;
    }
    return false;

  }

  GetListFilter() {
    var dataList = this._StorageService.GetCityFilter();

    if (dataList) {
      var listCityFilter = JSON.parse(dataList);
      return listCityFilter;
    }
    return new Array<NameConcept>;
  }





  GetModeVisible() { return this.CommonService._CityFilterFilterService.GetModeVisible(); }
  GetModeCity() { return this.CommonService._CityFilterFilterService.GetModeCity(); }
  GetModeLogin() { return this.CommonService._CityFilterFilterService.GetModeLogin(); }


  CloseModeVisible() {
    this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
    this._search.FilterProduct();
  }

  SetIdUser() {
 
    this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
    this.Register.SetIdUser();
  }


  SetRoute(name:string) {
    this._Route.navigateByUrl(name);
    this.CommonService._CityFilterFilterService.ActiveMode(false, false, false);
  }

}
