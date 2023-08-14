import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { BookModule } from '../book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/entity/rate.entity';
import { CartDetailModule } from '../cart-detail/cart-detail.module';
import { CartDetail } from 'src/entity/cart_detail.entity';
import { Book } from 'src/entity/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rate, CartDetail, Book]),
    BookModule,
    CartDetailModule,
  ],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
