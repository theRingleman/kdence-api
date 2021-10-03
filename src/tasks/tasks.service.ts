import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksServiceInterface } from './tasks.service.interface';
import { CreateTaskDto } from './dtos/create.task.dto';
import { TaskApprovalEntity } from './taskApproval.entity';

@Injectable()
export class TasksService implements TasksServiceInterface {
  constructor(
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
  ) {}

  async approve(task: TaskEntity): Promise<void> {
    task.approval = new TaskApprovalEntity();
  }

  create(dto: CreateTaskDto): TaskEntity {
    return this.taskRepo.create(dto);
  }

  async delete(task: TaskEntity): Promise<boolean> {
    const response = await this.taskRepo.delete(task);
    return response.affected >= 1;
  }

  fetch(id: number): Promise<TaskEntity> {
    return this.taskRepo.findOne(id);
  }

  isApproved(task: TaskEntity): boolean {
    return !!task.approval;
  }

  isComplete(task: TaskEntity): boolean {
    return !!task.completionDate;
  }

  markAsComplete(task: TaskEntity): TaskEntity {
    task.completionDate = Date.now();
    return task;
  }

  requestApproval(task: TaskEntity): void {}

  async save(task: TaskEntity): Promise<TaskEntity> {
    return this.taskRepo.save(task);
  }

  async update(task: TaskEntity): Promise<boolean> {
    const response = await this.taskRepo.update(task.id, task);
    return response.affected >= 1;
  }
}
