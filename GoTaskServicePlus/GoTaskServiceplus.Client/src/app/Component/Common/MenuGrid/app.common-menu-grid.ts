import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AlertService } from "../../../Services/Common/AlertService";
import { Msg } from "../../../Models/Common/ModelAlert";
import { ProductService } from "../../../Services/Product/AddUpdateProduct";




@Component({
  standalone: true,
  selector: "app-common-menu-grid",
  templateUrl: './app.common-menu-grid.component.html',
  styleUrls: ['./app.common-menu-grid.css'],
  imports: [CommonModule]
})
export class MenuGridComponent implements OnInit, DoCheck {

  @Output() Edit = new EventEmitter<string>();
  @Output() Delete = new EventEmitter<string>();
  @Output() Clone = new EventEmitter<string>();
  @Output() ClearData = new EventEmitter();
  @Output() Change = new EventEmitter();

  @Input() IsDelete: boolean = true;
  @Input() IsClone: boolean = false;
  @Input() IsClearData = true;

  @Input() visible: boolean = true;
  @Input() item: string;
  _service: AlertService;

  constructor(service: AlertService, private _productService: ProductService) {
    this._service = service;
  }
  ngDoCheck(): void {
 
  }

  ngOnInit(): void {

  }

  EditGrid() {
    this.Edit.emit(this.item);
    this.Change.emit("Edit");
  }

  DeleteGrid() {
    this.Delete.emit(this.item);
    this.Change.emit("Delete");
  }

  CloneGrid() {
    this.Clone.emit(this.item);
    this.Change.emit("Clone");
  }

  ClearDataGrid() {
    this.ClearData.emit();
    this.Change.emit("Clear");
  }




  isDragging = false;
  startX = 0;
  startY = 0;
  positionX = 0;
  positionY = 0;
  scale = 1;
  zoomOrigin: number = 1;




  onDragStart(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.startX = clientX - this.positionX;
    this.startY = clientY - this.positionY;

  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (this.isDragging) {
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

      // Calcular la diferencia entre la posición actual y la nueva posición
      const deltaX = (clientX - this.startX) - this.positionX;
      const deltaY = (clientY - this.startY) - this.positionY;

      // Definir una velocidad de suavizado
      const smoothness = 0.29; // Puedes ajustar este valor según la velocidad de suavizado deseada

      // Aplicar suavizado para hacer movimientos lentos y suaves
      this.positionX += deltaX - smoothness;
      this.positionY += deltaY - smoothness;
    }
  }


  onDragEnd() {
    this.isDragging = false;
  }


}
