import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { CustomerType } from './customer_type.entity';

@Entity({ name: 'staff' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customer_id: string;

  @Column({ type: 'nvarchar', length: 30 })
  first_name: string;

  @Column({ type: 'nvarchar', length: 30 })
  last_name: string;

  @Column({ type: 'bool' })
  gender: boolean;

  @Column({ type: 'nvarchar', length: 250 })
  address: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @Column({ type: 'nvarchar', length: 100 })
  email: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @ManyToOne(() => CustomerType, (customer_type) => customer_type.customers)
  customer_type: CustomerType;
}
