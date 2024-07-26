import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { FormDataRequest } from 'nestjs-form-data';
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
  async getAll(@Req() req: Request, @Res() res: Response) {
    const data = await this.roomService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @Get('valid')
  async getAllValid(@Req() req: Request, @Query() q: any, @Res() res: Response) {
    const data = await this.roomService.getAllValid(q)
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
