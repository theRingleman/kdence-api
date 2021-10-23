import { CreateGoalDto } from '../dtos/create.goal.dto';
import { UserEntity } from '../../users/user.entity';
import { GoalEntity } from '../goal.entity';

export const createGoalDto = (
  name: string,
  item: string,
  value: number,
): CreateGoalDto => {
  return {
    name,
    item,
    completionValue: value,
    completionDate: undefined,
    earnedValue: 0,
    userId: 1,
    fulfilled: false,
  };
};

export const createGoalEntity = (): GoalEntity => {
  return {
    ...createGoalDto('test', 'testing', 100000),
    id: 1,
    tasks: null,
    user: new UserEntity(),
  };
};
