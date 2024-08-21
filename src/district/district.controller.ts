import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { DistrictService } from './district.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({summary: 'Lấy quận'})
  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.districtService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
