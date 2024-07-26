import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CatchException } from 'src/util/exception';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
  ) {}
  create(createBannerDto: CreateBannerDto) {
    return 'This action adds a new banner';
  }

  async findAll() {
    try {
      const data = await this.redis.get('banner');
      return data;
    } catch (e) {
      throw new CatchException(e);
    }
  }

  async editBanner(arr: string[]) {
    try {
      await this.redis.set('banner', arr, {ttl: 0});
    } catch (e) {
      throw new CatchException(e);
    }
  }
}
