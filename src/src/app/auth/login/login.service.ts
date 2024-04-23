import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _http = inject(HttpClient);
  private usuario: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor() {}

    login(body: any): Observable<Usuario> {



      return this._http.post<Usuario>(`http://172.20.68.85:8082/api/login`, body)
        .pipe(tap((user: Usuario) => {
          this.usuario.next(user);
          return user;
        }),
          catchError((err) => {
            throw err;

          }));
    }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }

}

