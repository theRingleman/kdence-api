import { CreateTaskDto } from '../dtos/create.task.dto';
import { TaskEntity } from '../task.entity';
import { createGoalEntity } from '../../goals/test/helpers.test';

export const createDto = (description: string): CreateTaskDto => {
  return new CreateTaskDto(description);
};

export const createTaskEntity = (description: string): TaskEntity => {
  return { ...createDto(description), id: 1, goal: createGoalEntity() };
};
