import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
  ) { }

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.MAIL_CLIENT_ID,
      process.env.MAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.MAIL_REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        accessToken,
      },
    }
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendVerifyMail(mail: string, code: number) {
    await this.setTransport();
    await this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: mail, // list of receivers
        from: 'chauminh.12122000@gmail.com',
        subject: 'Verficiaction Code',
        template: 'action',
        context: {
          code,
        },
      })
  }

  public async sendBookingMailToHost(info: any) {
    await this.setTransport();
    await this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: 'caphe.1212200@gmail.com', // mail host
        from: 'chauminh.12122000@gmail.com',
        subject: 'Sirena Customer Booking',
        template: 'booking',
        context: {
          from: info.from,
          to: info.to,
          code: info.code,
          quantity: info.quantity,
          username: info.username,
          phone: info.phone,
          email: info.email,
        },
      })
  }


}
