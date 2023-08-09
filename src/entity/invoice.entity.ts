import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { Cart } from './cart.entity';
import { StatusInvoice } from './status_invoice.entity';
import { ReceiptInformation } from './receipt_information';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  invoice_id: string;

  @CreateDateColumn()
  invoice_date: Date;

  @Column({ type: 'int' })
  total_cost: number;

  @Column({ type: 'int', nullable: true })
  feeShip: number;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @OneToMany(() => StatusInvoice, (statusInvoice) => statusInvoice.invoice)
  statusInvoices: StatusInvoice[];

  @ManyToOne(
    () => ReceiptInformation,
    (receiptInformation) => receiptInformation.invoices,
    { cascade: ['remove'] },
  )
  @JoinColumn({ name: 'receipt_information_id' })
  receiptInformation: ReceiptInformation;
}
