import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { Invoice } from './invoice.entity';
import { Staff } from './staff.entity';

@Entity('status_invoice')
export class StatusInvoice {
  @PrimaryGeneratedColumn('uuid')
  status_invoice_id: string;

  @ManyToOne(() => Status, (status) => status.statusInvoices, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Invoice, (invoice) => invoice.statusInvoices, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @ManyToOne(() => Staff, (staff) => staff.statusInvoices, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @CreateDateColumn()
  date_change: Date;
}
