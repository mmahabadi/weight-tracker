import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from 'src/app/layout/services/alert.service';
import { AlertTypes } from 'src/app/layout/models/alert';
import { Weight } from '../models/weight';
import { GoalWeight } from '../models/goal';

@Injectable({
  providedIn: 'root',
})
export class DataServie implements OnDestroy {
  loadingSource$ = new BehaviorSubject(false);
  loading$ = this.loadingSource$.asObservable();
  dataSource$ = new BehaviorSubject<Weight[]>([]);
  data$ = this.dataSource$.asObservable();
  goalSource$ = new BehaviorSubject<GoalWeight>({} as GoalWeight);
  goal$ = this.goalSource$.asObservable();

  constructor(private alertService: AlertService) {}

  ngOnDestroy(): void {
    this.loadingSource$.complete();
    this.dataSource$.complete();
  }

  add(weight: Weight) {
    this.loadingSource$.next(true);
    const data = this.dataSource$.getValue();
    const index = data.findIndex((x) => x.date === weight.date);
    if (index === -1) {
      this.insert(weight);
    } else {
      this.update(weight, index);
    }
    this.showAlert();
    this.loadingSource$.next(false);
  }

  updateGoal(goal: GoalWeight) {
    this.goalSource$.next(goal);
    this.showAlert();
  }

  private insert(weight: Weight) {
    const data = this.dataSource$.getValue();
    data.push(weight);
    this.dataSource$.next(data);
  }

  private update(weight: Weight, index: number) {
    const data = this.dataSource$.getValue();
    data[index] = weight;
    this.dataSource$.next(data);
  }

  private showAlert() {
    this.alertService.show('Changes successfully saved.', AlertTypes.SUCCESS);
  }
}
