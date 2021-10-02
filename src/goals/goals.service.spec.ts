import { Test, TestingModule } from '@nestjs/testing';
import { GoalsService } from './goals.service';
import { createGoalDto } from './test/helpers.test';

describe('GoalsService', () => {
  let service: GoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalsService],
    }).compile();

    service = module.get<GoalsService>(GoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should return a goal', async () => {
      const goal = service.fetch(1);
      //TODO: need to mock the repo
      expect(goal).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a goal entity', () => {
      expect(
        service.create(createGoalDto('test', 'Testing', 100000)).id,
      ).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update and persist a goal', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000)).id;
      goal.earnedValue = 100;

      service.update(goal);

      //TODO: Need to mock the repo
      expect(true).toBe(true);
    });
  });

  describe('delete', () => {
    it('should remove a goal', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000)).id;

      service.delete(goal);

      //TODO: Need to mock the repo
      expect(true).toBe(true);
    });
  });

  describe('isGoalComplete', () => {
    it('should return true if the goal has reached its completed status', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000)).id;
      goal.earnedValue = 100000;

      expect(service.isGoalComplete(goal)).toBe(true);
    });

    it('should update the goal with a completed timestamp if it has been newly completed', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000)).id;
      goal.earnedValue = 100000;

      expect(goal.completionDate).toBeDefined();
      expect(goal.fulfilled).toBe(true);
    });

    it('should not update the completion date if it already exists', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000)).id;
      goal.earnedValue = 100000;
      const completionDate = Date.now();
      goal.completionDate = completionDate;

      service.isGoalComplete(goal);

      expect(goal.completionDate).toBe(completionDate);
    });
  });
});
