import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../Common/ConfigService";
import { NameConcept, tblConcepValue } from "../../../Models/Structure/tblProduct";
import { Observable, catchError, throwError } from "rxjs";
import { LoginSevice } from "../../Segurity/Login/LoginService";
import { ResponseHttp } from "../../../Models/Common/Response";
import { CommonService } from "../../Common/CommonService";
import { GpsService } from "../../Common/Gopositioning";



@Injectable({
  providedIn: 'root'
})



export class ConceptStoreTrackingService {

  _http: HttpClient;
  conceptList: Array<tblConcepValue> = new Array<tblConcepValue>();
  concept: tblConcepValue = new tblConcepValue();
  rowSeletion: tblConcepValue = new tblConcepValue();


  constructor(private http: HttpClient, private _CommonService: CommonService, private Gps: GpsService) {
    this._http = http;  
  }



  SaveAndUpdateConcept(data: tblConcepValue): Observable<any> {
    var response = this._http.post<ResponseHttp>(this._CommonService._ConfigService.GetHostApi() + "Concept/SaveAndUpdateConcept", data);
   /* this.LoadKeyRefresh(response);*/
    return response;

  }

  DeleteConcept(id: string): Observable<any> {

    var response = this._http.delete<ResponseHttp>(this._CommonService._ConfigService.GetHostApi() + "Concept/DeleteConcept" + "?id=" + id);

    response.subscribe({

      next:(e:any)=> {       
        if (e.status) {

          this.conceptList = this.conceptList.filter(s => s.id != id);

        }
      }

    });
    this.ClearData();
    return response;    
  }

  GetListByName(filter: string, type: string, page: number): Observable<any> {  
    var response = this._http.get<any>(this._CommonService._ConfigService.GetHostApi() + `Concept/GetAllConcept?filter=${filter}&type=${type}&page=${page}`);
    response.subscribe(
      (e) => {
        this.conceptList = e.data;
      }
    );
    return response;
  }



  GetListById(id: string): Observable<any> {
    var response = this._http.get(this._CommonService._ConfigService.GetHostApi() + `Concept/GetConceptById?id=${id}`);
    response.subscribe({

      next: (e: any) => {
        if (e.status) {
          this.concept = e.data;
        }
      }

    });
    this.ClearData();
    return response;
  }



  LoadGps() {
    var result = this.Gps.GetGps();
    this.concept.value = "lat:   " + result.latitud + "   ,   " + "lng:   " + result.longitud;

  }


  ClearData() {
    this.concept.concept = new tblConcepValue();
    this.rowSeletion = new tblConcepValue();
    this.concept = new tblConcepValue();
  }

}

