import { Component, inject } from '@angular/core';

import { AngularModule, MaterialModule } from './shared/modules';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/store/auth.reduce';
import { SidebarComponent } from "./loyouts/sidebar/sidebar.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from "./loyouts/header/header.component";
import { BuscadorComponent } from "./loyouts/buscador/buscador.component";
import { HomeComponent } from "./panel/home/home.component";
import { NavigationEnd, Router } from '@angular/router';

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
export class AppComponent {
  title = 'otros-costos';

  isLogin: boolean = true;

  private readonly _router: Router = inject(Router);

  ngOnInit() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLogin = event.url === '/login' || event.url === '/';
      }
    });
  }

}
