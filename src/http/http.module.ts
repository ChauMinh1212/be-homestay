import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpConfigService } from './http.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000
  })],
  providers: [HttpConfigService],
  exports: [HttpConfigModule, HttpConfigService]
})
export class HttpConfigModule { }
