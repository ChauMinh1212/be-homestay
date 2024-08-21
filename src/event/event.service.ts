import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import lodash from 'lodash';
import * as moment from 'moment';
import { CatchException, ExceptionResponse } from 'src/util/exception';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>
  ) { }
  async create(b: CreateEventDto) {
    try {
      const event = this.eventRepo.create(b)
      await this.eventRepo.save(event)

      return event
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async findAll() {
    try {
      const now = moment().format('YYYY-MM-DD');
      const events = await this.eventRepo.find({ where: { to: MoreThanOrEqual(now) }, order: { from: 'asc' } })
      return events.map(item => lodash.pick(item, ['id', 'img', 'from', 'to']))
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepo.findOne({ where: { id } })
      if (!event) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'event not found')

      return lodash.pick(event, ['id','title', 'content', 'img', 'from', 'to'])
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
