import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { TasksService } from '../tasks/tasks.service';

describe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [{ provide: TasksService, useValue: {} }],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
