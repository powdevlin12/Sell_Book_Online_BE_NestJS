import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('rate')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  rate_id: string;

  @Column({ type: 'nvarchar', length: 300 })
  comment: string;

  @Column({ type: 'int' })
  star: number;

  @ManyToOne(() => Book, (book) => book.rates)
  book: Book;
}
