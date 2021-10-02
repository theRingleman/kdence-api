import { UserEntity } from '../../users/user.entity';

export class CreateGoalDto {
  constructor(
    public readonly name: string,
    public readonly user: UserEntity,
    public readonly item: string,
    public readonly completionValue: number,
  ) {}

  public readonly fulfilled = false;
  public readonly earnedValue = 0;
  public readonly completionDate = null;
}
