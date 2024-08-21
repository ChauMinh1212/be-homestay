import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { BookingService } from './booking.service';
import {
  CreateBookingAdminDto,
  CreateBookingDto,
} from './dto/create-booking.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@UseInterceptors(AspectLogger)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({summary: 'Khách tạo booking'})
  async create(
    @Req() req: Request,
    @Body() body: CreateBookingDto,
    @Res() res: Response,
  ) {
    const data = await this.bookingService.create(body, req['user']['sub']);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Post('admin-create')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({summary: 'Admin tạo booking'})
  @Roles(1)
  async createAdmin(
    @Req() req: Request,
    @Body() body: CreateBookingAdminDto,
    @Res() res: Response,
  ) {
    const { user_id, ...b } = body;
    const data = await this.bookingService.create(b, user_id);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @Get('history')
  @ApiOperation({summary: 'Lịch sử booking'})
  @UseGuards(AccessTokenGuard)
  async history(@Req() req: Request, @Res() res: Response) {
    const data = await this.bookingService.history(req['user']['sub']);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }
}
