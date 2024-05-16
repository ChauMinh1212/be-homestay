import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { UtilCommonTemplate } from 'src/util/util.common';
import { CatchException } from '../util/exception';

@Injectable()
export class UploadService {
  constructor(
    private readonly minio: MinioService
  ) { }

  async upload(file: any[], bucket?: string) {
    try {
      const urlList = []
      await Promise.all(
        file.map(item => {
          const nameFile = UtilCommonTemplate.generateId()
          const url = `${item.mimetype.split('/')[0]}/${nameFile}.${item.mimetype.split('/')[1]}`
          urlList.push(`${bucket}/${url}`)
          return this.minio.client.putObject(bucket, url, item.buffer, {
            'Content-Type': item.mimetype,
            'X-Amz-Meta-Testing': 1234
          })
        })
      )
      return urlList
    } catch (e) {
      throw new CatchException(e)
    }
  }

  private getBucketFromUrl(path: string) {
    const parts = path.split('/').filter(Boolean);

    const bucket = parts[0];
    const url = parts.slice(1).join('/');
    
    return {bucket, url}
  }

  async delete(file: any[], bucket: string) {
    try {
      const url = file.map(item => this.getBucketFromUrl(item).url)
      return this.minio.client.removeObjects(bucket, url)
    } catch (e) {
      throw new CatchException(e)
    }
  }

}
