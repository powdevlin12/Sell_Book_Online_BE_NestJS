import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { StatusInvoice } from 'src/entity/status_invoice.entity';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { CartModule } from '../cart/cart.module';
import { ReceiptInfomationModule } from '../receipt-infomation/receipt-infomation.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Invoice, StatusInvoice]),
    CartModule,
    ReceiptInfomationModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, AtStrategy, RtStrategy],
})
export class InvoiceModule {}
