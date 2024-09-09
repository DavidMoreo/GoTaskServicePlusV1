import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})



export class FilterSearchService {

  _http: HttpClient;
  private _ListFilter: Array<string>;
  isVisible: boolean = false;

  constructor(private http: HttpClient) {
    this._http = http;
  }

  GetListFilter() {
    if (this._ListFilter != null) return this._ListFilter;
    return new Array<string>;
  }

  RemoveFilter(name: string) {
    if (this._ListFilter != null) {
      this._ListFilter = this._ListFilter.filter(s => s != name);
    }

  }


  AddListFilter(value: string) {
    if (this._ListFilter == null) this._ListFilter = new Array<string>;
    this._ListFilter.push(value);
  }

  Clear() {
    this._ListFilter = new Array<string>;

  }


  SetRagnge(list: Array<string>) {
    if (this._ListFilter == null) this._ListFilter = new Array<string>;
    if (list != null && list != undefined) {
      list.forEach((e) => {
        this._ListFilter.push(e);
      })
    }
  }


}

