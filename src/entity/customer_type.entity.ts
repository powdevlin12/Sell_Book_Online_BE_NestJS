import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { PromotionCustomer } from './promotion_customer.entity';

@Entity({ name: 'customer_type' })
export class CustomerType {
  @PrimaryGeneratedColumn('uuid')
  customer_type_id: string;

  @Column({ type: 'nvarchar', length: 200 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.customerType)
  customers: Customer[];

  @OneToMany(
    () => PromotionCustomer,
    (promotion_customer) => promotion_customer.customerType,
  )
  promotion_customers: PromotionCustomer[];
}
