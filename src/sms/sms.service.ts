import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { HttpConfigService } from '../http/http.service';
import { CatchException } from '../util/exception';

@Injectable()
export class SmsService {
  // private twilioClient: Twilio;

  constructor(
    private readonly httpService: HttpConfigService
  ) {
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // this.twilioClient = new Twilio(accountSid, authToken);
  }

  // initiatePhoneNumberVerification(phoneNumber: string) {
  //   const serviceSid = process.env.TWILIO_VERIFICATION_SERVICE_SID;
  //   return this.twilioClient.messages.create({ to: phoneNumber, messagingServiceSid: serviceSid, body: 'hahaha' })
  // }

  async sendSMS(){
    try {
      return await this.httpService.post('http://apiv2.incomsms.vn/MtService/SendSms', {
        Username: "beta",
        Password: "AcCONBeTASenDMt20112213",
        PhoneNumber: "84767930964",
        PrefixId: "BETA",
        CommandCode: "BETA",
        RequestId: "0",
        MsgContent: "send sms 1",
        MsgContentTypeId: 0,
        FeeTypeId: 0
    }, {'Content-Type': 'application/json'})
    } catch (e) {
      throw new CatchException(e)
    }
  }
}
