import { Observable } from "rxjs";




export interface ILogin {
  _baseUrl: string;
  getLogin(email: string, password: string): Observable<any>;
  //RequestGeneralModel
}
