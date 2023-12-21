import { Component, forwardRef } from '@angular/core';
import { AbstractControlValueAccessor } from '../../directives/abstract-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoalEnum } from 'src/app/routes/models/goal';

@Component({
  selector: 'app-goal-input',
  templateUrl: './goal-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GoalInputComponent),
      multi: true,
    },
  ],
  styles: [
    'img { cursor: pointer; }',
    '.selected{ border-color: #04d8b7; background-color: #04d8b7;}',
  ],
})
export class GoalInputComponent extends AbstractControlValueAccessor {
  goalEnum = GoalEnum;

  setValue(val: GoalEnum) {
    this.value = val;
  }
}
