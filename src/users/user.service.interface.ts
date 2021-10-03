import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { HouseholdEntity } from '../households/household.entity';

export interface UserServiceInterface {
  create(dto: CreateUserDto): UserEntity;
  fetch(id: number): Promise<UserEntity>;
  fetchAll(household: HouseholdEntity): Promise<UserEntity[]>;
  update(user: UserEntity): Promise<boolean>;
  delete(user: UserEntity): Promise<boolean>;
}
