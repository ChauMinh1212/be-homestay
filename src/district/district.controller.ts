import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.districtService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({data}))
  }
}
