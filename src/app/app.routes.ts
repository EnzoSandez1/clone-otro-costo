import { Routes } from '@angular/router';
import { AuthGuard } from './auth/login/login.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', loadChildren: () => import('./auth/login/login.component.routing').then(r => r.loginRouting),
  },
  {
    // canActivate: [AuthGuard],
    path: 'home', loadChildren: () => import('./panel/home/home.component.routing').then(r => r.homeRouting)
  },
  {
    path: 'cargas', loadChildren: () => import('./panel/cargas/cargas.component.routing').then(r => r.cargasRouting),
  },
  {
    path: 'administracion', loadChildren: () => import('./panel/administracion/administracion.component.routing').then(r => r.administracionRouting),
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
