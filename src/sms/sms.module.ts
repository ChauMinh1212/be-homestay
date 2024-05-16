import { Module } from '@nestjs/common';
import { HttpConfigModule } from '../http/http.module';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  imports: [HttpConfigModule],
  controllers: [SmsController],
  providers: [SmsService]
})
export class SmsModule {}
