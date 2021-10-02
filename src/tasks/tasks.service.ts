import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksServiceInterface } from './tasks.service.interface';
import { CreateTaskDto } from './dtos/create.task.dto';

@Injectable()
export class TasksService implements TasksServiceInterface {
  constructor(
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
  ) {}

  create(dto: CreateTaskDto): TaskEntity {
    return undefined;
  }

  delete(task: TaskEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  fetch(id: number): Promise<TaskEntity> {
    return Promise.resolve(undefined);
  }

  isApproved(task: TaskEntity): boolean {
    return false;
  }

  isComplete(task: TaskEntity): boolean {
    return false;
  }

  markAsComplete(task: TaskEntity): void {}

  requestApproval(task: TaskEntity): void {}

  save(task: TaskEntity): Promise<TaskEntity> {
    return Promise.resolve(undefined);
  }

  update(task: TaskEntity): Promise<boolean> {
    return Promise.resolve(false);
  }
}
