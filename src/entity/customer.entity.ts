import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { CustomerType } from './customer_type.entity';
import { ReceiptInformation } from './receipt_information';

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

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToMany(() => CustomerType, (customerType) => customerType.customers)
  customerType: CustomerType;

  @OneToMany(
    () => ReceiptInformation,
    (receiptInformation) => receiptInformation.customers,
  )
  receiptInformation: ReceiptInformation;
}
