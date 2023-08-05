import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'receipt_information' })
export class ReceiptInformation {
  @PrimaryGeneratedColumn('uuid')
  receipt_information_id: string;

  @Column({ type: 'nvarchar', length: 30 })
  province: string;

  @Column({ type: 'nvarchar', length: 30 })
  district: string;

  @Column({ type: 'nvarchar', length: 30 })
  commune: string;

  @Column({ type: 'nvarchar', length: 200 })
  description_address: string;

  @Column({ type: 'nvarchar', length: 10 })
  phone: string;

  @Column({ type: 'nvarchar', length: 50 })
  name_receipt: string;

  @Column({ type: 'tinyint', width: 2 })
  is_default: boolean;

  @ManyToOne(() => Customer, (customer) => customer.receiptInformations)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
