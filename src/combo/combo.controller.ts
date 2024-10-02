import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @ApiOperation({ summary: 'Tạo combo' })
  @Post('create')
  async create(@Body() b: CreateComboDto, @Res() res: Response) {
    const data = await this.comboService.create(b);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @ApiOperation({ summary: 'Lấy tất cả combo' })
  @Get()
  findAll() {
    return this.comboService.findAll();
  }
}
