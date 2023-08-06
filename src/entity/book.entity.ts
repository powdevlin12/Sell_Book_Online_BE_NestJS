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
import { Tag } from './tag.entity';
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

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'date', nullable: true })
  release_year: Date;

  @Column({ type: 'int' })
  quantity_in_stock: number;

  @Column({ type: 'int' })
  weight: number;

  @OneToMany(() => Tag, (tag) => tag.book)
  tags: Tag[];

  @OneToMany(() => Rate, (rate) => rate.book)
  rates: Rate[];

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
  bookType: BookType;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.book)
  cartDetail: CartDetail[];
}
