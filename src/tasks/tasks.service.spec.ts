import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  const taskRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(TaskEntity), useValue: taskRepo },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an entity based on a dto', () => {});
  });

  describe('update', () => {
    it('should update a task', async () => {});
  });

  describe('delete', () => {
    it('should delete a task', async () => {});
  });

  describe('fetch', () => {
    it('should query for a task', async () => {});
  });

  describe('save', () => {
    it('should save a task', async () => {});
  });

  describe('isComplete', () => {
    it('should check on the completion status for a task', () => {});
  });

  describe('isApproved', () => {
    it('should check on the approval status of the task', () => {});
  });

  describe('requestApproval', () => {
    it('should send a notification to a parent in order to sign off on the task', () => {});
  });

  describe('markAsComplete', () => {
    it('should update the completion timestamp', () => {});
  });
});
