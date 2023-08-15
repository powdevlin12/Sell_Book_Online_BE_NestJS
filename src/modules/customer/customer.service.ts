import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';
import { ChangeCustomerTypeDTO } from './dto/changeCustomerType.dto';
import { CustomerType } from 'src/entity/customer_type.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerType)
    private customerTypeRepository: Repository<CustomerType>,
  ) {}

  async getMySelf(id: string) {
    const user = await this.customerRepository.findOne({
      where: { customer_id: id },
      relations: ['customerType'],
    });
    // .createQueryBuilder()
    // .where('customer_id = :id', { id })
    // .getOne();
    console.log(
      '🚀 ~ file: customer.service.ts:18 ~ CustomerService ~ getMySelf ~ user:',
      user,
    );

    return user;
  }

  async getAllCustomer() {
    return this.customerRepository.find({
      relations: {
        customerType: true,
      },
    });
  }

  async changeCustomerType(body: ChangeCustomerTypeDTO) {
    const { customer_id, customer_type_id } = body;

    try {
      const customer = await this.customerRepository.findOne({
        where: {
          customer_id,
        },
      });

      const customerType = await this.customerTypeRepository.findOne({
        where: {
          customer_type_id,
        },
      });

      const newCustomer = await this.customerRepository.save({
        ...customer,
        customerType,
      });

      return newCustomer;
    } catch (error) {}
  }
}
