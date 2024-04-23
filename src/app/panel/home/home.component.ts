import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SidebarComponent } from '../../loyouts/sidebar/sidebar.component';
import { HeaderComponent } from '../../loyouts/header/header.component';
import { AngularModule, MaterialModule } from '../../shared/modules';
import { BuscadorComponent } from '../../loyouts/buscador/buscador.component';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../loyouts/buscador/buscador.service';
// import { buscadorService } from '../../loyouts/buscador/buscador.service.ts-copy';

interface Element {
  cliente: string;
  proyecto: string;
  montoPeriodo: string;
  periodoAnterior: string;
  estado: string;
  periodo?: string;
}

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

  fechaLocal!: string;

  cargarCabecera: any[] = [];

  displayedColumns: any[] = ['Cliente', 'Proyecto', `Periodo: this.cargarCabecera = ${this.fechaLocal}`, 'periodoAnterior', 'Estado'];;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  homeForm!: FormGroup<any>;
  datosFiltrados: any;
  fechaSeleccionada!: string;


  private readonly _fb = inject(FormBuilder);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _serviceBuscador = inject(BuscadorService);
  totalItems: unknown;
  pageSize: unknown;
  fecha!: string;

  dataRecibida: any = {};

  ngOnInit(): void {
    const fecha = new Date();
    this.fechaLocal = fecha.toLocaleDateString();
    this.initHomeForm();

    this.cargarData();
  }


  cargarData(): void {
    this._serviceBuscador.getData().subscribe((data: any) => {

      // if (data === null || data === undefined) return;

      this.dataRecibida = data;
      console.log('Datos recibidos en HomeComponent:', this.dataRecibida);
      const cabecera = ['Cliente', 'Proyecto', `Periodo: ${data.date = ''}`, 'periodoAnterior', 'Estado'];
      // this.cargarCabecera = cabecera;

      this.mappinData(data);
    });
  }

  mappinData(data: any): void {
    this.datosFiltrados = data;
    const respdata = data.map((item: any) => {
      return {
        cliente: item.cliente,
        proyecto: item.proyecto,
        montoPeriodo: item.montoPeriodo,
        periodoAnterior: item.periodoAnterior,
        estado: item.estado
      };
    });
    this._cdr.detectChanges();
  }

  cambiarTamanioPagina() {
    throw new Error('Method not implemented.');
  }

  initHomeForm(): void {
    this.homeForm = this._fb.group({
      name: new FormControl(''),
    });
  }

  unmetodparaMontaraTbla(): void {

  }


}

const ELEMENT_DATA: Element[] = [
  { cliente: 'Osde', proyecto: 'arg2873217sas', montoPeriodo: '$100', periodoAnterior: '$140', estado: 'habilitado' },
];






