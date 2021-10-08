import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskApprovalEntity } from './taskApproval.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskApprovalEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
