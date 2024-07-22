import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatchException } from 'src/util/exception';
import {Repository} from 'typeorm'
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { DistrictEntity } from './entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private readonly districtRepo: Repository<DistrictEntity>
  ){}

  async findAll() {
    try {
      const district = await this.districtRepo.find({select: ['id', 'name']})
      return district
    } catch (e) {
      throw new CatchException(e)
    }  
  }
}
