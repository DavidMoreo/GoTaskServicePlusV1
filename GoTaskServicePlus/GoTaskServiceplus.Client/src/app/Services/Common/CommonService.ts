import { ChangeDetectorRef, Injectable } from "@angular/core";
import { AlertService } from "./AlertService";
import { ConfigService } from "./ConfigService";
import { UtilitiService } from "./UtilitisService";
import { CityFilterFilterService } from "./CityFilterService";
import { NavMenuService } from "./NavMenuService";
import { LocalStorageService } from "./LocalStorageService";
import { EncryptService } from "./EncryptService ";
import { GpsService } from "./Gopositioning";


@Injectable({
  providedIn: 'root'
})

export class CommonService {
  _ConfigService: ConfigService;
  _UtilitiService: UtilitiService;
  _CityFilterFilterService: CityFilterFilterService;
  _NavMenuService: NavMenuService;
  _AlertService: AlertService;
  _StorageService: LocalStorageService;
  _EncryptService: EncryptService;
  /*_cdRef: ChangeDetectorRef;*/


  constructor(StorageService: LocalStorageService, EncryptService: EncryptService, ConfigService: ConfigService, UtilitiService: UtilitiService, CityFilterFilterService: CityFilterFilterService, NavMenuService: NavMenuService, AlertService: AlertService) {

    this._UtilitiService = UtilitiService;
    this._CityFilterFilterService = CityFilterFilterService;
    this._NavMenuService = NavMenuService;
    this._ConfigService = ConfigService;
    this._AlertService = AlertService;
    this._StorageService = StorageService;
    this._EncryptService = EncryptService;   
   
  }
  

  


}

