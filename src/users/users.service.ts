import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const resp = await this.usersRepository.save(user);
    delete user.password;
    return resp;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    if (users && users.length === 0) {
      throw new NotFoundException();
    }
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResponse = await this.usersRepository.update(id, updateUserDto);
    if (updateResponse.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }

  async remove(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (deleteResponse.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }
}
