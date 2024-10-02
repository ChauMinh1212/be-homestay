import { Module } from '@nestjs/common';
import { ComboService } from './combo.service';
import { ComboController } from './combo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComboEntity } from './entities/combo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComboEntity])],
  controllers: [ComboController],
  providers: [ComboService],
})
export class ComboModule {}
