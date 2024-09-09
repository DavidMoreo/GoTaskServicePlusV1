import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";



export interface IHttp {

  getHttp(utl: string): Observable<any>;

  postHttp(utl: string, body: string): Observable<any>;
}
