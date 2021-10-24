import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { TaskEntity } from '../tasks/task.entity';

@Controller('search')
export class SearchController {
  constructor(private tasksService: TasksService) {}

  @Get('tasks')
  @UseInterceptors(ClassSerializerInterceptor)
  async getHouseholdTasks(@Req() req): Promise<TaskEntity[]> {
    return this.tasksService.fetchAllHouseholdTasks(req.user);
  }
}
