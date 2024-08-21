import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from 'src/util/response';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/auth/guard/auth.guard';
import { Role, Roles } from 'src/auth/roles.decorator';
import { AspectLogger } from 'src/util/interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseInterceptors(AspectLogger)
@Controller('user')
@UseGuards(AccessTokenGuard)
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả user' })
  async findAll(@Res() res: Response) {
    const data = await this.userService.findAll()
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }

  @ApiOperation({ summary: 'Cập nhật user' })
  @Post('update')
  async update(@Req() req: Request, @Body() b: any, @Res() res: Response) {
    const data = await this.userService.update(b)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
  }
}
