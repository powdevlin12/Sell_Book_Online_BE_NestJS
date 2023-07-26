import {
  Column,
  Entity,
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

  @Column({ type: 'date' })
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
    cascade: ['update'],
  })
  publishers: Publisher;

  // @ManyToMany(() => Author)
  // @JoinTable({
  //   name: 'compositions',
  //   joinColumn: {
  //     name: 'author',
  //     referencedColumnName: 'author_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'book',
  //     referencedColumnName: 'book_id',
  //   },
  // })
  // authors: Author[];

  // @OneToMany(() => PromotionBook, (promotion_book) => promotion_book.book)
  // promotion_books: PromotionBook[];

  @ManyToOne(() => BookType, (bookType) => bookType.books, {
    cascade: ['update'],
  })
  bookType: BookType;
}
