import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'tag', schema: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tag_id: string;

  @Column({ type: 'nvarchar', length: 50 })
  content: string;

  @ManyToOne(() => Book, (book) => book.tags)
  book: Book;
}
