import { CreateGoalDto } from '../dtos/create.goal.dto';
import { GoalEntity } from '../goal.entity';

export const createGoalDto = (name: string, item: string, value: number) => {
  const goal = new CreateGoalDto();
  goal.name = name;
  goal.item = item;
  goal.completionValue = value;
  return goal;
};

export const createGoalEntity = (): GoalEntity => {
  return {
    ...createGoalDto('test', 'testing', 100000),
    id: 1,
    tasks: null,
    user: null,
  };
};
