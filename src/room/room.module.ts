import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { UploadService } from 'src/upload/upload.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, BookingEntity]), NestjsFormDataModule],
  controllers: [RoomController],
  providers: [RoomService, UploadService],
})
export class RoomModule {}
