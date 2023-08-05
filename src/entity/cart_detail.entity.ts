import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Book } from './book.entity';

@Entity('cart_detail')
export class CartDetail {
  @PrimaryGeneratedColumn('uuid')
  cart_detail_id: string;

  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  total_weight: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartDetail, { cascade: ['remove'] })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.cartDetail, { cascade: ['remove'] })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
