import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

describe('HouseholdsController', () => {
  let controller: HouseholdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: HouseholdsService, useValue: {} }],
      controllers: [HouseholdsController],
    }).compile();

    controller = module.get<HouseholdsController>(HouseholdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
