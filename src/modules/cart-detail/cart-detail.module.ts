import { Module } from '@nestjs/common';
import { CartDetailController } from './cart-detail.controller';
import { CartDetailService } from './cart-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetail } from 'src/entity/cart_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartDetail])],
  controllers: [CartDetailController],
  providers: [CartDetailService],
  exports: [CartDetailService],
})
export class CartDetailModule {}
