import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerType } from './customer_type.entity';
import { ReceiptInformation } from './receipt_information';
import { Cart } from './cart.entity';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  customer_id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  avatar: string;

  @Column({ type: 'nvarchar', length: 30 })
  first_name: string;

  @Column({ type: 'nvarchar', length: 30 })
  last_name: string;

  @Column({ type: 'tinyint', width: 2 })
  gender: boolean;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  role: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  hashedRt: string;

  @ManyToOne(() => CustomerType, (customerType) => customerType.customers, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'customer_type_id' })
  customerType: CustomerType;

  @OneToMany(
    () => ReceiptInformation,
    (receiptInformation) => receiptInformation.customer,
    {
      cascade: ['remove'],
    },
  )
  receiptInformations: ReceiptInformation[];

  @OneToMany(() => Cart, (cart) => cart.customer)
  carts: Cart[];
}
