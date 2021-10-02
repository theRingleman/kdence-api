import { CreateGoalDto } from '../dtos/create.goal.dto';
import { UserEntity } from '../../users/user.entity';

export const createGoalDto = (name: string, item: string, value: number) => {
  return new CreateGoalDto(name, new UserEntity(), item, value);
};
