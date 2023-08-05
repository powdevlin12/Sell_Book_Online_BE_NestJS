import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Book } from './book.entity';
import { CartDetail } from './cart_detail.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @ManyToOne(() => Customer, (customer) => customer.carts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'tinyint', width: 2 })
  isCompleted: boolean;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetail: CartDetail[];
}
