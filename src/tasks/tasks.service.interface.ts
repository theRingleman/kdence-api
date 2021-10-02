import { CreateTaskDto } from './dtos/create.task.dto';
import { TaskEntity } from './task.entity';

export interface TasksServiceInterface {
  create(dto: CreateTaskDto): TaskEntity;
  save(task: TaskEntity): Promise<TaskEntity>;
  update(task: TaskEntity): Promise<boolean>;
  delete(task: TaskEntity): Promise<boolean>;
  fetch(id: number): Promise<TaskEntity>;
  markAsComplete(task: TaskEntity): void;
  isComplete(task: TaskEntity): boolean;
  requestApproval(task: TaskEntity): void;
  isApproved(task: TaskEntity): boolean;
  approve(task: TaskEntity): Promise<void>;
}
