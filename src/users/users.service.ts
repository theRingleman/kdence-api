import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HouseholdsService } from '../households/households.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private householdService: HouseholdsService,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto, householdId: number): Promise<UserEntity> {
    const user = this.userRepo.create(dto);
    user.password = await this.securePassword(user.password);
    user.household = await this.householdService.fetch(householdId);
    await this.rolesService.addRoleToUser(dto.roleType, user);
    return user;
  }

  delete(user: UserEntity): Promise<boolean> {
    return this.userRepo.delete(user).then((res) => res.affected > 0);
  }

  fetch(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  fetchAll(householdId: number): Promise<UserEntity[]> {
    const builder = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('householdId = :householdId', { householdId });
    return builder.getMany();
  }

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    const userOld = await this.fetch(id);
    return this.userRepo.save({ ...userOld, ...user });
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOneOrFail({ where: { email } });
  }

  private securePassword(password: string) {
    return bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(password, salt);
    });
  }
}
