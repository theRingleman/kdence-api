import { HttpException, Injectable } from '@nestjs/common';
import { HouseholdServiceInterface } from './household.service.interface';
import { CreateHouseholdDto } from './dtos/create.household.dto';
import { HouseholdEntity } from './household.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HouseholdsService implements HouseholdServiceInterface {
  constructor(
    @InjectRepository(HouseholdEntity)
    private repo: Repository<HouseholdEntity>,
  ) {}

  create(dto: CreateHouseholdDto): HouseholdEntity {
    return this.repo.create(dto);
  }

  delete(household: HouseholdEntity): Promise<boolean> {
    return this.repo
      .delete(household)
      .then((response) => response.affected >= 1);
  }

  fetch(id: number): Promise<HouseholdEntity> {
    return this.repo.findOne(id);
  }

  fetchAll(): Promise<HouseholdEntity[]> {
    return this.repo.find();
  }

  update(id: number, household: HouseholdEntity): Promise<HouseholdEntity> {
    return this.repo.update(id, household).then((res) => {
      if (res.affected > 0) {
        return this.fetch(id);
      }
      throw new HttpException('Could not process update', 500);
    });
  }

  save(household: HouseholdEntity): Promise<HouseholdEntity> {
    return this.repo.save(household);
  }
}
