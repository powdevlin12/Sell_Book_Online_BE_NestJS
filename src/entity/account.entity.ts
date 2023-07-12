import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'account' })
export class Account {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  account: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;
}
