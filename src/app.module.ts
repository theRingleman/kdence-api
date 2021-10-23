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
import { TaskApprovalEntity } from './tasks/taskApproval.entity';
import { RoleEntity } from './roles/role.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    HouseholdsModule,
    GoalsModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.CLEARDB_DATABASE_URL,
      entities: [
        UserEntity,
        HouseholdEntity,
        GoalEntity,
        TaskEntity,
        TaskApprovalEntity,
        RoleEntity,
      ],
      synchronize: true,
    }),
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
