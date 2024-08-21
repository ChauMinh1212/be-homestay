import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Role, Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { BaseResponse } from 'src/util/response';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

@UseInterceptors(AspectLogger)
@ApiTags('Banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @ApiOperation({ summary: 'Lấy banner' })
  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.bannerService.findAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @UseGuards(AccessTokenGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Thêm banner' })
  @Post('create')
  async create(@Body() b: CreateBannerDto, @Res() res: Response) {
    const data = await this.bannerService.editBanner(b.banner);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }
}
