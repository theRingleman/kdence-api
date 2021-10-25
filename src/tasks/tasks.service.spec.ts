import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { createDto, createTaskEntity } from './tests/helper.test';
import { TaskApprovalEntity } from './taskApproval.entity';
import { UserEntity } from '../users/user.entity';
import { GoalsService } from '../goals/goals.service';
import { GoalEntity } from '../goals/goal.entity';

describe('TasksService', () => {
  let service: TasksService;
  let task: TaskEntity;
  const taskRepo = {
    update: () => null,
    findOne: () => null,
    delete: () => null,
    save: () => null,
    create: () => createTaskEntity('testing'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(TaskEntity), useValue: taskRepo },
        { provide: GoalsService, useValue: { fetch: () => new GoalEntity() } },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    task = createTaskEntity('testing');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an entity based on a dto', async () => {
      const dto = createDto('testing');

      const entity = await service.create(dto, 1);

      expect(entity.description).toBe(dto.description);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateSpy = jest
        .spyOn(taskRepo, 'save')
        .mockResolvedValueOnce(task);
      task.description = 'testing again';

      await service.update(1, task);

      expect(updateSpy).toBeCalled();
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const deleteSpy = jest
        .spyOn(taskRepo, 'delete')
        .mockResolvedValueOnce({ affected: 1 });

      expect(await service.delete(task)).toBe(true);
      expect(deleteSpy).toBeCalled();
    });
  });

  describe('fetch', () => {
    it('should query for a task', async () => {
      const findOneSpy = jest
        .spyOn(taskRepo, 'findOne')
        .mockReturnValueOnce(task);

      await service.fetch(1);

      expect(findOneSpy).toBeCalled();
    });
  });

  describe('save', () => {
    it('should save a task', async () => {
      const saveSpy = jest.spyOn(taskRepo, 'save');

      await service.save(task);

      expect(saveSpy).toBeCalled();
    });
  });

  describe('isComplete', () => {
    it('should check on the completion status for a task', () => {
      expect(service.isComplete(task)).toBe(false);
    });

    it('should be true when a task is complete', () => {
      task.completionDate = Date.now();

      expect(service.isComplete(task)).toBe(true);
    });
  });

  describe('isApproved', () => {
    it('should be false when there is no approval', () => {
      expect(service.isApproved(task)).toBe(false);
    });

    it('should be true when there is an approval attached to the task', () => {
      task.approval = new TaskApprovalEntity();

      expect(service.isApproved(task)).toBe(true);
    });
  });

  describe('requestApproval', () => {
    it('should send a notification to a parent in order to sign off on the task', () => {});
  });

  describe('markAsComplete', () => {
    it('should update the completion timestamp', () => {
      expect(service.markAsComplete(task).completionDate).toBeDefined();
    });
  });

  describe('approve', () => {
    it('should create and attach a task approval', async () => {
      await service.approve(task, new UserEntity());

      expect(task.approval).toBeDefined();
    });
  });
});
