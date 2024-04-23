import { Component } from '@angular/core';
import { AngularModule, MaterialModule } from '../../shared/modules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MaterialModule,
    AngularModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  rutas : Router = new Router();

  logout(){

    localStorage.clear();
    this.rutas.navigate(['/login']);
  }

}
