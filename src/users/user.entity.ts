import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HouseholdEntity } from '../households/household.entity';
import { GoalEntity } from '../goals/goal.entity';
import { RoleEntity } from '../roles/role.entity';
import { Exclude } from 'class-transformer';

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
  @Exclude()
  password: string;

  @ManyToOne(() => HouseholdEntity, (household) => household.users)
  household: HouseholdEntity;

  @OneToMany(() => GoalEntity, (goal) => goal.user)
  goals: GoalEntity[];

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}
