import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './goal.entity';
import { GoalsController } from './goals.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity]), UsersModule],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService],
})
export class GoalsModule {}
