import { HouseholdEntity } from './household.entity';
import { CreateHouseholdDto } from './dtos/create.household.dto';

export interface HouseholdServiceInterface {
  create(dto: CreateHouseholdDto): HouseholdEntity;
  fetch(id: number): Promise<HouseholdEntity>;
  update(household: HouseholdEntity): Promise<boolean>;
  delete(household: HouseholdEntity): Promise<boolean>;
  fetchAll(): Promise<HouseholdEntity[]>;
}
