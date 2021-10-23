import { CreateTaskDto } from './dtos/create.task.dto';
import { TaskEntity } from './task.entity';
import { UserEntity } from '../users/user.entity';

export interface TasksServiceInterface {
  create(dto: CreateTaskDto, goalId: number): Promise<TaskEntity>;
  save(task: TaskEntity): Promise<TaskEntity>;
  update(id: number, task: TaskEntity): Promise<TaskEntity>;
  delete(task: TaskEntity): Promise<boolean>;
  fetch(id: number): Promise<TaskEntity>;
  markAsComplete(task: TaskEntity): TaskEntity;
  isComplete(task: TaskEntity): boolean;
  requestApproval(task: TaskEntity): void;
  isApproved(task: TaskEntity): boolean;
  approve(task: TaskEntity, user: UserEntity): Promise<void>;
}
