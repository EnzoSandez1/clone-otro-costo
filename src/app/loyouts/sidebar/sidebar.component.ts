import { Component } from '@angular/core';
import { AngularModule, MaterialModule } from '../../shared/modules';

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

}
