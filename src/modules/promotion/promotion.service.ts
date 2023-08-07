import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/entity/promotion.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { StaffService } from '../staff/staff.service';
import { CreatePromotionCustomerDTO } from './dto/create-promotion-customer';
import { CustomerTypeService } from '../customer-type/customer-type.service';
import { PromotionCustomer } from 'src/entity/promotion_customer.entity';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionCustomer)
    private promotionCustomerRepository: Repository<PromotionCustomer>,
    private readonly staffService: StaffService,
    private readonly customerTypeService: CustomerTypeService,
    private readonly customerService: CustomerService,
  ) {}

  async getPromotion(id: string) {
    try {
      const promotion = await this.promotionRepository.findOne({
        where: { promotion_id: id },
      });
      return promotion;
    } catch (error) {
      console.log(error);
    }
  }

  async createPromotion(staff_id: string, body: CreatePromotionDTO) {
    try {
      const staff = await this.staffService.getMySelf(staff_id);
      const promotion = await this.promotionRepository.save({
        ...body,
        staff_id_create: staff,
      });
      return promotion;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPromotionCustomer() {
    const listPromotions = await this.promotionCustomerRepository.find({
      relations: ['customerType', 'promotion'],
      where: {
        promotion: {
          end_date: MoreThan(new Date()),
          start_date: LessThan(new Date()),
        },
      },
    });
    return listPromotions;
  }

  async getPromotionCustomer(idCustomer: string) {
    const customer = await this.customerService.getMySelf(idCustomer);

    const listPromotions = await this.promotionCustomerRepository.find({
      relations: ['customerType', 'promotion'],
      where: {
        promotion: {
          end_date: MoreThan(new Date()),
          start_date: LessThan(new Date()),
        },
        customerType: {
          customer_type_id: customer.customerType.customer_type_id,
        },
      },
    });

    const totalPercentPromotion = listPromotions.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.percent_discount,
      0,
    );

    return totalPercentPromotion;
  }

  async createPromotionCustomer(body: CreatePromotionCustomerDTO) {
    const { customer_type_id, percent_discount, promotion_id } = body;
    try {
      const customerType = await this.customerTypeService.getCustomerType(
        customer_type_id,
      );

      const promotion = await this.getPromotion(promotion_id);

      const promotionCustomer = await this.promotionCustomerRepository.save({
        percent_discount: Number.parseInt(percent_discount),
        customerType,
        promotion,
      });

      return promotionCustomer;
    } catch (error) {
      console.log(error);
    }
  }
}
