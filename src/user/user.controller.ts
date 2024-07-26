import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.userService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
