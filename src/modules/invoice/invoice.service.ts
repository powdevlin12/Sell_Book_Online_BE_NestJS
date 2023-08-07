import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { StatusInvoice } from 'src/entity/status_invoice.entity';
import { createInvoiceParams } from 'src/utils/params/invoice.params';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ErrorException } from 'src/utils/Error';
import { ReceiptInfomationService } from '../receipt-infomation/receipt-infomation.service';
import { Status } from 'src/entity/status.entity';
import { PromotionService } from '../promotion/promotion.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(StatusInvoice)
    private statusInvoiceRepository: Repository<StatusInvoice>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private readonly cartService: CartService,
    private readonly receiptInfomationService: ReceiptInfomationService,
    private readonly promotionService: PromotionService,
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
      // Tính tổng tiền cần trả
      const fee = this.calculateFeeShip(18, 1.9, 700000);
      console.log(
        '🚀 ~ file: invoice.service.ts:73 ~ InvoiceService ~ createInvoice ~ fee:',
        fee,
      );
      // Tiền sau khi khuyến mãi
      const percent_promotion =
        await this.promotionService.getPromotionCustomer(idCustomer);
      console.log(
        '🚀 ~ file: invoice.service.ts:76 ~ InvoiceService ~ createInvoice ~ percent_promotion:',
        percent_promotion,
      );
      const feeFinal = (fee * (100 - percent_promotion)) / 100;
      const invoice = await this.invoiceRepository.save({
        total_cost: Math.ceil(feeFinal),
        receiptInformation: receiptInformation,
        cart: cart,
      });

      const status = await this.statusRepository.findOne({
        where: { status_name: 'Chờ duyệt' },
      });

      // thêm đơn hàng với trạng thái là chờ duyệt
      const statusInvoice = await this.statusInvoiceRepository.save({
        invoice,
        status,
      });
      // chuyển trạng thái là isCompleted của cart là true.
      const cartUpdate = await this.cartService.handleWhenOrder(idCustomer);
      console.log(
        '🚀 ~ file: invoice.service.ts:88 ~ InvoiceService ~ createInvoice ~ cartUpdate:',
        cartUpdate,
      );

      return statusInvoice;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getInvoiceStatusOfCustomer(idCustomer: string) {
    const statusInvoices = await this.statusInvoiceRepository.find({
      where: {
        invoice: {
          cart: {
            customer: {
              customer_id: idCustomer,
            },
          },
        },
      },
      relations: [
        'invoice.cart.cartDetail',
        'invoice.receiptInformation',
        'staff',
        'status',
      ],
    });
    return statusInvoices;
  }
}
