import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'customer_type' })
export class CustomerType {
  @PrimaryGeneratedColumn('uuid')
  customer_type_id: string;

  @Column({ type: 'nvarchar', length: 200 })
  name: string;

  @OneToMany(() => Customer, (customer) => customer.customer_type)
  customers: Customer[];
}
