import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  async sendSMS(@Body() b: any){
    return await this.smsService.sendSMS()
  }
}
