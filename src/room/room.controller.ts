import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { CreateRoomDto } from './dto/create-room.dto';
import { DeleteRoomDto } from './dto/delete-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@UseInterceptors(AspectLogger)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  async getAll(@Res() res: Response) {
    const data = await this.roomService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @Get('valid')
  async getAllValid(@Query() q: any, @Res() res: Response) {
    const data = await this.roomService.getAllValid(q)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @Get('date-valid')
  async getDateValid(@Query() q: any, @Res() res: Response) {
    const data = await this.roomService.getDateValid(+q.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @Get(':id')
  async getDetailRoom(@Param() p: any, @Res() res: Response){
    const data = await this.roomService.getDetail(p.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @FormDataRequest()
  @UseGuards(AccessTokenGuard)
  @Roles(1)
  @Post('create')
  async create(@Body() b: CreateRoomDto, @Res() res: Response) {
    const data = await this.roomService.create(b)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  // @FormDataRequest()
  @UseGuards(AccessTokenGuard)
  @Roles(1)
  @Post('update')
  async update(@Body() b: UpdateRoomDto, @Res() res: Response) {
    const data = await this.roomService.update(b)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @UseGuards(AccessTokenGuard)
  @Roles(1)
  @Post('delete')
  async delete(@Body() b: DeleteRoomDto, @Res() res: Response) {
    await this.roomService.delete(b.id)
    return res.status(HttpStatus.OK).send(new BaseResponse({}))
  }
}
