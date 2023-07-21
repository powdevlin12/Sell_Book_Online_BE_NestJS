import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @ManyToOne(() => Customer, (customer) => customer.carts)
  customer: Customer;
}
