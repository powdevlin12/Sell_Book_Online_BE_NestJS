import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from './promotion.entity';
import { Book } from './book.entity';

@Entity('promotion_book')
export class PromotionBook {
  @PrimaryGeneratedColumn('uuid')
  promotion_book_id: string;

  @Column({ type: 'int' })
  percent_discount: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_books, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @ManyToOne(() => Book, (book) => book.promotion_books, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
