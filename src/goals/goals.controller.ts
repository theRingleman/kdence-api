import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { GoalEntity } from './goal.entity';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dtos/create.goal.dto';

@Controller('households/:householdId/goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async fetchAll(
    @Param() params,
    @Query('type') type: string,
  ): Promise<GoalEntity[]> {
    if (type === 'completed') {
      return this.goalsService.getCompletedGoals(params.householdId);
    }
    return this.goalsService.getActiveGoals(params.householdId);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() body: CreateGoalDto): Promise<GoalEntity> {
    return this.goalsService.save(await this.goalsService.create(body));
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param() params, @Body() goal): Promise<GoalEntity> {
    return this.goalsService.update(params.id, goal);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  async delete(@Param() params): Promise<void> {
    await this.goalsService.delete(await this.goalsService.fetch(params.id));
  }
}
