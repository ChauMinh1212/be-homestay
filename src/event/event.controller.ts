import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Role, Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@ApiTags('Event')
@UseInterceptors(AspectLogger)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({summary: 'Tạo chương trình'})
  @UseGuards(AccessTokenGuard)
  @Roles(Role.Admin)
  @Post('create')
  async create(@Body() createEventDto: CreateEventDto, @Res() res: Response) {
    const data = await this.eventService.create(createEventDto);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @ApiOperation({summary: 'Lấy chương trình'})
  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.eventService.findAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @ApiOperation({summary: 'Lấy chi tiết chương trình'})
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.eventService.findOne(+id);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
