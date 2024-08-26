import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as lodash from 'lodash';
import * as moment from 'moment';
import { CatchException, ExceptionResponse } from 'src/util/exception';
import { MoreThanOrEqual, LessThan, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { UtilCommonTemplate } from 'src/util/util.common';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}
  async create(b: CreateEventDto) {
    try {
      const event = this.eventRepo.create(b);
      await this.eventRepo.save(event);

      return event;
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async update(b: UpdateEventDto) {
    try {
      const { id, ...body } = b;
      const event = await this.eventRepo.findOne({ where: { id } });
      if (!event)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'event not found');
      await this.eventRepo.update({ id }, { ...body });
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async delete(id: number) {
    try {
      const event = await this.eventRepo.findOne({ where: { id } });
      if (!event)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'event not found');
      await this.eventRepo.delete({ id });
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async findAll(q: QueryEventDto) {
    try {
      const now = moment().format('YYYY-MM-DD');
      const events = await this.eventRepo.find({
        ...(q.status && q.status != -1 && {
          where: { to: q.status == 1 ? MoreThanOrEqual(now) : LessThan(now) },
        }),
        order: { created_at: 'asc' },
      });
      return events.map((item) => ({
        ...lodash.pick(item, ['title', 'content', 'id', 'img', 'from', 'to']),
        status: moment.utc(item.to).diff(moment(), 'day'),
        from: UtilCommonTemplate.formatDate(item.from, 'DD/MM/YYYY'),
        to: UtilCommonTemplate.formatDate(item.to, 'DD/MM/YYYY'),
      }));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepo.findOne({ where: { id } });
      if (!event)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'event not found');

      return lodash.pick(event, [
        'id',
        'title',
        'content',
        'img',
        'from',
        'to',
      ]);
    } catch (e) {
      throw new CatchException(e);
    }
  }
}
