import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GoalEntity } from '../goals/goal.entity';
import { TaskApprovalEntity } from './taskApproval.entity';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  completionDate?: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.tasks)
  goal: GoalEntity;

  @OneToOne(() => TaskApprovalEntity, (taskApproval) => taskApproval.task)
  approval?: TaskApprovalEntity;
}
