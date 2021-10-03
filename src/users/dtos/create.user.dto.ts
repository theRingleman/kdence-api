import { HouseholdEntity } from '../../households/household.entity';
import { Role } from '../../roles/role.entity';
import { GoalEntity } from '../../goals/goal.entity';

export class CreateUserDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly household: HouseholdEntity,
    public readonly roles: Role[],
  ) {}

  public readonly goals: GoalEntity[] = [];
}
