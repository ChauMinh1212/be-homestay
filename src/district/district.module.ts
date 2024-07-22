import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from './entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
