
import { Observable } from 'rxjs';
import { CommonService } from './CommonService';
import { ConceptService } from '../Product/Concept/ConceptService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameConcept, tblConcepValue } from '../../Models/Structure/tblProduct';
import { UtilitiService } from './UtilitisService';
import { LocalStorageService } from './LocalStorageService';



@Injectable({
  providedIn: 'root'
})

export class CityFilterFilterService {

  listCityFilter: Array<tblConcepValue>;
  listCity: Array<tblConcepValue>;
  private visible: boolean = false;
  private modeCity: boolean = false;
  private modeLogin: boolean = false;
  
  private _ConceptService: ConceptService;

  constructor(http: HttpClient, private ConceptService: ConceptService, private _StorageService: LocalStorageService) {  
    this._ConceptService = ConceptService;
  }


  GetListByName(type: string, countryId: string ): Observable<any> {  
    var response = this._ConceptService.GetListByCountry(type, "0");
    return response;
  }


  ActiveMode(visible: boolean = true, modeLogin: boolean = false, modeCity: boolean = true) {
    this.visible = visible;
    this.modeCity = modeCity;
    this.modeLogin = modeLogin;
  }

  GetModeActiveFilter() { return this.visible; }
  GetModeVisible() { return this.visible; }
  GetModeCity() { return this.modeCity; }
  GetModeLogin() { return this.modeLogin; }


  GetStatusFilterCity() {
    var dataList = this._StorageService.GetCityFilter();
   
    if (dataList) {
      var listCityFilter = JSON.parse(dataList);
      
      if ( listCityFilter.length >0)
      return true;
    }
    return false;
  }

 

  GetListFilterCity(): Array<NameConcept> {
    var dataList = this._StorageService.GetCityFilter();
    var list = new Array<NameConcept>;
    if (dataList) {
      var listCityFilter = JSON.parse(dataList);

      if (listCityFilter)
        list = listCityFilter;
    }
    return list;
  }

}

