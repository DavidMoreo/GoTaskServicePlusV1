import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "../../Common/ConfigService";
import { HttpClientService } from "../../Common/HttpService";
import { NameConcept, tblConcepValue } from "../../../Models/Structure/tblProduct";
import { Observable, catchError, throwError } from "rxjs";
import { LoginSevice } from "../../Segurity/Login/LoginService";
import { ResponseHttp } from "../../../Models/Common/Response";



@Injectable({
  providedIn: 'root'
})



export class ConceptService {

  _http: HttpClient;
  _configService: ConfigService;
  _login: LoginSevice;

  _cityList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _contryList: Array<tblConcepValue> = new Array<tblConcepValue>();
  _adressList: Array<tblConcepValue> = new Array<tblConcepValue>();

  _conceptList: Array<tblConcepValue> = new Array<tblConcepValue>();
 
  _listTypeConcept: Array<NameConcept>;

  constructor(private http: HttpClient, private host: ConfigService, loginSevice: LoginSevice) {
    this._configService = host;
    this._http = http;
    this._login = loginSevice;
  }


  GetListProdutByfiler(filter: string, type: string, page: number): Observable<any> {

    var response = this._http.get(this._configService.GetHostApi() + `Concept/GetAllConcept?filter=${filter}&type=${type}&page=${page}`);
    /*this.LoadKeyRefresh(response);*/
    return response;
  }




  SaveAndUpdateConcept(data: tblConcepValue): Observable<any> {
    var response = this._http.post<ResponseHttp>(this._configService.GetHostApi() + "Concept/SaveAndUpdateConcept", data);
   /* this.LoadKeyRefresh(response);*/
    return response;

  }

  DeleteConcept(id: string): Observable<any> {
    var response =  this._http.delete<ResponseHttp>(this._configService.GetHostApi() + "Concept/DeleteConcept" + "?id=" + id);
   
    return response;    
  }

  GetListByName(filter: string, type: string, page: number): Observable<any> {
  
    var response = this._http.get<any>(this._configService.GetHostApi() + `Concept/GetAllConcept?filter=${filter}&type=${type}&page=${page}`);
    /*this.LoadKeyRefresh(response);*/
    return response;
  }

  GetListByCountry(type: string, countryId: string): Observable<any> {
    var response = this._http.get<any>(this._configService.GetHostApi() + `Concept/GetAllConceptByCountry?type=${type}&countryId=${countryId}`);  
    return response;
  }

  GetListById(id: string): Observable<any> {
    var response = this._http.get(this._configService.GetHostApi() + `Concept/GetConceptById?id=${id}`);
   /* this.LoadKeyRefresh(response);*/
    return response;
  }

  GetListImgByIdCompany( filter:string, page: Number): Observable<any> {
    var response = this._http.get(this._configService.GetHostApi() + `Product/GetImgByByComapny?filter=${filter}&page=${page}`);
   
    return response;
  }

  private LoadKeyRefresh(response: Observable<any>) {

    response.subscribe(
        (e) => {
       
          if (e.keyRefresh != undefined) {
            this._login.SavedStatusLogin(e.keyRefresh);
          }
        }
     
      );
  }

 

}

