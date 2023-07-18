import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from './staff.entity';
import { PromotionBook } from './promotion_book.entiti';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  promotion_id: string;

  @Column({ type: 'nvarchar', length: 300 })
  name: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'nvarchar', length: 300 })
  reason: string;

  @ManyToOne(() => Staff, (staff) => staff.promotions)
  staff_id_create: Staff;

  @OneToMany(() => PromotionBook, (promotion_book) => promotion_book.promotion)
  promotion_books: PromotionBook[];
}
