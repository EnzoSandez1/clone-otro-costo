import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { AngularModule, MaterialModule } from '../../shared/modules';
import { DatePipe } from '@angular/common';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import 'moment/locale/es';
import moment from 'moment';
import { Moment, default as _rollupMoment } from 'moment';
import { BuscadorService } from './buscador.service';


export const formatMonthYear = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface estado {
  value: string;
  viewValue: string;
}

interface cliente {
  value: string;
  viewValue: string;
}

interface proyecto {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [
    AngularModule,
    MaterialModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss',
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: formatMonthYear },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],

})
export class BuscadorComponent implements OnInit {

  estados: estado[] = [
    { value: 'pendiente-0', viewValue: 'Pendiente' },
    { value: 'cargado-1', viewValue: 'Cargado' },
  ];

  clientes: cliente[] = [
    { value: 'Osde', viewValue: 'Osde' },
    { value: 'cliente 2-1', viewValue: 'Zurich' },
    { value: 'cliente 3-2', viewValue: 'Cenea' },
    { value: 'cliente 4-3', viewValue: 'Correo Argentino' },
    { value: 'cliente 5-4', viewValue: 'MULESOFT' },
    { value: 'cliente 6-5', viewValue: 'BBVA' },
    { value: 'cliente 7-6', viewValue: 'Telecom' },
    { value: 'cliente 7-7', viewValue: 'Coelsa' },
  ];

  proyectos: proyecto[] = [
    { value: 'ARG011002 2 OSDE SWF JAVA', viewValue: 'ARG011002 2 OSDE SWF JAVA' },
    { value: 'ARG420001 2 MULESOFT', viewValue: 'ARG420001 2 MULESOFT' },
    { value: 'ARG423002 2 Coelsa SWF QA', viewValue: 'ARG423002 2 Coelsa SWF QA' },
    { value: 'proyecto 4', viewValue: 'ARG004004 2 BBVA COBOL' },
    { value: 'proyecto 5', viewValue: 'ARG402002 2 Telecom SWF' },
    { value: 'proyecto 6', viewValue: 'ARG011006 2 OSDE SWF JAVA' },
    { value: 'proyecto 7', viewValue: 'ARG420008 2 MULESOFT' },
    { value: 'proyecto 8', viewValue: 'ARG423001 2 Coelsa SWF QA' },
    { value: 'proyecto 9', viewValue: 'ARG004004 2 BBVA COBOL' },
    { value: 'proyecto 10', viewValue: 'ARG402002 2 Telecom SWF' },
  ];

  buscadorForm!: FormGroup;
  private readonly _buscadorService = inject(BuscadorService);

  ngOnInit(): void {
    this.initIngresarForm();
  }

  initIngresarForm(): void {
    this.buscadorForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required]),
      proyecto: new FormControl('', [Validators.required]),
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const month = normalizedMonthAndYear.month();
    const year = normalizedMonthAndYear.year();
    const date = moment().year(year).month(month);
    this.buscadorForm.get('date')?.setValue(date);
    datepicker.close();
  }

  validatedForm(): void {
    if (this.buscadorForm.valid) {
      this.onSearch();
    } else {
      console.log('Formulario inválido');
    }
  }

  onSearch() {
    const data = this.buscadorForm.value;
    const fecha = data.date;
    const formattedDate = moment(fecha).format('MM/YYYY');

    const dataParaEnviar = { ...data, date: formattedDate };
    this._buscadorService.setData(dataParaEnviar);
  }

  resetForm(): void {
    this.buscadorForm.reset();
  }

};
