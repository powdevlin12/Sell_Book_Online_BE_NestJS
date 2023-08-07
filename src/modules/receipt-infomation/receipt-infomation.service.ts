import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceiptInformation } from 'src/entity/receipt_information';
import { Repository } from 'typeorm';
import { createReceiptInfoDTO } from './dto/create-receipt.dto';
import { ErrorException } from 'src/utils/Error';
import { CustomerService } from '../customer/customer.service';
import { CreateReceiptInfo } from 'src/utils/params/create-cart.param';

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
}
