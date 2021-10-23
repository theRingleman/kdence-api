import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { Role } from './roles.decorator';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private repo: Repository<RoleEntity>,
  ) {}

  async addRoleToUser(role: Role, user: UserEntity): Promise<UserEntity> {
    if (!user.roles) user.roles = [];
    user.roles.push(await this.getRole(role));
    return user;
  }

  private async getRole(role: Role): Promise<RoleEntity> {
    let roleEntity: RoleEntity = await this.repo.findOne({ name: role });

    if (!roleEntity) {
      roleEntity = await this.repo.save(this.repo.create({ name: role }));
    }

    return roleEntity;
  }
}
