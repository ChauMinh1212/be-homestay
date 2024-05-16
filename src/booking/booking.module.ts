import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoomEntity } from 'src/room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity, RoomEntity])],
  controllers: [BookingController],
  providers: [BookingService, MailingService],
})
export class BookingModule {}
