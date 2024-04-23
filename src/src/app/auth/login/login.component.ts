import { Component, HostListener, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { AngularModule, MaterialModule } from '../../shared/modules';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
//import { Router } from 'express';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    AngularModule,
    MaterialModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent  {



  ingresarForm!: FormGroup;

  loaderBtn: boolean = false;
  mostrarPassword: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

   private _router = inject(Router);
  private readonly _loginService = inject(LoginService);


  constructor (private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.initIngresarForm();
    const ruta = window.location.pathname
    console.log(ruta);
  }

  initIngresarForm(): void {
    this.ingresarForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(20), this.letrasValidator()]),
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
          localStorage.setItem('usuario',user.usuario || '{}');
          this._router.navigate(['/home'])
          console.log(localStorage.getItem('token'));
      },
      error: (err: any) => {
        this._snackBar.open('credenciales incorrectas'
          , 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top'
      });
        this.loaderBtn = false;
        this.ingresarForm.invalid;
        this.ingresarForm.markAllAsTouched();


      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

   letrasValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const tieneCaracteresEspeciales = !/^[a-zA-Z]*$/.test(value);
      return tieneCaracteresEspeciales ? { 'caracteresEspeciales': true } : null;
    };

  }


}
