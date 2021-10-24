import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ nullable: true, type: 'bigint' })
  completionDate: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.tasks, {
    eager: true,
    cascade: true,
  })
  goal: GoalEntity;

  @OneToOne(() => TaskApprovalEntity, { eager: true, cascade: true })
  @JoinColumn()
  approval?: TaskApprovalEntity;
}
