import { Component, OnInit } from '@angular/core';
import { DataServie } from '../../services/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoalEnum } from '../../models/goal';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent implements OnInit {
  private destroy$ = new Subject();
  isOnTrack = false;

  constructor(private dataService: DataServie) {}

  ngOnInit(): void {
    this.dataService.data$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.isTrendTowardsGoal();
    });

    this.dataService.goal$.pipe(takeUntil(this.destroy$)).subscribe((goal) => {
      this.isTrendTowardsGoal();
    });
  }

  isTrendTowardsGoal(): void {
    const goal = this.dataService.goalSource$.getValue();
    const data = this.dataService.dataSource$.getValue();
    const firstWeight = data[0].weight;
    const lastWeight = data[data.length - 1].weight;

    if (goal.type === GoalEnum.GAIN) {
      this.isOnTrack =
        Math.abs(lastWeight - goal.weight) <
        Math.abs(firstWeight - goal.weight);
      console.log(this.isOnTrack);
    } else {
      this.isOnTrack =
        Math.abs(lastWeight - goal.weight) >
        Math.abs(firstWeight - goal.weight);
    }
  }
}
