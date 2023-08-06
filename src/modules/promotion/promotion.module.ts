import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { Promotion } from 'src/entity/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Promotion]),
    StaffModule,
  ],
  controllers: [PromotionController],
  providers: [PromotionService, AtStrategy, RtStrategy],
})
export class PromotionModule {}
