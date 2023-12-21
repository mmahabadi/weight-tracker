import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { GoalInputComponent } from './components/goal-input/goal-input.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const ELEMENTS = [CardComponent, GoalInputComponent, LineChartComponent];

@NgModule({
  declarations: [...ELEMENTS],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgApexchartsModule],
  exports: [...ELEMENTS],
})
export class ShareModule {}
