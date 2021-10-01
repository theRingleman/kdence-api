import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HouseholdsModule } from './households/households.module';
import { GoalsModule } from './goals/goals.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, HouseholdsModule, GoalsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
