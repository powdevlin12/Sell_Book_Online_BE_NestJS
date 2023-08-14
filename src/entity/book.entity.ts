import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rate } from './rate.entity';
import { Publisher } from './publisher.entity';
import { Author } from './author.entity';
import { PromotionBook } from './promotion_book.entiti';
import { BookType } from './type_book.entity';
import { CartDetail } from './cart_detail.entity';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  book_id: string;

  @Column({ type: 'nvarchar', length: 200, unique: true })
  book_name: string;

  @Column({ type: 'nvarchar', length: 300 })
  description: string;

  @Column({ type: 'nvarchar', length: 300 })
  tag: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'date', nullable: true })
  release_year: Date;

  @Column({ type: 'int' })
  quantity_in_stock: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  quantity_sold: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  total_star: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  total_rate: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'publisher_id' })
  publishers: Publisher;

  @ManyToMany(() => Author, { cascade: ['remove'] })
  @JoinTable({
    name: 'compositions',
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'author_id',
    },
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'book_id',
    },
  })
  authors: Author[];

  @OneToMany(() => PromotionBook, (promotion_book) => promotion_book.book)
  promotion_books: PromotionBook[];

  @ManyToOne(() => BookType, (bookType) => bookType.books, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'book_type_id' })
  bookType: BookType;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.book)
  cartDetail: CartDetail[];
}
