import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('book_type')
export class BookType {
  @PrimaryGeneratedColumn('uuid')
  book_type_id: string;

  @Column({
    name: 'book_type_name',
    type: 'nvarchar',
    length: 200,
    unique: true,
  })
  book_type_name: string;

  @OneToMany(() => Book, (book) => book.bookType)
  books: Book[];
}
