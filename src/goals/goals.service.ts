import { HttpException, Injectable } from '@nestjs/common';
import { GoalEntity } from './goal.entity';
import { CreateGoalDto } from './dtos/create.goal.dto';
import { GoalServiceInterface } from './goal.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { HouseholdEntity } from '../households/household.entity';
import { TaskEntity } from '../tasks/task.entity';

@Injectable()
export class GoalsService implements GoalServiceInterface {
  constructor(
    @InjectRepository(GoalEntity)
    private goalRepo: Repository<GoalEntity>,
    private usersService: UsersService,
  ) {}

  async save(goal: GoalEntity): Promise<GoalEntity> {
    return this.goalRepo.save(goal);
  }

  async fetch(id: number): Promise<GoalEntity> {
    return this.goalRepo.findOne(id);
  }

  async create(dto: CreateGoalDto): Promise<GoalEntity> {
    const goal = this.goalRepo.create({
      ...dto,
      fulfilled: false,
      completionDate: undefined,
      earnedValue: 0,
    });

    goal.user = await this.usersService.fetch(dto.userId);

    return goal;
  }

  async delete(goal: GoalEntity): Promise<boolean> {
    const response = await this.goalRepo.delete(goal);
    return response.affected >= 1;
  }

  isGoalComplete(goal: GoalEntity): boolean {
    return goal.completionValue <= goal.earnedValue;
  }

  async update(id: number, goal: GoalEntity): Promise<GoalEntity> {
    const goalBack = this.fetch(id);
    return this.goalRepo.save({ ...goalBack, ...goal });
  }

  completeGoal(goal: GoalEntity): GoalEntity {
    if (!goal.completionDate) {
      goal.completionDate = Date.now();
      goal.fulfilled = true;
    }
    return goal;
  }

  async getActiveGoals(householdId: number): Promise<GoalEntity[]> {
    return this.goalRepo
      .createQueryBuilder('goal')
      .leftJoinAndMapOne(
        'goal.user',
        UserEntity,
        'user',
        'goal.userId = user.id',
      )
      .leftJoinAndMapOne(
        'user.household',
        HouseholdEntity,
        'household',
        'household.id = user.householdId',
      )
      .where('household.id = :householdId', { householdId })
      .andWhere('goal.completionDate is null')
      .getMany();
  }

  async getCompletedGoals(householdId: number): Promise<GoalEntity[]> {
    return this.goalRepo
      .createQueryBuilder('goal')
      .leftJoinAndMapOne(
        'goal.user',
        UserEntity,
        'user',
        'goal.userId = user.id',
      )
      .leftJoinAndMapOne(
        'user.household',
        HouseholdEntity,
        'household',
        'household.id = user.householdId',
      )
      .where('household.id = :householdId', { householdId })
      .andWhere('goal.completionDate is not null')
      .getMany();
  }
}
