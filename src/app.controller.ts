import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Role, Roles } from './roles/roles.decorator';
import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/profile')
  async profile(@Request() req) {
    return req.user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/admin')
  async makeAdmin(@Request() req) {
    return this.usersService.save(
      await this.rolesService.addRoleToUser(Role.Admin, req.user),
    );
  }
}
