import { CreateGoalDto } from '../dtos/create.goal.dto';
import { UserEntity } from '../../users/user.entity';
import { GoalEntity } from '../goal.entity';

export const createGoalDto = (name: string, item: string, value: number) => {
  return new CreateGoalDto(name, new UserEntity(), item, value);
};

export const createGoalEntity = (): GoalEntity => {
  return {
    ...createGoalDto('test', 'testing', 100000),
    id: 1,
    tasks: null,
  };
};
