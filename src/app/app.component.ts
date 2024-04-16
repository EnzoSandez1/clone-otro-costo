import { Component, OnInit } from '@angular/core';

import { AngularModule, MaterialModule } from './shared/modules';
import { StoreModule } from '@ngrx/store';
import { SidebarComponent } from "./loyouts/sidebar/sidebar.component";
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from "./loyouts/header/header.component";
import { BuscadorComponent } from "./loyouts/buscador/buscador.component";
import { HomeComponent } from "./panel/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AngularModule,
    MaterialModule,
    StoreModule,
    SidebarComponent,
    LoginComponent,
    HeaderComponent,
    BuscadorComponent,
    HomeComponent
  ]
})
export class AppComponent implements OnInit {

  title = 'otros-costos';

  isLogin = true;

  constructor() {}

  ngOnInit() {
    const ruta = window.location.pathname;
    console.log(ruta);
    if (ruta === '/login' || ruta === '/') {
      this.isLogin = true;
    } else{
      this.isLogin = false;
    }
  }


}
