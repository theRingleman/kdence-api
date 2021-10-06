import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('households/:householdId/users')
export class UsersController {
  constructor(service: UsersService) {}
}
