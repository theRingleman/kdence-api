import { UserEntity } from '../../users/user.entity';

export class CreateGoalDto {
  public name: string;
  public user?: UserEntity;
  public item: string;
  public completionValue: number;
  public fulfilled = false;
  public earnedValue = 0;
  public completionDate = null;
}
