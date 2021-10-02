import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from '../tasks/task.entity';

@Entity({ name: 'goals' })
export class GoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  item: string;

  @Column()
  completionDate?: number;

  @Column()
  fulfilled: boolean;

  @Column()
  completionValue: number;

  @Column()
  earnedValue: number;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.goal)
  tasks: TaskEntity[];
}
