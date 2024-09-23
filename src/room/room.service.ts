import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { BookingEntity } from 'src/booking/entities/booking.entity';
import { UploadService } from 'src/upload/upload.service';
import { CatchException, ExceptionResponse } from 'src/util/exception';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { FindAllRoomResponse } from './response/findAll.response';
import { UtilCommonTemplate } from 'src/util/util.common';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    private readonly uploadService: UploadService,
  ) {}
  async findAll() {
    try {
      const data: any = await this.roomRepo.find({
        order: { id: 'asc' },
        relations: { district: true },
      });
      return FindAllRoomResponse.mapToList(data);
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async getAllValid(q: any) {
    try {
      const timeFrom = moment(q.timeFrom, 'H:mm')
        .subtract(1, 'hour')
        .format('H:mm');
      const timeTo = moment(q.timeTo, 'H:mm').add(1, 'hour').format('H:mm');

      const query = `
      with booked_room as (
      select room_id, count(room_id) as quantity from booking b
      where ('${q.from} ${timeFrom}' >= b.from and '${q.to} ${timeTo}' <= b.to)
      or ('${q.from} ${timeFrom}' < b.from and '${q.to} ${timeTo}' > b."from" and '${q.to} ${timeTo}' <= b."to")
      or ('${q.to} ${timeTo}' > b.to and '${q.from} ${timeFrom}' < b.to and '${q.from} ${timeFrom}' >= b."from")
      or ('${q.from} ${timeFrom}' < b.from and '${q.to} ${timeTo}' > b.to)
      group by room_id),
      booked_room_quantity as (
        select * from booked_room b inner join room r on b.room_id = r.id
      where b.quantity >= r.quantity
      )
      select r.*, d.id as district_id, d.name as district_name from room r left join district d on d.id = r.district_id
       where r.id not in (select room_id from booked_room_quantity) and capacity >= ${q.capacity} and district_id = ${q.district_id}
      `;

      const data = await this.roomRepo.query(query);
      return FindAllRoomResponse.mapToList(data);
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async getDateValid(room_id: number) {
    try {
      const now = moment().format('YYYY-MM-DD');
      console.log();
      

      const room = await this.roomRepo.findOne({ where: { id: room_id } });
      if (!room)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'room not found');

      const data = await this.bookingRepo.find({
        where: {
          room: { id: room_id },
          // from: MoreThanOrEqual(now),
        },
        order: {
          from: 'asc',
        },
      });
      console.log(data);
      
      let dataMapped = [];

      // data.map((dataItem) => {
      //   //Nếu from to cùng ngày
      //   const findDateFrom = dataMapped.find(
      //     (item) =>
      //       item.date ==
      //       UtilCommonTemplate.formatDate(dataItem.from, 'DD/MM/YYYY'),
      //   );

      //   const findDateTo = dataMapped.find(
      //     (item) =>
      //       item.date ==
      //       UtilCommonTemplate.formatDate(dataItem.to, 'DD/MM/YYYY'),
      //   );
      //   if (
      //     UtilCommonTemplate.formatDate(dataItem.from, 'DD/MM/YYYY') ==
      //     UtilCommonTemplate.formatDate(dataItem.to, 'DD/MM/YYYY')
      //   ) {
      //     if (!findDateFrom) {
      //       const newItem = {
      //         date: UtilCommonTemplate.formatDate(dataItem.from, 'DD/MM/YYYY'),
      //         booking: [
      //           {
      //             from: UtilCommonTemplate.formatDate(dataItem.from, 'H:mm'),
      //             to: UtilCommonTemplate.formatDate(dataItem.to, 'H:mm'),
      //           },
      //         ],
      //       };
      //       dataMapped.push(newItem);
      //     } else {
      //       findDateFrom.booking.push({
      //         from: UtilCommonTemplate.formatDate(dataItem.from, 'H:mm'),
      //         to: UtilCommonTemplate.formatDate(dataItem.to, 'H:mm'),
      //       });
      //     }
      //   } else {
      //     //Nếu khác ngày
      //     if (!findDateFrom) {
      //       const newItemFrom = {
      //         date: UtilCommonTemplate.formatDate(dataItem.from, 'DD/MM/YYYY'),
      //         booking: [
      //           {
      //             from: UtilCommonTemplate.formatDate(dataItem.from, 'H:mm'),
      //             to: '24:00',
      //           },
      //         ],
      //       };

      //       dataMapped.push(newItemFrom);
      //     } else {
      //       findDateFrom.booking.push({
      //         from: UtilCommonTemplate.formatDate(dataItem.from, 'H:mm'),
      //         to: '24:00',
      //       });
      //     }
      //     if (!findDateTo) {
      //       const newItemTo = {
      //         date: UtilCommonTemplate.formatDate(dataItem.to, 'DD/MM/YYYY'),
      //         booking: [
      //           {
      //             from: '0:00',
      //             to: UtilCommonTemplate.formatDate(dataItem.to, 'H:mm'),
      //           },
      //         ],
      //       };
      //       dataMapped.push(newItemTo);
      //     } else {
      //       findDateTo.booking.push({
      //         from: '0:00',
      //         to: UtilCommonTemplate.formatDate(dataItem.to, 'H:mm'),
      //       });
      //     }
      //   }
      // });

      data.map(item => {
        dataMapped = [...dataMapped, ...this.handleDate(item)]
      })
      return dataMapped;
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async create(b: CreateRoomDto) {
    try {
      const image = await this.uploadService.upload(b.img, 'homestay');
      const newRoom = this.roomRepo.create({
        ...b,
        img: JSON.stringify(image),
      } as any);
      const data: any = await this.roomRepo.save(newRoom);
      return new FindAllRoomResponse(data);
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async update(b: UpdateRoomDto) {
    try {
      const room = await this.roomRepo.findOne({ where: { id: b.id } });
      const { id, district_id, ...update } = b;

      await this.roomRepo.update(
        { id: b.id },
        {
          ...update,
          district: { id: district_id },
          img: b.img ? JSON.stringify(b.img) : room.img,
        },
      );

      return new FindAllRoomResponse({
        ...room,
        ...b,
        img: JSON.stringify(b.img),
      });
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async delete(id: number) {
    try {
      await this.roomRepo.delete({ id });
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async getDetail(id: number) {
    try {
      const room = await this.roomRepo.findOne({
        where: { id },
        relations: { district: true },
      });
      if (!room)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'room not found');

      return new FindAllRoomResponse(room);
    } catch (e) {
      throw new CatchException(e);
    }
  }

  hasThreeConsecutiveHoursFree(booking, num) {
    // Tạo một mảng 24 phần tử, khởi tạo tất cả các phần tử là false (chưa được đặt)
    let hours = Array(24).fill(false);

    // Đánh dấu các giờ đã được đặt trong mảng booking
    booking.forEach((b) => {
      let start = parseInt(b.from);
      let end = parseInt(b.to);
      for (let i = start; i < end; i++) {
        hours[i] = true;
      }
    });

    // Kiểm tra xem có 3 giờ trống liên tiếp không
    let consecutiveFreeHours = 0;
    for (let i = 0; i < 24; i++) {
      if (!hours[i]) {
        consecutiveFreeHours++;
        if (consecutiveFreeHours >= num) {
          return true;
        }
      } else {
        consecutiveFreeHours = 0;
      }
    }

    return false;
  }

  handleDate(data) {
    const diff = moment.utc(data.to).diff(data.from, 'day') + 1;
    if (diff == 0) {
      return [
        {
          date: UtilCommonTemplate.formatDate(data.from, 'DD/MM/YYYY'),
          booking: [
            {
              from: UtilCommonTemplate.formatDate(data.from, 'H:mm'),
              to: UtilCommonTemplate.formatDate(data.to, 'H:mm'),
            },
          ],
        },
      ];
    }
    const arr = [];
    for (let i = 0; i <= diff; i++) {
      if (i == 0) {
        arr.push({
          date: UtilCommonTemplate.formatDate(data.from, 'DD/MM/YYYY'),
          booking: [
            {
              from: UtilCommonTemplate.formatDate(data.from, 'H:mm'),
              to: '24:00',
            },
          ],
        });
      } else if (i == diff) {
        arr.push({
          date: UtilCommonTemplate.formatDate(data.to, 'DD/MM/YYYY'),
          booking: [
            {
              from: '0:00',
              to: UtilCommonTemplate.formatDate(data.to, 'H:mm'),
            },
          ],
        })
      } else {
        arr.push({
          date: moment.utc(data.to).add(i, 'day').format('DD/MM/YYYY'),
          booking: [
            {
              from: '0:00',
              to: '24:00',
            },
          ],
        })
      }
    }
    
    return arr
  }
}
