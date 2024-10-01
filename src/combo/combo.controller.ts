import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';

@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get()
  findAll() {
    return this.comboService.findAll();
  }
  
}
