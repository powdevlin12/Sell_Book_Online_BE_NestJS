import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { BookModule } from '../book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/entity/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), BookModule],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
