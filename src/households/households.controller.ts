import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HouseholdEntity } from './household.entity';
import { HouseholdsService } from './households.service';
import { CreateHouseholdDto } from './dtos/create.household.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('households')
export class HouseholdsController {
  constructor(private service: HouseholdsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  fetchAll(): Promise<HouseholdEntity[]> {
    return this.service.fetchAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':householdId')
  fetch(@Param('householdId') id: number): Promise<HouseholdEntity> {
    return this.service.fetch(id);
  }

  @Post()
  create(@Body() dto: CreateHouseholdDto): Promise<HouseholdEntity> {
    return this.service.save(this.service.create(dto));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':householdId')
  @HttpCode(204)
  async delete(@Param('householdId') id: number): Promise<void> {
    await this.service.delete(await this.service.fetch(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':householdId')
  async update(
    @Param('householdId') id: number,
    @Body() dto: CreateHouseholdDto,
  ): Promise<HouseholdEntity> {
    return this.service.update(id, this.service.create(dto));
  }
}
