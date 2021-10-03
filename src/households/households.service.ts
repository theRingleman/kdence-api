import { Injectable } from '@nestjs/common';
import { HouseholdServiceInterface } from './household.service.interface';
import { CreateHouseholdDto } from './dtos/create.household.dto';
import { HouseholdEntity } from './household.entity';

@Injectable()
export class HouseholdsService implements HouseholdServiceInterface {
  create(dto: CreateHouseholdDto): HouseholdEntity {
    return undefined;
  }

  delete(household: HouseholdEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  fetch(id: number): Promise<HouseholdEntity> {
    return Promise.resolve(undefined);
  }

  fetchAll(): Promise<HouseholdEntity[]> {
    return Promise.resolve([]);
  }

  update(household: HouseholdEntity): Promise<boolean> {
    return Promise.resolve(false);
  }
}
