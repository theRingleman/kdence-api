import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './dtos/user.service.interface';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { HouseholdEntity } from '../households/household.entity';

@Injectable()
export class UsersService implements UserServiceInterface {
  create(dto: CreateUserDto): UserEntity {
    return undefined;
  }

  delete(user: UserEntity): Promise<boolean> {
    return Promise.resolve(false);
  }

  fetch(id: number): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  fetchAll(household: HouseholdEntity): Promise<UserEntity[]> {
    return Promise.resolve([]);
  }

  update(user: UserEntity): Promise<boolean> {
    return Promise.resolve(false);
  }
}
