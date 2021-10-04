import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdsService } from './households.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HouseholdEntity } from './household.entity';

describe('HouseholdsService', () => {
  let service: HouseholdsService;
  const repo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(HouseholdEntity), useValue: repo },
        HouseholdsService,
      ],
    }).compile();

    service = module.get<HouseholdsService>(HouseholdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
