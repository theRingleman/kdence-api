import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { HouseholdEntity } from '../households/household.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { createTestUserDto, createTestUserEntity } from './test/helpers.test';
import { HouseholdsService } from '../households/households.service';
import { RolesService } from '../roles/roles.service';

describe('UsersService', () => {
  let service: UsersService;
  const repo = { create: () => createTestUserEntity() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useValue: repo },
        {
          provide: HouseholdsService,
          useValue: { fetch: () => new HouseholdEntity() },
        },
        { provide: RolesService, useValue: { addRoleToUser: () => undefined } },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should salt and hash a password', async () => {
      const entity = await service.create({ ...createTestUserDto() }, 1);

      expect(entity.password).toBeDefined();
      expect(entity.password).not.toEqual('password');
    });
  });
});
