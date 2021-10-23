export interface CreateGoalDto {
  name: string;
  userId: number;
  item: string;
  completionValue: number;
  fulfilled: boolean;
  earnedValue: number;
  completionDate?: number;
}
