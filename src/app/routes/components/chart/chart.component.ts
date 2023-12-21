import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { DataServie } from '../../services/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Weight } from '../../models/weight';
import { GoalEnum, GoalWeight } from '../../models/goal';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  weights: number[] = [];
  categories: string[] = [];
  highlightMax = 0;
  highlightMin = 0;

  constructor(public dataService: DataServie) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Weight[]) => {
        this.weights = [];
        this.categories = [];
        data.forEach((x) => {
          this.weights.push(x.weight);
          this.categories.push(x.date);
        });
      });

    this.dataService.goal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((goal: GoalWeight) => {
        if (goal.type == GoalEnum.GAIN) {
          this.highlightMax = goal.weight + 1;
          this.highlightMin = goal.weight;
        } else {
          this.highlightMax = goal.weight;
          this.highlightMin = goal.weight - 1;
        }
      });
  }
}
