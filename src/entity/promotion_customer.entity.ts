import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from './promotion.entity';
import { CustomerType } from './customer_type.entity';

@Entity('promotion_customer')
export class PromotionCustomer {
  @PrimaryGeneratedColumn('uuid')
  promotion_customer_id: string;

  @Column({ type: 'int' })
  percent_discount: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotion_customers, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @ManyToOne(
    () => CustomerType,
    (customerType) => customerType.promotion_customers,
    {
      cascade: ['remove'],
    },
  )
  @JoinColumn({ name: 'customer_type_id' })
  customerType: CustomerType;
}
