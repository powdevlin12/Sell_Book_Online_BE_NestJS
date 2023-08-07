import { Module } from '@nestjs/common';
import { ReceiptInfomationController } from './receipt-infomation.controller';
import { ReceiptInfomationService } from './receipt-infomation.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptInformation } from 'src/entity/receipt_information';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([ReceiptInformation]),
    CustomerModule,
  ],
  controllers: [ReceiptInfomationController],
  providers: [ReceiptInfomationService],
  exports: [ReceiptInfomationService],
})
export class ReceiptInfomationModule {}
