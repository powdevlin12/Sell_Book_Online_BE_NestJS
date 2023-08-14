import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Customer } from './customer.entity';
import { CartDetail } from './cart_detail.entity';

@Entity('rate')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  rate_id: string;

  @Column({ type: 'nvarchar', length: 300 })
  comment: string;

  @Column({ type: 'int' })
  star: number;

  @OneToOne(() => CartDetail, (cartDetail) => cartDetail.rate)
  cartDetail: CartDetail;
}
