import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { HouseholdEntity } from '../households/household.entity';

export interface UserServiceInterface {
  create(dto: CreateUserDto): Promise<UserEntity>;
  fetch(id: number): Promise<UserEntity>;
  fetchAll(householdId: number): Promise<UserEntity[]>;
  update(id: number, user: UserEntity): Promise<UserEntity>;
  delete(user: UserEntity): Promise<boolean>;
  save(user: UserEntity): Promise<UserEntity>;
}
