import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { CustomerModule } from '../customer/customer.module';
import { CartDetail } from 'src/entity/cart_detail.entity';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Cart, CartDetail]),
    CustomerModule,
    BookModule,
  ],
  controllers: [CartController],
  providers: [CartService, AtStrategy, RtStrategy],
})
export class CartModule {}
