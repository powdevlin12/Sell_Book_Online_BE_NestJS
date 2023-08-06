import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusInvoice } from './status_invoice.entity';

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  status_id: string;

  @Column({ type: 'varchar', length: 30 })
  status_name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @OneToMany(() => StatusInvoice, (statusInvoice) => statusInvoice.status)
  statusInvoices: StatusInvoice[];
}
