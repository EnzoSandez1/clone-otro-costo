import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


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
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,FormsModule,MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss',
  providers: [provideNativeDateAdapter()],

})
export class BuscadorComponent {
  estados: estado[] = [
    {value: 'pendiente-0', viewValue: 'Pendiente'},
    {value: 'cargado-1', viewValue: 'Cargado'},
  ];

  clientes: cliente[] = [
    {value: 'pendiente-0', viewValue: 'Pendiente'},
    {value: 'cargado-1', viewValue: 'Cargado'},
  ];

  proyectos: proyecto[] = [
    {value: 'pendiente-0', viewValue: 'Pendiente'},
    {value: 'cargado-1', viewValue: 'Cargado'},
  ];

  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }


}


