import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';
import { Role, Roles } from '../roles/roles.decorator';

@Controller('goals/:goalId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async fetchTasks(@Param() params, @Request() req): Promise<TaskEntity[]> {
    return this.tasksService.fetchAll(params.goalId);
  }

  @Get(':id')
  async fetch(@Param() params, @Request() req): Promise<TaskEntity> {
    return this.tasksService.fetch(params.id);
  }

  @Post()
  @Roles(Role.Parent)
  async createTask(@Param() params, @Body() dto) {
    return this.tasksService.save(
      await this.tasksService.create(dto, params.goalId),
    );
  }

  @Patch('/:id')
  @Roles(Role.Parent)
  async updateTask(@Param() params, @Body() task) {
    return this.tasksService.update(params.id, task);
  }

  @Delete('/:id')
  @Roles(Role.Parent)
  async deleteTask(@Param() params) {
    return this.tasksService.delete(await this.tasksService.fetch(params.id));
  }

  @Get('/:id/approve')
  @Roles(Role.Parent)
  async approveTask(@Request() req, @Param() params): Promise<TaskEntity> {
    await this.tasksService.approve(
      await this.tasksService.fetch(params.id),
      req.user,
    );
    return this.tasksService.fetch(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params): Promise<void> {
    await this.tasksService.delete(await this.tasksService.fetch(params.id));
  }
}
