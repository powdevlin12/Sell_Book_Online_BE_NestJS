import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceiptInformation } from 'src/entity/receipt_information';
import { Repository } from 'typeorm';
import { createReceiptInfoDTO } from './dto/create-receipt.dto';
import { ErrorException } from 'src/utils/Error';
import { CustomerService } from '../customer/customer.service';
import { CreateReceiptInfo } from 'src/utils/params/create-cart.param';
import { updateReceiptParams } from 'src/utils/params/receipt-info.params';

@Injectable()
export class ReceiptInfomationService {
  constructor(
    @InjectRepository(ReceiptInformation)
    private receiptInfoRepository: Repository<ReceiptInformation>,
    private readonly customerService: CustomerService,
  ) {}

  async createReceiptInfo(body: CreateReceiptInfo) {
    const {
      commune,
      customer_id,
      description_address,
      district,
      is_default,
      name_receipt,
      phone,
      province,
    } = body;

    try {
      const customer = await this.customerService.getMySelf(customer_id);

      const receiptNew = await this.receiptInfoRepository.save({
        description_address,
        district,
        is_default,
        name_receipt,
        phone,
        province,
        commune,
        customer,
      });

      return receiptNew;
    } catch (error) {
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getReceiptInfo(userId: string) {
    try {
      const receiptInfo = await this.receiptInfoRepository.find({
        where: {
          customer: {
            customer_id: userId,
          },
        },
      });
      return receiptInfo;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneReceiptInfo(id: string) {
    try {
      const receiptInfo = await this.receiptInfoRepository.findOne({
        where: {
          receipt_information_id: id,
        },
      });
      return receiptInfo;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async setDefault(data: updateReceiptParams) {
    const { idReceipt, customerId } = data;
    try {
      const receiptInfos = await this.receiptInfoRepository.update(
        {
          customer: {
            customer_id: customerId,
          },
        },
        { is_default: false },
      );
      console.log(
        '🚀 ~ file: receipt-infomation.service.ts:92 ~ ReceiptInfomationService ~ setDefault ~ receiptInfos:',
        receiptInfos,
      );

      const receiptUpdate = await this.receiptInfoRepository.update(
        {
          receipt_information_id: idReceipt,
        },
        {
          is_default: true,
        },
      );

      return receiptUpdate;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
