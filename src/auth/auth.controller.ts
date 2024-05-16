import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AspectLogger } from '../util/interceptor';
import { BaseResponse } from '../util/response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenGuard } from './guard/auth.guard';
import { LoginResponseSwagger } from './response/login.response';
import { RefreshTokenResponseSwagger } from './response/refresh-token.response';
import { RegisterResponseSwagger } from './response/register.response';

@ApiTags('Auth')
@UseInterceptors(AspectLogger)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Đăng kí tài khoản' })
  @ApiOkResponse({type: RegisterResponseSwagger, status: HttpStatus.OK})
  @Post('register')
  async register(@Body() b: RegisterDto, @Res() res: Response) {
    const data = await this.authService.register(b);
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Gửi lại mã xác nhận' })
  // @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  // @UseGuards(AccessTokenGuard)
  // @Post('resend-code')
  // async resendCode(@Req() req: Request, @Res() res: Response) {
  //   await this.authService.resendCode(req['user']['sub'])
  //   return res.status(HttpStatus.OK).send(new BaseResponse({}))
  // }

  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Xác nhận tài khoản' })
  // @ApiOkResponse({type: BaseResponse, status: HttpStatus.OK})
  // @UseGuards(AccessTokenGuard)
  // @Post('verify-code')
  // async verifyCode(@Req() req: Request, @Res() res: Response, @Body() b: VerifyAccountDto) {
  //   await this.authService.verifyCode(b.code, req['user']['sub'])
  //   return res.status(HttpStatus.OK).send(new BaseResponse({}))
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy token mới', description: 'Truyền lên refresh token' })
  @ApiOkResponse({ type: RefreshTokenResponseSwagger, status: HttpStatus.OK })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.refreshToken(req['user']['sub'], req['user']['refreshToken'])
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiOkResponse({type: LoginResponseSwagger, status: HttpStatus.OK})
  @Post('login')
  async login(@Body() b: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(b)
    return res.status(HttpStatus.OK).send(new BaseResponse({ data }))
  }

}
