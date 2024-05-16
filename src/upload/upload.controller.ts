import { Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CatchException } from '../util/exception';
import { AspectLogger } from '../util/interceptor';
import { BaseResponse } from '../util/response';
import { UploadResponseSwagger } from './response/upload.response';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@UseInterceptors(AspectLogger)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({summary: 'Upload file'})
  @ApiOkResponse({type: UploadResponseSwagger, status: HttpStatus.OK})
  @UseInterceptors(AnyFilesInterceptor())
  async uploadReport(@UploadedFiles() file: any, @Res() res: Response){
    try {
      const data = await this.uploadService.upload(file, 'homestay')
      return res.status(HttpStatus.OK).send(new BaseResponse({data}))
    } catch (error) {
      throw new CatchException(error)
    }
  }
}
