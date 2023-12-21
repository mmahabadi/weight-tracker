import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServie } from '../../services/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoalEnum, GoalWeight } from '../../models/goal';

@Component({
  selector: 'app-goal-entry',
  templateUrl: './goal-entry.component.html',
})
export class GoalEntryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  submitted = false;
  form!: FormGroup;

  constructor(public dataService: DataServie) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      weight: new FormControl(70, Validators.compose([Validators.required])),
      type: new FormControl(
        GoalEnum.LOSE,
        Validators.compose([Validators.required])
      ),
    });

    this.dataService.goal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((goal: GoalWeight) => {
        this.form.patchValue(goal);
      });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.dataService.updateGoal(this.form.value as GoalWeight);
    }
  }
}
