import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { StatusInvoice } from 'src/entity/status_invoice.entity';
import { createInvoiceParams } from 'src/utils/params/invoice.params';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ErrorException } from 'src/utils/Error';
import { ReceiptInfomationService } from '../receipt-infomation/receipt-infomation.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(StatusInvoice)
    private statusInvoiceRepository: Repository<StatusInvoice>,
    private readonly cartService: CartService,
    private readonly receiptInfomationService: ReceiptInfomationService,
  ) {}

  calculateFeeShip(
    distance: number,
    weight: number,
    totalCostBook: number,
  ): number {
    // return -1 when distance > 35
    let totalCost = 0;
    if (distance <= 15) {
      if (totalCostBook < 300000) {
        totalCost = 20000;
      } else {
        totalCost = weight > 0.6 ? Math.ceil((weight - 0.6) / 0.5) * 3000 : 0;
      }
    } else if (distance > 15 && distance <= 25) {
      if (totalCostBook < 600000) {
        totalCost = 30000;
      } else {
        totalCost = weight > 1.1 ? Math.ceil((weight - 1.1) / 0.5) * 5000 : 0;
      }
    } else if (distance > 25 && distance <= 35) {
      if (totalCostBook < 1000000) {
        totalCost = 40000;
      } else {
        totalCost = weight > 1.6 ? Math.ceil((weight - 1.6) / 0.5) * 7000 : 0;
      }
    } else {
      return -1;
    }
    return totalCostBook + totalCost;
  }

  async createInvoice(data: createInvoiceParams) {
    const { cart_id, distance, idCustomer, receipt_information_id } = data;
    console.log(
      '🚀 ~ file: invoice.service.ts:21 ~ InvoiceService ~ createInvoice ~ data:',
      data,
    );

    try {
      const cart = await this.cartService.getCartNotCompleted(idCustomer);
      const receiptInformation =
        await this.receiptInfomationService.getOneReceiptInfo(
          receipt_information_id,
        );
      const fee = this.calculateFeeShip(18, 1.9, 700000);

      const invoice = await this.invoiceRepository.save({
        total_cost: fee,
        receiptInformation: receiptInformation,
        cart: cart,
        invoice_date: new Date(),
      });

      return invoice;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
