import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { Promotion } from 'src/entity/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { StaffModule } from '../staff/staff.module';
import { PromotionCustomer } from 'src/entity/promotion_customer.entity';
import { CustomerTypeModule } from '../customer-type/customer-type.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Promotion, PromotionCustomer]),
    StaffModule,
    CustomerTypeModule,
  ],
  controllers: [PromotionController],
  providers: [PromotionService, AtStrategy, RtStrategy],
})
export class PromotionModule {}
