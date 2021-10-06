import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.interface';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepo.create(dto);
    user.password = await this.securePassword(user.password);
    return user;
  }

  delete(user: UserEntity): Promise<boolean> {
    return this.userRepo.delete(user).then((res) => res.affected > 0);
  }

  fetch(id: number): Promise<UserEntity> {
    return this.userRepo.findOne(id);
  }

  fetchAll(householdId: number): Promise<UserEntity[]> {
    const builder = this.userRepo.createQueryBuilder();
    builder.where('householdId = :householdId', { householdId });
    return builder.getMany();
  }

  update(id: number, user: UserEntity): Promise<UserEntity> {
    return this.userRepo.update(id, user).then((res) => {
      if (res.affected > 0) return this.fetch(id);
    });
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  private securePassword(password: string) {
    return bcrypt.genSalt(10).then((salt) => {
      return bcrypt.hash(password, salt);
    });
  }
}
