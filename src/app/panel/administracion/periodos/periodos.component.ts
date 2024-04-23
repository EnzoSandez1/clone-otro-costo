import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-periodos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule],
  templateUrl: './periodos.component.html',
  styleUrl: './periodos.component.scss'
})
export class PeriodosComponent {

  mostrar:boolean = true;

  arrayFechas: string[] = [
    '2024/03',
    '2024/02',
    '2024/01',
    '2023/12',
    '2023/11',
    '2023/10',
    '2023/09',
    '2023/08',
    '2023/07',
    '2023/06',
    '2023/05',
    '2023/04',
    '2023/03',
    '2023/02'
  ];
}
