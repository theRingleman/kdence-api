import { CreateUserDto } from '../dtos/create.user.dto';
import { HouseholdEntity } from '../../households/household.entity';
import { UserEntity } from '../user.entity';

export const createTestUserDto = () => {
  const dto = new CreateUserDto();
  dto.firstName = 'test';
  dto.lastName = 'test';
  dto.password = 'password';
  dto.email = 'email@email.com';
  dto.household = new HouseholdEntity();
  return dto;
};

export const createTestUserEntity = () => {
  const user = new UserEntity();
  user.firstName = 'test';
  user.lastName = 'test';
  user.password = 'password';
  user.email = 'email@email.com';
  user.household = new HouseholdEntity();
  user.id = 1;
  return user;
};
