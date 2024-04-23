import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SidebarComponent } from "../../loyouts/sidebar/sidebar.component";
import { HeaderComponent } from "../../loyouts/header/header.component";
import { AngularModule, MaterialModule } from '../../shared/modules';
import { BuscadorComponent } from "../../loyouts/buscador/buscador.component";
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../loyouts/buscador/buscador.service';
// import { buscadorService } from '../../loyouts/buscador/buscador.service.ts-copy';

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

  datosFiltrados: any;
  fechaSeleccionada!: string;

  cambiarTamanioPagina() {
    throw new Error('Method not implemented.');
  }





  homeForm!: FormGroup<any>;

  private readonly _fb = inject(FormBuilder);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _serviceBuscador = inject(BuscadorService);
  totalItems: unknown;
  pageSize: unknown;
  fecha!: string;

  dataRecibida: any;

  ngOnInit(): void {
    this.initHomeForm();

    this.cargarData();
  }

  cargarData(): void {
    this._serviceBuscador.getData().subscribe((data: any) => {
      if (data === null || data === undefined) return;
      this.dataRecibida = data;
      console.log('Datos recibidos en HomeComponent:', this.dataRecibida);
    });
  }

  initHomeForm(): void {
    this.homeForm = this._fb.group({
      name: new FormControl(''),
    });
  }


  displayedColumns: any[] = ['cliente', 'proyecto', "periodo" + this.fecha, 'periodoAnterior', 'estado'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
}

const ELEMENT_DATA: Element[] = [
  { cliente: 'Osde', proyecto: 'arg2873217sas', periodo: '$100', periodoAnterior: '$140', estado: 'habilitado' },
];


export interface Element {
  cliente: string;
  proyecto: string;
  periodo: string;
  periodoAnterior: string;
  estado: string;


}



