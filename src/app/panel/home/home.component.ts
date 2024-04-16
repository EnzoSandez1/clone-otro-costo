import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SidebarComponent } from "../../loyouts/sidebar/sidebar.component";
import { HeaderComponent } from "../../loyouts/header/header.component";
import { AngularModule, MaterialModule } from '../../shared/modules';
import { BuscadorComponent } from "../../loyouts/buscador/buscador.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        AngularModule,
        MaterialModule,
        SidebarComponent, HeaderComponent,
        BuscadorComponent
    ]
})
export class HomeComponent implements OnInit {

  homeForm!: FormGroup<any>;

  private readonly _fb = inject(FormBuilder);
  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initHomeForm();
  }

  initHomeForm(): void {
    this.homeForm = this._fb.group({
      name: new FormControl(''),
    });
  }



}
