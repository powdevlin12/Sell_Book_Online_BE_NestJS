import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  author_id: string;

  @Column({ type: 'nvarchar', length: 30 })
  first_name: string;

  @Column({ type: 'nvarchar', length: 30 })
  last_name: string;

  @Column({ type: 'bool', length: 30 })
  gender: boolean;

  @Column({ type: 'date' })
  date_of_birth: string;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @Column({ type: 'nvarchar', length: 300 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;
}
