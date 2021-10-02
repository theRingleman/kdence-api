import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HouseholdsModule } from './households/households.module';
import { GoalsModule } from './goals/goals.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { HouseholdEntity } from './households/household.entity';
import { GoalEntity } from './goals/goal.entity';
import { TaskEntity } from './tasks/task.entity';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    HouseholdsModule,
    GoalsModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'kdence',
      entities: [UserEntity, HouseholdEntity, GoalEntity, TaskEntity],
      synchronize: true,
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
