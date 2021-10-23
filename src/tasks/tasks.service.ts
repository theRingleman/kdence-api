import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksServiceInterface } from './tasks.service.interface';
import { CreateTaskDto } from './dtos/create.task.dto';
import { TaskApprovalEntity } from './taskApproval.entity';
import { GoalsService } from '../goals/goals.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class TasksService implements TasksServiceInterface {
  constructor(
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
    private goalsService: GoalsService,
  ) {}

  async approve(task: TaskEntity, user: UserEntity): Promise<void> {
    const approval = new TaskApprovalEntity();
    approval.approved = Date.now();
    approval.user = user;
    task.approval = approval;
    task.goal.earnedValue = task.goal.earnedValue + task.value;
    await this.save(task);
  }

  async create(dto: CreateTaskDto, goalId: number): Promise<TaskEntity> {
    const goal = await this.goalsService.fetch(goalId);
    const task = this.taskRepo.create(dto);
    task.goal = goal;
    return task;
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

  async update(id: number, task: TaskEntity): Promise<TaskEntity> {
    const taskBack = this.fetch(id);
    return this.taskRepo.save({ ...taskBack, ...task });
  }

  async fetchAll(goalId: number): Promise<TaskEntity[]> {
    return this.taskRepo.find({ where: { goal: { id: goalId } } });
  }
}
