import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getMySelf(id: string) {
    const user = await this.customerRepository
      .createQueryBuilder()
      .where('customer_id = :id', { id })
      .getOne();
    console.log(
      '🚀 ~ file: customer.service.ts:18 ~ CustomerService ~ getMySelf ~ user:',
      user,
    );

    return user;
  }
}
