import { Injectable } from "@angular/core";
import { tblConcepValue } from "../../../Models/Structure/tblProduct";




@Injectable({
  providedIn: 'root'
})

export class InputSearchService {

  listFilterUpdate: Array<tblConcepValue>;
  menuVisible: boolean = false;
 
}

