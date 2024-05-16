import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class AspectLogger implements NestInterceptor {
  private readonly logger = new Logger('URL');
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, method } = req;
    const now = moment().format('DD-MM-YYYY HH:mm:ss')
    this.logger.log(`url: ${originalUrl}, method: ${method}, time: ${now}`);
    return next.handle();
  }
}
