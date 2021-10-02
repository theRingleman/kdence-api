import { Injectable } from '@nestjs/common';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';
import { GoalServiceInterface } from './goal.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoalsService implements GoalServiceInterface {
  constructor(
    @InjectRepository(GoalEntity)
    private goalRepo: Repository<GoalEntity>,
  ) {}

  public fetch(id: number): GoalEntity {
    return new GoalEntity();
  }

  create(dto: CreateGoalDto): GoalEntity {
    return this.goalRepo.create(dto);
  }

  delete(goal: GoalEntity): boolean {
    return false;
  }

  isGoalComplete(goal: GoalEntity): boolean {
    return goal.completionValue <= goal.earnedValue;
  }

  update(goal: GoalEntity): boolean {
    return false;
  }

  completeGoal(goal: GoalEntity): GoalEntity {
    if (!goal.completionDate) {
      goal.completionDate = Date.now();
      goal.fulfilled = true;
    }
    return goal;
  }
}
