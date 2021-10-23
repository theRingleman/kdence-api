import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { Public } from '../auth/public.decorator';

@Controller('households/:householdId/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Param('householdId') householdId: number,
  ): Promise<UserEntity> {
    return this.service.save(await this.service.create(dto, householdId));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async fetch(@Param() params): Promise<UserEntity> {
    return this.service.fetch(params.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async fetchAll(@Param() params): Promise<UserEntity[]> {
    return this.service.fetchAll(params.householdId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async update(@Param() params, @Body() user): Promise<UserEntity> {
    return this.service.update(params.id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params): Promise<void> {
    await this.service.delete(await this.service.fetch(params.id));
  }
}
