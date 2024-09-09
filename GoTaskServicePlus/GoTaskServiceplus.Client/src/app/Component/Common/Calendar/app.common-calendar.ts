
import { Component, OnInit } from "@angular/core";
import { AlertService } from "../../../Services/Common/AlertService";
import { DayModel } from "../../../Models/Common/DayModel";
import { mod } from "@tensorflow/tfjs";





@Component({

  selector: "app-common-calendar",
  templateUrl: './app.common-calendar.component.html',
  styleUrls: ['./app.common-calendar.css'],

})
export class CalendarComponent implements OnInit {


  days: Array<DayModel>;
  daysNumber: number = 1;
  daySelect: DayModel = new DayModel();
  dateSelect: Date = new Date();
  _service: AlertService;

  constructor(service: AlertService) {
    this._service = service;
  }

  ngOnInit(): void {
    this.dateSelect = this.Date();
    this.days = this.mostrarDiasDelMes(this.dateSelect.getMonth(), this.dateSelect.getFullYear());
  }


  SelectDay(day: DayModel) {
    var selet = this.days.find(s => s.day == day.day);
    if (selet != undefined)
      this.daySelect = selet;
  }


  ClearSelectDay(day: DayModel) {
    this.days = this.mostrarDiasDelMes(day.day, 2024);
  }

  GoDay(mode: boolean) {
    var dateTemp;
    if (mode)
      this.dateSelect.setMonth(this.dateSelect.getMonth() + 1);
    else
      this.dateSelect.setMonth(this.dateSelect.getMonth() - 1);



    this.days = this.mostrarDiasDelMes(this.dateSelect.getMonth(), this.dateSelect.getFullYear());
  }


  mostrarDiasDelMes(mes: number, año: number): DayModel[] {
    //mes = (mes - 1);

    const primerDiaDelMes = new Date(año, mes, 1);
    const ultimoDiaDelMes = new Date(año, mes + 1, 0).getDate(); // Obtener el día del mes en lugar de la fecha completa
    const dias: DayModel[] = [];

    for (let i = 1; i <= ultimoDiaDelMes; i++) {
      const dia = new DayModel();
      dia.day = i;
      dia.active = this.ValidateDateActive(año, mes, i);
      dias.push(dia);
    }

    return dias;
  }


  ValidateDateActive(year: number, month: number, day: number) {
    const fechaActual = this.Date();
    var date = new Date(year, month, day) > fechaActual;

    /*alert(fechaActual.getUTCDay());*/

    if (fechaActual.getFullYear() <= year)
      if (fechaActual.getMonth() <= month)
        if (fechaActual.getDate() <= day)
          return true;

    return false;

  }

  DateString(fecha: Date): string {

    const fechaEnTexto = fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric', timeZone: 'America/Bogota' }); // 'es-ES' para obtener el mes en español

    return fechaEnTexto.toUpperCase();
  }

  Date(): Date {
    const fechaActual = new Date();   
    return fechaActual;
}


}
