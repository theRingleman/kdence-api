import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
