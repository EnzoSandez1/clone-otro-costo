import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { AngularModule, MaterialModule } from '../../shared/modules';

import 'moment/locale/es';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

import _moment from 'moment';
import { Moment, default as _rollupMoment } from 'moment';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { buscadorService } from './buscador.service';
import moment from 'moment';

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

  private readonly _buscadorService = inject(buscadorService);

 

  estados: estado[] = [
    { value: 'pendiente-0', viewValue: 'Pendiente' },
    { value: 'cargado-1', viewValue: 'Cargado' },
  ];

  clientes: cliente[] = [
    {value: 'Osde', viewValue: 'Osde'},
    {value: 'cliente 2-1', viewValue: 'Zurich'},
    {value: 'cliente 3-2', viewValue: 'Cenea'},
    {value: 'cliente 4-3', viewValue: 'Correo Argentino'},
    {value: 'cliente 5-4', viewValue: 'MULESOFT'},
    {value: 'cliente 6-5', viewValue: 'BBVA'},
    {value: 'cliente 7-6', viewValue: 'Telecom'},
    {value: 'cliente 7-7', viewValue: 'Coelsa'},
  ];

  proyectos: proyecto[] = [
    {value: 'ARG011002 2 OSDE SWF JAVA', viewValue: 'ARG011002 2 OSDE SWF JAVA'},
    {value: 'ARG420001 2 MULESOFT', viewValue: 'ARG420001 2 MULESOFT'},
    {value: 'ARG423002 2 Coelsa SWF QA', viewValue: 'ARG423002 2 Coelsa SWF QA'},
    {value: 'proyecto 4', viewValue: 'ARG004004 2 BBVA COBOL'},
    {value: 'proyecto 5', viewValue: 'ARG402002 2 Telecom SWF'},
    {value: 'proyecto 6', viewValue: 'ARG011006 2 OSDE SWF JAVA'},
    {value: 'proyecto 7', viewValue: 'ARG420008 2 MULESOFT'},
    {value: 'proyecto 8', viewValue: 'ARG423001 2 Coelsa SWF QA'},
    {value: 'proyecto 9', viewValue: 'ARG004004 2 BBVA COBOL'},
    {value: 'proyecto 10', viewValue: 'ARG402002 2 Telecom SWF'},
  ];

  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  startAt: any;

  buscadorForm!: FormGroup;
  selectedDate!: string;
  fechaGuardar!: any;
  fechaFormateada!: string ;
  ngOnInit(): void {
    this.initIngresarForm();
  }

  initIngresarForm(): void {
    this.buscadorForm = new FormGroup({
      date: new FormControl('', []),
      estado: new FormControl('', []),
      cliente: new FormControl('', []),
      proyecto: new FormControl('', []),
      formattedDate: new FormControl('', []),
      

    });
  }

  actualizarFiltros() {
    this._buscadorService.setFiltro(this.buscadorForm.value);
    console.log(this.buscadorForm.value); 
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
    const fechaGuardar=`${month}-${year}`;
    //const date = `${year}-${month}-01`;
    //this.buscadorForm.get('date')?.setValue(moment(date, 'YYYY-MM-DD'));
    this.buscadorForm.get('date')?.setValue(new Date(fechaGuardar));
    this.buscadorForm.get('formattedDate')?.setValue(fechaGuardar); // Establece el valor de formattedDate
    console.log(this.fechaGuardar);
  
    this.buscadorForm.get('formattedDate')?.valueChanges.subscribe(date => {
      this._buscadorService.setFecha(fechaGuardar);
    });
    datepicker.close();
   
  }

  onSearch() {
    this.search.emit(this.searchQuery);
  }

};





