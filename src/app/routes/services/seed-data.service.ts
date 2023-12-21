import { Injectable } from '@angular/core';
import { DataServie } from './data.service';
import { GoalEnum, GoalWeight } from '../models/goal';

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  data: any[] = [75, 75, 74.5, 74, 74, 73, 72.8];
  categories: string[] = [
    this.getDate(6),
    this.getDate(5),
    this.getDate(4),
    this.getDate(3),
    this.getDate(2),
    this.getDate(1),
    this.getDate(0),
  ];
  goal: GoalWeight = {
    weight: 74,
    type: GoalEnum.LOSE,
  };

  constructor(private dataService: DataServie) {}

  seedWeights() {
    this.data.forEach((weight, index) => {
      this.dataService.add({
        date: this.categories[index],
        weight: weight,
        notes: '',
      });
    });
  }

  seedGoal() {
    this.dataService.updateGoal(this.goal);
  }

  private getDate(day: number) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - day);

    // Format the date as "YYYY-MM-DD"
    let formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
  }
}
