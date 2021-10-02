import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';

export interface GoalServiceInterface {
  fetch(id: number): GoalEntity;
  create(dto: CreateGoalDto): GoalEntity;
  update(goal: GoalEntity): boolean;
  delete(goal: GoalEntity): boolean;
  isGoalComplete(goal: GoalEntity): boolean;
  completeGoal(goal: GoalEntity): GoalEntity;
}
