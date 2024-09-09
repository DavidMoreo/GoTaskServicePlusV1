import { ChangeDetectorRef, Injectable } from '@angular/core';
import { GridItem } from '../../../Models/Common/GridModel';



@Injectable({
  providedIn: 'root'
})

export class GridCustomService {

  RowSeletion: string = "";
  data: Array<GridItem>;
  dataHeader: Array<GridItem>;

 
}

