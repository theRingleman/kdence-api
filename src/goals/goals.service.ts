import { HttpException, Injectable } from '@nestjs/common';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';
import { GoalServiceInterface } from './goal.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class GoalsService implements GoalServiceInterface {
  constructor(
    @InjectRepository(GoalEntity)
    private goalRepo: Repository<GoalEntity>,
  ) {}

  async save(goal: GoalEntity): Promise<GoalEntity> {
    return this.goalRepo.save(goal);
  }

  async fetch(id: number): Promise<GoalEntity> {
    return this.goalRepo.findOne(id);
  }

  async fetchAll(user: UserEntity): Promise<GoalEntity[]> {
    return this.goalRepo.find({ where: { userId: user.id } });
  }

  create(dto: CreateGoalDto): GoalEntity {
    return this.goalRepo.create(dto);
  }

  async delete(goal: GoalEntity): Promise<boolean> {
    const response = await this.goalRepo.delete(goal);
    return response.affected >= 1;
  }

  isGoalComplete(goal: GoalEntity): boolean {
    return goal.completionValue <= goal.earnedValue;
  }

  update(id: number, goal: Partial<CreateGoalDto>): Promise<GoalEntity> {
    return this.goalRepo.update(id, goal).then((res) => {
      if (res.affected > 0) {
        return this.fetch(id);
      }
      throw new HttpException('Unable to update task.', 500);
    });
  }

  completeGoal(goal: GoalEntity): GoalEntity {
    if (!goal.completionDate) {
      goal.completionDate = Date.now();
      goal.fulfilled = true;
    }
    return goal;
  }
}
