import { Body, Controller, Get, HttpStatus, Post, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { BannerService } from './banner.service';

@UseInterceptors(AspectLogger)
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.bannerService.findAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }

  @Post('create')
  async create(@Body() b: any, @Res() res: Response) {
    const data = await this.bannerService.editBanner(b.banner);
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
