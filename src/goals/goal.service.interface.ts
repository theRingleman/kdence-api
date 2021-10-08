import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';

export interface GoalServiceInterface {
  fetch(id: number): Promise<GoalEntity>;
  create(dto: CreateGoalDto): GoalEntity;
  update(id: number, goal: Partial<CreateGoalDto>): Promise<GoalEntity>;
  delete(goal: GoalEntity): Promise<boolean>;
  save(goal: GoalEntity): Promise<GoalEntity>;
  isGoalComplete(goal: GoalEntity): boolean;
  completeGoal(goal: GoalEntity): GoalEntity;
}
