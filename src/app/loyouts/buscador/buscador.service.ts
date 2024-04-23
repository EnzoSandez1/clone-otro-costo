import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private dataParaEnviar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setData(data: any): void {
    this.dataParaEnviar.next(data);
  }

  getData(): Observable<any> {
    return this.dataParaEnviar.asObservable();
  }

}
