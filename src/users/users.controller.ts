import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('households/:householdId/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Param('householdId') householdId: number,
  ): Promise<UserEntity> {
    return this.service.save(await this.service.create(dto, householdId));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async fetch(@Param() params): Promise<UserEntity> {
    return this.service.fetch(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async fetchAll(@Param() params): Promise<UserEntity[]> {
    return this.service.fetchAll(params.householdId);
  }
}
