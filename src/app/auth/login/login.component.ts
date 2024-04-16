import { Component, OnInit, inject } from '@angular/core';
import { AngularModule, MaterialModule } from '../../shared/modules';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { Router } from 'express';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { MensajeGlobal } from '../../helpers/mensaje-global';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    AngularModule,
    MaterialModule
  ],
})
export class LoginComponent  {

  ingresarForm!: FormGroup;

  loaderBtn: boolean = false;
  mostrarPassword: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

   private _router = inject(Router);
  private readonly _loginService = inject(LoginService);
  private readonly _m =inject(MensajeGlobal);

  constructor (
    ){

  }

  ngOnInit(): void {
    this.initIngresarForm();
    const ruta = window.location.pathname
    console.log(ruta);
  }

  initIngresarForm(): void {
    this.ingresarForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  noValidoForm(): void {
    // this._m.camposRequeridos();
  }

  validarForm(): void {
    const data = this.ingresarForm.value
    if (this.ingresarForm.valid) {
      this.requestBody();
    } else {

      // this._m.camposRequeridos();
    }
  }

  alternarVisibilidad(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  obtenerTipoInput(): any {
    return this.mostrarPassword ? 'text' : 'password';
  }

  requestBody(): void {

    const {userName , password}= this.ingresarForm.value;
    const data = {
      userName,password
    }
    this.login(data);

  };

  login(body: any) {

    this.loaderBtn = false;
    this._loginService.login(body).subscribe({
      next: (user: Usuario) => {
        console.log(user);
        this.loaderBtn = true;
          localStorage.setItem('token', user.token || '{}');
          this._router.navigate(['/home'])
          console.log(localStorage.getItem('token'));
      error: (err: any) => {
        console.log(err);
        this.loaderBtn = false;
        this._m.error(err);
        this.ingresarForm.reset();
        this.ingresarForm.invalid;
        this.ingresarForm.markAllAsTouched();


      }
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }




}
