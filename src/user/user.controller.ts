import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';

@UseInterceptors(AspectLogger)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.userService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }

  @Post('update')
  @UseGuards(AccessTokenGuard)
  @Roles(1)
  async update(@Req() req: Request, @Body() b: any, @Res() res: Response) {
    const data = await this.userService.update(b)
    return res.status(HttpStatus.OK).send(new BaseResponse({data}));
  }
}
