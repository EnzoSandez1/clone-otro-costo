import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConceptoComponent } from './concepto/concepto.component';
import { PeriodosComponent } from './periodos/periodos.component';




@Component({
    selector: 'app-administracion',
    standalone: true,
    templateUrl: './administracion.component.html',
    styleUrl: './administracion.component.scss',
    imports: [RouterOutlet, PeriodosComponent, ConceptoComponent, PeriodosComponent]
})
export class AdministracionComponent {

}
