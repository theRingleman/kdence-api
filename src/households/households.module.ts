import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdEntity } from './household.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HouseholdEntity])],
  providers: [HouseholdsService],
  controllers: [HouseholdsController],
})
export class HouseholdsModule {}
