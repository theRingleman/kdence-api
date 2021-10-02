import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskApprovalEntity } from './taskApproval.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskApprovalEntity])],
  providers: [TasksService],
})
export class TasksModule {}
