import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SidebarComponent } from "../../loyouts/sidebar/sidebar.component";
import { HeaderComponent } from "../../loyouts/header/header.component";
import { AngularModule, MaterialModule } from '../../shared/modules';
import { BuscadorComponent } from "../../loyouts/buscador/buscador.component";
import { MatTableDataSource } from '@angular/material/table';
import { buscadorService } from '../../loyouts/buscador/buscador.service';

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

  datosFiltrados : any;
  fechaSeleccionada!: string;

cambiarTamanioPagina() {
throw new Error('Method not implemented.');
}





  homeForm!: FormGroup<any>;

  private readonly _fb = inject(FormBuilder);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _serviceBuscador = inject(buscadorService);
  totalItems: unknown;
  pageSize: unknown;
  fecha!: string;







obtenerFechaSeleccionada(event:any) {
  this.fechaSeleccionada = event.value; 
  console.log(this.fechaSeleccionada); 
}

  ngOnInit(): void {
    this.initHomeForm();
  }

  initHomeForm(): void {
    this.homeForm = this._fb.group({
      name: new FormControl(''),
    });
  }
  constructor(private filtroService: buscadorService) {
    this.filtroService.filtro$.subscribe(filtro => {
      if (filtro) {
        this.datosFiltrados = this.displayedColumns.filter(columna => 
          columna && columna.periodo && columna.periodo.includes(filtro.formattedDate) &&
          columna.estado && columna.estado.includes(filtro.estado) &&
          columna.cliente && columna.cliente.includes(filtro.cliente) &&
          columna.proyecto && columna.proyecto.includes(filtro.proyecto)
        );
      } else {
        this.datosFiltrados = this.displayedColumns;
      }});

    this._serviceBuscador.fecha$.subscribe(fecha => {
    this.fecha = fecha;});
    console.log(this.fecha)
}

  

  

displayedColumns: any[] = ['cliente', 'proyecto', "periodo" + this.fecha, 'periodoAnterior','estado'];
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



