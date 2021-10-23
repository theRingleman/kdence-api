import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskApprovalEntity } from './taskApproval.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, TaskApprovalEntity]),
    GoalsModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
