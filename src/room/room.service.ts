import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { CatchException } from 'src/util/exception';
import { Repository } from "typeorm";
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { FindAllRoomResponse } from './response/findAll.response';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    private readonly uploadService: UploadService
  ){}
  async findAll(){
    try {
      const data: any = await this.roomRepo.find({order: {id: 'asc'}});
      return FindAllRoomResponse.mapToList(data)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async getAllValid(q: any){
    try {
      const query = `
      with booked_room as (
      select room_id, count(room_id) as quantity from booking b
      where ('${q.from}' >= b.from and '${q.to}' <= b.to)
      or ('${q.from}' < b.from and '${q.to}' > b."from" and '${q.to}' <= b."to")
      or ('${q.to}' > b.to and '${q.from}' < b.to and '${q.from}' >= b."from")
      or ('${q.from}' < b.from and '${q.to}' > b.to)
      group by room_id),
      booked_room_quantity as (
        select * from booked_room b inner join room r on b.room_id = r.id
      where b.quantity >= r.quantity
      )
      select * from room where id not in (select room_id from booked_room_quantity) and capacity >= ${q.capacity}
      `
      
      const data = await this.roomRepo.query(query)
      return FindAllRoomResponse.mapToList(data)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async create(b: CreateRoomDto){
    try {
      const image = await this.uploadService.upload(b.img, 'homestay')
      const newRoom = this.roomRepo.create({
        ...b,
        img: JSON.stringify(image)
      } as any)
      const data: any = await this.roomRepo.save(newRoom)
      return new FindAllRoomResponse(data)
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async update(b: UpdateRoomDto) {
    try {
      const room = await this.roomRepo.findOne({where: {id: b.id}})
      const image = room.img != '' ? JSON.parse(room.img) : []

      if(image.length != 0) {
        await this.uploadService.delete(image, 'homestay')
      }
      
      const newImage = await this.uploadService.upload(b.img, 'homestay')
      const {id, ...update} = b
      
      await this.roomRepo.update({id: b.id}, {...update, img: JSON.stringify(newImage)})
      
      return new FindAllRoomResponse({
        ...room,
        ...b,
        img: JSON.stringify(newImage)
      })
    } catch (e) {
      throw new CatchException(e)
    }
  }

  async delete(id: number) {
    try {
      await this.roomRepo.delete({id})
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
