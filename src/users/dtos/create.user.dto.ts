import { HouseholdEntity } from '../../households/household.entity';
import { Role } from '../../roles/roles.decorator';
import { GoalEntity } from '../../goals/goal.entity';

export class CreateUserDto {
  public goals: GoalEntity[] = [];
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public household: HouseholdEntity;
  public roleType: Role;
}
