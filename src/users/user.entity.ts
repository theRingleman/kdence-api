import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HouseholdEntity } from '../households/household.entity';
import { GoalEntity } from '../goals/goal.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => HouseholdEntity, (household) => household.users)
  household: HouseholdEntity;

  @OneToMany(() => GoalEntity, (goal) => goal.user)
  goals: GoalEntity[];
}
