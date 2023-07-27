import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity('publisher')
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  publisher_id: string;

  @Column({ type: 'nvarchar', length: 300 })
  name: string;

  @Column({ type: 'nvarchar', length: 300 })
  address: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  phone_number: string;

  @Column({ type: 'nvarchar', length: 100, unique: true })
  email: string;

  @OneToMany(() => Book, (book) => book.publishers)
  books: Book[];
}
