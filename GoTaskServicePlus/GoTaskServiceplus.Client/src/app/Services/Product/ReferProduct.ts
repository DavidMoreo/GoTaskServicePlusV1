
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../Common/ConfigService';
import { UtilitiService } from '../Common/UtilitisService';
import { tblReferProduct } from '../../Models/Product/ReferProduct';
import { CommonService } from '../Common/CommonService';
import { NameConcept, tblPrices } from '../../Models/Structure/tblProduct';



@Injectable({
  providedIn: 'root'
})



export class ReferService {

  _http: HttpClient;

  private referList: Array<tblReferProduct> = new Array<tblReferProduct>();
  private referListByCompanyId: Array<NameConcept> = new Array<NameConcept>();
  public rowSeletion: tblReferProduct;
  constructor(private http: HttpClient, private host: ConfigService, private _CommonService: CommonService) {
    this._http = http;
  }


  Save(refer: tblReferProduct) {
    var result = this._http.post<any>(this._CommonService._ConfigService.GetHostApi() + `ReferProductControlle/SaveAndUpdateReferProduct`, refer).subscribe((e) => {
      if (e.status) {       
        if (refer.id == this._CommonService._UtilitiService.GuidEmpty()) {
          this.referList.push(e.data);
          this.Clear();
        }
        else {
         this. referList =this.referList.filter(s => s.id != refer.id);
          this.referList.push(e.data);
          this.rowSeletion = e.data;
        }        
      
        this._CommonService._AlertService.AlertApi(e.msg);
      }
    });
    return result;
  }

  GetAll(filter: string, page: number) {
    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `ReferProductControlle/GetAllReferProduct?filter=${filter}&page=${page}`);
    result.subscribe((e) => {
      this.referList = e.data;
    });

    return result;
  }

  GetAllReferByCompanyId() {
    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `ReferProductControlle/GetAllConceptReferProductByCompany`);
    result.subscribe((e) => {
      this.referList = e.data;
    });

    return result;
  }

  GetById(id: string) {
    var result = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `ReferProductControlle/GetReferProductById?id=${id}`);
    return result;
  }

  DeleteById(id: string) {
    var result = this._http.delete<any>(this._CommonService._ConfigService.GetHostApi() + `ReferProductControlle/DeleteRefeProduct?id=${id}`);
    result.subscribe((e) => {
      if (e.status) {
        this.referList = this.referList.filter(s => s.id != id);
      }
      this._CommonService._AlertService.AlertApi(e.msg);
      this.Clear();
    });

    return result;
  }


  Clear() {
    this.rowSeletion = new tblReferProduct();
  }


  

  RemovePrice(item: tblPrices) {
    var data = this.GetItemRefer(item.id);
    this.referList = this.referList.filter(s => s != data);
    if (data != undefined)
      this.Save(data);
  }


  public GetItemRefer(refer: any) {   
    let dataTemp = JSON.stringify(refer);
    return JSON.parse(dataTemp);
  }


  //#Property

  GetListRefer() {
    if (this.referList == undefined) this.referList = new Array<tblReferProduct>;
    return this.referList;
  }


  //#Property


}

