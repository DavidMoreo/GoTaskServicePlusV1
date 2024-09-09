import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import { Observable } from 'rxjs';

import { tblCompany, tblProject } from '../../../Models/Admin/Admin';
import { ConfigService } from '../../Common/ConfigService';
import { tblRol, tblUser } from '../../../Models/Segurity/Register/RegisterModel';
import { SearchFilter } from '../../../Models/Admin/SearchFilter';
import { Pages } from '../../../Models/Segurity/PageModel';
import { GridCustomService } from '../../Common/CustomControl/GridCustomService';
import { GridItem } from '../../../Models/Common/GridModel';



@Injectable({
  providedIn: 'root'
})



export class RolUserService {

  _http: HttpClient;
  _host: ConfigService;

  listRolUser: Array<tblRol>;
  rol: tblRol = new tblRol();
  listPages: Array<Pages>;
  constructor(private http: HttpClient, private host: ConfigService, private _GridCustom: GridCustomService) {
    this._host = host;
    this._http = http;
  }




  GetRolById(id: string): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Rol/GetRolById?id=${id}`);
    result.subscribe((e) => {    
      if (e.status) {
        console.log(this.rol)
        this.rol = e.data;
      }
    }
    );
    return result;
  }


  GetRolsByProject(filter: string, page: number): Observable<any> {
    var result = this._http.get<any>(this._host.GetHostApi() + `Rol/GetAllRol?page=${page}&filter=${filter}`);
    result.subscribe((e) => {
      this.listRolUser = e.data;
      console.log("rol", this.listRolUser);
      this.LoadGrid();
    }
    );
    return result;
  }



  DeleteRol(id: string): Observable<any> {
    var result = this._http.delete<any>(this._host.GetHostApi() + `Rol/DeleteRol?id=${id}`);
    result.subscribe((e) => {
      if (e.status) {
        this.listRolUser = this.listRolUser.filter(s => s.id != id);
      }
      else {
        alert("no eliminado" + e.msg);
      }
    }
    );
    return result;
  }


  SaveRols(rol: tblRol): Observable<any> {

    var result = this._http.post<any>(this._host.GetHostApi() + `Rol/SaveRol`, rol);
    result.subscribe((e) => {
      if (e.status) {


        if (this.listRolUser == undefined || this.listRolUser == null) {
          this.listRolUser = new Array<tblRol>;
        }

        this.listRolUser.push(e.data);
        this.rol = new tblRol();


      } else {
        alert("No Guardado");
      }
    }
    );
    return result;
  }

  UpdateRols(rol: tblRol): Observable<any> {

    var result = this._http.post<any>(this._host.GetHostApi() + `Rol/UpdateRol`, rol);
    result.subscribe((e) => {
      if (e.status) {
        alert("actualizado");
        this.rol = new tblRol();
      } else {
        alert("No actulizado");
      }
    }
    );
    return result;
  }



  GetPagesPermission(): Observable<any> {

    var result = this._http.get<any>(this._host.GetHostApi() + `Pages/GetAllPages?filter=all&page=0`);
    result.subscribe((e) => {
      if (e.status) {
        this.listPages = e.data;
      } else {

      }
    }
    );
    return result;
  }



  ClearRol() {
    this.rol = new tblRol();
  }





  LoadGrid() {
    var item = new GridItem();
    this._GridCustom.data = Array<GridItem>();
    this.listRolUser.forEach((e) => {
      item = new GridItem();
      item.id = e.id;
      item.value = e.name;
      this._GridCustom.data.push(item);

      item = new GridItem();
      item.id = e.id;
      item.value = e.name;
      this._GridCustom.data.push(item);

      item = new GridItem();
      item.id = e.id;
      item.value = e.name;
      this._GridCustom.data.push(item);

      item = new GridItem();
      item.id = e.id;
      item.value = e.name;
      this._GridCustom.data.push(item);

    });

  }





}

