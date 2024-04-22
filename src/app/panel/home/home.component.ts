import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SidebarComponent } from "../../loyouts/sidebar/sidebar.component";
import { HeaderComponent } from "../../loyouts/header/header.component";
import { AngularModule, MaterialModule } from '../../shared/modules';
import { BuscadorComponent } from "../../loyouts/buscador/buscador.component";
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        AngularModule,
        MaterialModule,
        SidebarComponent, HeaderComponent,
        BuscadorComponent
    ]
})


export class HomeComponent implements OnInit {


cambiarTamanioPagina() {
throw new Error('Method not implemented.');
}




  homeForm!: FormGroup<any>;

  private readonly _fb = inject(FormBuilder);
  private readonly _cdr = inject(ChangeDetectorRef);
  totalItems: unknown;
  pageSize: unknown;

fechaSeleccionada: Date = new Date(); // Variable para almacenar la fecha seleccionada

obtenerFechaSeleccionada(event:any) {
  this.fechaSeleccionada = event.value; // Guarda la fecha seleccionada en la variable
  console.log(this.fechaSeleccionada); // Muestra la fecha en la consola
}

  ngOnInit(): void {
    this.initHomeForm();
  }

  initHomeForm(): void {
    this.homeForm = this._fb.group({
      name: new FormControl(''),
    });
  }

displayedColumns: string[] = ['cliente', 'proyecto', 'periodo', 'periodoAnterior','estado'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
}
const ELEMENT_DATA: Element[] = [
  {cliente: 'Osde', proyecto: 'arg2873217sas', periodo: '$100', periodoAnterior:'$140',estado: 'habilitado'} ,


];
export interface Element {
  cliente: string;
  proyecto: string;
  periodo: string;
  periodoAnterior: string;
  estado: string ;


}



