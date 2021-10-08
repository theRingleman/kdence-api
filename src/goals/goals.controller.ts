import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';
import { GoalsService } from './goals.service';
import { Role, Roles } from '../roles/roles.decorator';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Roles(Role.Child)
  @Post()
  async create(
    @Request() req,
    @Body() body: CreateGoalDto,
  ): Promise<GoalEntity> {
    body.user = req.user;
    return this.goalsService.save(this.goalsService.create(body));
  }

  @Roles(Role.Parent, Role.Admin)
  @Get(':id')
  async read(@Param() params): Promise<GoalEntity> {
    return this.goalsService.fetch(params.id);
  }

  @Roles(Role.Parent, Role.Admin)
  @Get()
  async readAll(@Request() req): Promise<GoalEntity[]> {
    return this.goalsService.fetchAll(req.user);
  }

  @Roles(Role.Parent, Role.Admin)
  @Put(':id')
  async update(
    @Body() dto: Partial<CreateGoalDto>,
    @Param() params,
  ): Promise<GoalEntity> {
    return this.goalsService.update(params.id, dto);
  }

  @Roles(Role.Parent, Role.Admin)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param() params): Promise<void> {
    await this.goalsService.delete(params.id);
  }
}
