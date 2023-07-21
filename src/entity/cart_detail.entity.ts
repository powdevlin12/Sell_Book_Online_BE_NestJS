import { Column, Entity, ManyToOne } from "typeorm";

@Entity('cart_detail') 
export class CartDetail {
  @Column({type : 'int'})
  total_price : number;

  @Column({type : 'int'})
  total_weight : number;

  @Column({type : 'int'})
  qauntity : number;

  @ManyToOne()

}