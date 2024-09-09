import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Coordinates } from '../../Models/Common/Coordinates';


@Injectable({
  providedIn: 'root'
})

export class NavMenuService {

 private loginStatus: boolean = false;

  public constructor() {
   
  }


 public StatusLogin(status: boolean) {
    this.loginStatus = status;
  }

  public GetStatusLogin(): boolean {
    return this.loginStatus;
  }


}

