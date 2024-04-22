import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { logout } from '../../auth/store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  usuario: any = localStorage.getItem('usuario')?.substring(0,2).toUpperCase();
  UsuarioCompleto :any = localStorage.getItem('usuario');




}
