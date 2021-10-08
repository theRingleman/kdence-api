import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './goal.entity';
import { GoalsController } from './goals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  providers: [GoalsService],
  controllers: [GoalsController],
})
export class GoalsModule {}
