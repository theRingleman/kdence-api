import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'households' })
export class HouseholdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
