import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { HttpConfigModule } from 'src/http/http.module';

@Module({
  imports: [HttpConfigModule],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
