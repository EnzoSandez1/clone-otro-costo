import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { AngularModule, MaterialModule } from '../../shared/modules';

import {MatSelectModule} from '@angular/material/select';

import { provideNativeDateAdapter} from '@angular/material/core';




import 'moment/locale/es';
//import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

import * as _moment from 'moment';
import { Moment, default as _rollupMoment } from 'moment';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';


//const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
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
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
   ],

})
export class BuscadorComponent implements OnInit {



  selectedDate!: string;

  startDate = new Date();

  ingresarForm!: FormGroup;

  date: any;

  constructor() { }

  ngOnInit(): void {
    this.initIngresarForm();
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    //const ctrlValue = this.date.value ?? moment();
    const ctrlValue = this.ingresarForm.value.date;
    console.log(ctrlValue);
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  initIngresarForm(): void {
    this.ingresarForm = new FormGroup({
      date: new FormControl('', [Validators.required ]),
      estado: new FormControl('', [Validators.required]),
      cliente: new FormControl('', [Validators.required ]),
      proyecto: new FormControl('', [Validators.required]),

    });
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    // Formatear la fecha al formato MM-yyyy
    const formattedDate = this.formatDate(event.value!);
    this.selectedDate = formattedDate;
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${month}-${year}`;
  }



  estados: estado[] = [
    {value: 'pendiente-0', viewValue: 'Pendiente'},
    {value: 'cargado-1', viewValue: 'Cargado'},
  ];

  clientes: cliente[] = [
    {value: 'pendiente-0', viewValue: 'Osde'},
    {value: 'cargado-1', viewValue: 'Zurich'},
  ];

  proyectos: proyecto[] = [
    {value: 'pendiente-0', viewValue: 'Pendiente'},
    {value: 'cargado-1', viewValue: 'Cargado'},
  ];

  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
startAt: any;

  onSearch() {
    this.search.emit(this.searchQuery);
  }


};





