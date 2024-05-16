import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { UploadService } from 'src/upload/upload.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), NestjsFormDataModule],
  controllers: [RoomController],
  providers: [RoomService, UploadService],
})
export class RoomModule {}
