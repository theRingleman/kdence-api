import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GoalEntity } from '../goals/goal.entity';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  completed: boolean;

  @ManyToOne(() => GoalEntity, (goal) => goal.tasks)
  goal: GoalEntity;
}
