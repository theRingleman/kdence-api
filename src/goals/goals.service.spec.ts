import { Test, TestingModule } from '@nestjs/testing';
import { GoalsService } from './goals.service';
import { createGoalDto, createGoalEntity } from './test/helpers.test';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GoalEntity } from './goal.entity';

describe('GoalsService', () => {
  let service: GoalsService;
  const goalRepo = {
    create: () => createGoalEntity(),
    save: () => null,
    findOne: () => createGoalEntity(),
    delete: () => true,
    update: () => null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsService,
        {
          provide: getRepositoryToken(GoalEntity),
          useValue: goalRepo,
        },
      ],
    }).compile();

    service = module.get<GoalsService>(GoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should return a goal', async () => {
      const goal = await service.fetch(1);
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
    it('should update and persist a goal', async () => {
      const goalSpy = jest
        .spyOn(goalRepo, 'update')
        .mockResolvedValueOnce({ affected: 1 });
      const goal = createGoalEntity();
      goal.earnedValue = 100;

      await service.update(1, goal);

      expect(goalSpy).toBeCalled();
    });

    it('should throw an error when an update fails', async () => {
      const goalSpy = jest
        .spyOn(goalRepo, 'update')
        .mockResolvedValueOnce({ affected: 0 });
      const goal = createGoalEntity();

      await service.update(1, goal).catch((err) => {
        expect(err.status).toBe(500);
      });

      expect(goalSpy).toBeCalled();
    });
  });

  describe('delete', () => {
    it('should remove a goal', async () => {
      const deleteSpy = jest.spyOn(goalRepo, 'delete').mockReturnValue(true);
      const goal = createGoalEntity();

      await service.delete(goal);

      expect(deleteSpy).toBeCalled();
    });
  });

  describe('isGoalComplete', () => {
    it('should return true if the goal has reached its completed status', () => {
      const goal = service.create(createGoalDto('test', 'Testing', 100000));
      goal.earnedValue = 100001;

      expect(service.isGoalComplete(goal)).toBe(true);
    });
  });

  describe('completeGoal', () => {
    it('should update the goal with a completed timestamp if it has been newly completed', () => {
      const goal = createGoalEntity();

      service.completeGoal(goal);

      expect(goal.completionDate).toBeDefined();
      expect(goal.fulfilled).toBe(true);
    });

    it('should not update the completion date if it already exists', () => {
      const goal = createGoalEntity();
      goal.earnedValue = 100000;
      const completionDate = Date.now() - 5;
      goal.completionDate = completionDate;

      service.completeGoal(goal);

      expect(goal.completionDate).toBe(completionDate);
    });
  });

  describe('save', () => {
    it('should persist a goal to the database', async () => {
      const saveSpy = jest
        .spyOn(goalRepo, 'save')
        .mockReturnValue(createGoalEntity());
      const goal = createGoalEntity();

      await service.save(goal);
      expect(saveSpy).toBeCalled();
    });
  });
});
