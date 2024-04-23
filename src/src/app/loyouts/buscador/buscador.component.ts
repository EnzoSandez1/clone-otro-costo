import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { AngularModule, MaterialModule } from '../../shared/modules';

import 'moment/locale/es';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

import _moment from 'moment';
import { Moment, default as _rollupMoment } from 'moment';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
    { value: 'pendiente-0', viewValue: 'Osde' },
    { value: 'cargado-1', viewValue: 'Zurich' },
  ];

  proyectos: proyecto[] = [
    { value: 'pendiente-0', viewValue: 'Pendiente' },
    { value: 'cargado-1', viewValue: 'Cargado' },
  ];

  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  startAt: any;

  buscadorForm!: FormGroup;
  selectedDate!: string;

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

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${month}-${year}`;
  }

  updateDate(event: any): void {
    console.log(event.value);
    const selectedDate = event.value;
    if (selectedDate) {

      const formattedDate = this.formatDate(selectedDate);
      this.buscadorForm.get('fechaDesde')?.setValue(formattedDate);
    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const month = normalizedMonthAndYear.month().toString().padStart(2, '0');
    const year = normalizedMonthAndYear.year();
    // const date = `${month}/${year}`;
    const date = `${year}/${month}`;
    this.buscadorForm.get('date')?.setValue(new Date(date));
    datepicker.close();
  }

  onSearch() {
    this.search.emit(this.searchQuery);
  }

};





