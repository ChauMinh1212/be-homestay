import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { CatchException, ExceptionResponse } from 'src/util/exception';
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
      const data: any = await this.roomRepo.find({order: {id: 'asc'}, relations: {district: true}});
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
      where ('${q.from} ${q.timeFrom}' >= b.from and '${q.to} ${q.timeTo}' <= b.to)
      or ('${q.from} ${q.timeFrom}' < b.from and '${q.to} ${q.timeTo}' > b."from" and '${q.to} ${q.timeTo}' <= b."to")
      or ('${q.to} ${q.timeTo}' > b.to and '${q.from} ${q.timeFrom}' < b.to and '${q.from} ${q.timeFrom}' >= b."from")
      or ('${q.from} ${q.timeFrom}' < b.from and '${q.to} ${q.timeTo}' > b.to)
      group by room_id),
      booked_room_quantity as (
        select * from booked_room b inner join room r on b.room_id = r.id
      where b.quantity >= r.quantity
      )
      select r.*, d.id as district_id, d.name as district_name from room r left join district d on d.id = r.district_id
       where r.id not in (select room_id from booked_room_quantity) and capacity >= ${q.capacity} and district_id = ${q.district_id}
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
      const {id, district_id, ...update} = b
      
      await this.roomRepo.update({id: b.id}, {...update, district: {id: district_id}, img: b.img ? JSON.stringify(b.img) : room.img})
      
      return new FindAllRoomResponse({
        ...room,
        ...b,
        img: JSON.stringify(b.img)
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

  async getDetail(id: number){
    try {
      const room = await this.roomRepo.findOne({where: {id}, relations: {district: true}})
      if(!room) throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'room not found')

      return new FindAllRoomResponse(room)
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
