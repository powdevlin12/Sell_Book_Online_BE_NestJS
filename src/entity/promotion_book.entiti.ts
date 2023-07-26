import { Column, Entity, ManyToOne } from 'typeorm';
import { Promotion } from './promotion.entity';
import { Book } from './book.entity';

@Entity('promotion_book')
export class PromotionBook {
  @Column({ type: 'int' })
  percent_discount: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_books)
  promotion: Promotion;

  // @ManyToOne(() => Book, (book) => book.promotion_books)
  // book: Book;
}
