import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class buscadorService {
  constructor() { }

  private _filtro = new BehaviorSubject<{ estado?: string, cliente?: string, proyecto?: string ,formattedDate? : string } | null>({});
  public filtro$ = this._filtro.asObservable();
  private _fecha = new BehaviorSubject<string>('');
  public fecha$ = this._fecha.asObservable();

  setFiltro(filtro: { estado: string, cliente: string, proyecto: string ,formattedDate : string }) {
    this._filtro.next(filtro);
  }
  setFecha(fecha: string) {
    this._fecha.next(fecha);
  }
}



