import { Injectable } from '@nestjs/common';
import { CreateCustomerTypeDTO } from './dto/create-customer-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerType } from 'src/entity/customer_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerTypeService {
  constructor(
    @InjectRepository(CustomerType)
    private customerTypeRepository: Repository<CustomerType>,
  ) {}
  async createCustomerType(body: CreateCustomerTypeDTO) {
    const customerType = await this.customerTypeRepository.save(body);
    return customerType;
  }

  async getCustomerType(id: string) {
    const customerType = await this.customerTypeRepository.findOne({
      where: { customer_type_id: id },
    });

    return customerType;
  }
}
