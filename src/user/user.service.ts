import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatchException, ExceptionResponse } from 'src/util/exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as lodash from 'lodash'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      const user = await this.userRepo.find({ order: { created_at: 'asc' } });
      return user.map(item => lodash.omit(item, ['password']));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async update(b: any) {
    try {
      const { id, ...body } = b
      const user = await this.userRepo.findOne({ where: { id } })
      if (!user) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'user not found')

      await this.userRepo.update({ id }, body)
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
