import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseInterceptors(AspectLogger)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  @UseGuards(AccessTokenGuard)
  async create(@Req() req: Request, @Body() body: CreateBookingDto, @Res() res: Response) {
    const data = await this.bookingService.create(body, req['user']['sub']);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @Get('history')
  @UseGuards(AccessTokenGuard)
  async history(@Req() req: Request, @Res() res: Response) {
    const data = await this.bookingService.history(req['user']['sub']);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
