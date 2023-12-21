import { Injectable, OnDestroy } from '@angular/core';
import { DataServie } from './data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeedDataService } from './seed-data.service';
import { Weight } from '../models/weight';
import { GoalWeight } from '../models/goal';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private weightKey = 'dialog-data';
  private goalKey = `${this.weightKey}-goal`;

  constructor(
    private dataService: DataServie,
    private seedService: SeedDataService
  ) {
    this.dataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.saveWeights(data));

    this.dataService.goal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.saveGoal(data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load() {
    this.loadWeights();
    this.loadGoal();
  }

  saveWeights(data: Weight[]) {
    data.length > 0 &&
      localStorage.setItem(this.weightKey, JSON.stringify(data));
  }

  saveGoal(data: GoalWeight) {
    !!data.type && localStorage.setItem(this.goalKey, JSON.stringify(data));
  }

  private loadWeights() {
    const data = localStorage.getItem(this.weightKey);
    if (data) {
      const paresedData = JSON.parse(data) as Weight[];
      this.dataService.dataSource$.next(paresedData);
    } else {
      this.seedService.seedWeights();
    }
  }

  private loadGoal() {
    const data = localStorage.getItem(this.goalKey);
    if (data) {
      const paresedData = JSON.parse(data) as GoalWeight;
      this.dataService.goalSource$.next(paresedData);
    } else {
      this.seedService.seedGoal();
    }
  }
}
