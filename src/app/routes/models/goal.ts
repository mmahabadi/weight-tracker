export enum GoalEnum {
  GAIN = 'gain',
  LOSE = 'lose',
}
export interface GoalWeight {
  weight: number;
  type: GoalEnum;
}
