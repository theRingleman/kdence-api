import { UserEntity } from '../../users/user.entity';

export class CreateHouseholdDto {
  constructor(public readonly name: string, public users: UserEntity[] = []) {}
}
