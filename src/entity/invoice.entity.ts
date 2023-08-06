import {
  Column,
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

  @Column({ type: 'date', nullable: true })
  invoice_date: Date;

  @ManyToOne(() => Staff, (staff) => staff.invoices)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  profile: Cart;

  @OneToMany(() => StatusInvoice, (statusInvoice) => statusInvoice.invoice)
  statusInvoices: StatusInvoice[];

  @ManyToOne(
    () => ReceiptInformation,
    (receiptInformation) => receiptInformation.invoices,
  )
  receiptInformation: ReceiptInformation;
}
