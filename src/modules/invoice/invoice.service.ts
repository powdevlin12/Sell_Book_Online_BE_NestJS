import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/invoice.entity';
import { StatusInvoice } from 'src/entity/status_invoice.entity';
import {
  caculatorFeeParams,
  changeStatusInvoice,
  createInvoiceParams,
} from 'src/utils/params/invoice.params';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { ErrorException } from 'src/utils/Error';
import { ReceiptInfomationService } from '../receipt-infomation/receipt-infomation.service';
import { Status } from 'src/entity/status.entity';
import { PromotionService } from '../promotion/promotion.service';
import { Book } from 'src/entity/book.entity';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(StatusInvoice)
    private statusInvoiceRepository: Repository<StatusInvoice>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private readonly cartService: CartService,
    private readonly receiptInfomationService: ReceiptInfomationService,
    private readonly promotionService: PromotionService,
    private readonly staffService: StaffService,
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

  async getFeeShip(body: caculatorFeeParams) {
    const { distance, totalCostBook, weight } = body;
    const feeTotal = this.calculateFeeShip(
      Number.parseInt(distance),
      Number.parseInt(weight),
      Number.parseInt(totalCostBook),
    );
    return { feeTotal, feeShip: feeTotal - Number.parseInt(totalCostBook) };
  }

  async updateQuantityBook(quantity: number, idBook: string) {
    try {
      const book = await this.bookRepository.findOne({
        where: { book_id: idBook },
      });
      const updateBook = await this.bookRepository.update(
        {
          book_id: idBook,
        },
        {
          quantity_in_stock: book.quantity_in_stock - quantity,
          quantity_sold: book.quantity_sold + quantity,
        },
      );
      return updateBook;
    } catch (error) {
      console.log(error);
    }
  }

  async createInvoice(data: createInvoiceParams) {
    const { idCustomer, receipt_information_id, feeTotal, feeShip } = data;
    console.log(
      '🚀 ~ file: invoice.service.ts:21 ~ InvoiceService ~ createInvoice ~ data:',
      data,
    );

    try {
      const cart = await this.cartService.getCartNotCompleted(idCustomer);
      console.log(
        '🚀 ~ file: invoice.service.ts:102 ~ InvoiceService ~ createInvoice ~ cart:',
        cart,
      );
      const receiptInformation =
        await this.receiptInfomationService.getOneReceiptInfo(
          receipt_information_id,
        );
      // Tính tổng tiền cần trả
      // NOTE: fake data distance and weight and totalCostBook
      const fee = this.calculateFeeShip(18, 1.9, 700000);
      console.log(
        '🚀 ~ file: invoice.service.ts:73 ~ InvoiceService ~ createInvoice ~ fee:',
        fee,
      );

      const invoice = await this.invoiceRepository.save({
        total_cost: Math.ceil(Number.parseInt(feeTotal)),
        feeShip: Number.parseInt(feeShip),
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
      // trừ số lượng sách còn lại
      const { cartDetail } = cart;

      cartDetail.forEach((detail) => {
        this.updateQuantityBook(detail.quantity, detail.book.book_id);
      });

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
        'invoice.cart.cartDetail.book',
        'invoice.cart.cartDetail.rate',
        'staff',
        'status',
      ],
    });
    return statusInvoices;
  }

  async staffChangeStatus(data: changeStatusInvoice) {
    const { staffId, status_id, status_invoice_id } = data;

    try {
      const staff = await this.staffService.getMySelf(staffId);
      if (!staff) {
        throw new ErrorException(
          'Không tìm thấy nhân viên này',
          HttpStatus.NOT_FOUND,
        );
      }
      const status = await this.statusRepository.findOne({
        where: {
          status_id,
        },
      });

      if (!status) {
        throw new ErrorException(
          'Không có trạng thái này',
          HttpStatus.NOT_FOUND,
        );
      }

      const updateStatus = await this.statusInvoiceRepository.update(
        {
          status_invoice_id,
        },
        {
          status,
          staff,
        },
      );

      return updateStatus;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
