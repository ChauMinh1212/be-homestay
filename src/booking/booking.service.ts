import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm'
import { from } from 'rxjs';
import { MailingService } from 'src/mailing/mailing.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { CatchException } from 'src/util/exception';
import { BookingHistoryResponse } from './response/booking.repsonse';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    private readonly mailingService: MailingService
  ) { }
  async create(body: CreateBookingDto, user_id: number) {
    const booking = this.bookingRepo.create({
      user: {id: user_id},
      room: {id: body.id},
      from: body.from,
      to: body.to,
    })
    await this.bookingRepo.save(booking)
    const [user, room] = await Promise.all([this.userRepo.findOne({where: {id: user_id}}), this.roomRepo.findOne({where: {id: body.id}})])
    
    await this.mailingService.sendBookingMailToHost({
      from: body.from,
      to: body.to,
      code: room.code,
      quantity: body.quantity,
      username: user.username,
      phone: user.phone,
      email: user.email
    }) 
    return
  }

  async history(user_id: number) {
    try {
      const data: any = await this.bookingRepo.find({where: {user: {id: user_id}}, relations: {room: true}, order: {created_at: 'desc'}})
      return BookingHistoryResponse.mapToList(data)
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
