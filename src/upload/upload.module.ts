import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { HttpConfigModule } from 'src/http/http.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [HttpConfigModule, NestjsFormDataModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
