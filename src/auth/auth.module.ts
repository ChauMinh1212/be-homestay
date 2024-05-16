import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { MailingService } from '../mailing/mailing.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, MailingService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
