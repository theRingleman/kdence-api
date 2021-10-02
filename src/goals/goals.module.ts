import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  providers: [GoalsService],
})
export class GoalsModule {}
