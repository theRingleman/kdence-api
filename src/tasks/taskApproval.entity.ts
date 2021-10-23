import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from './task.entity';

@Entity({ name: 'taskApprovals' })
export class TaskApprovalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  approved: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
