import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from 'src/entity/cart_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
  ) {}

  async getCartDetailById(id: string) {
    const cartDetail = await this.cartDetailRepository.findOne({
      where: { cart_detail_id: id },
      relations: ['book', 'cart', 'cart.customer'],
    });

    return cartDetail;
  }

  async getRateForBook(idBook: string) {
    try {
      const cartDetail = await this.cartDetailRepository.find({
        where: {
          book: {
            book_id: idBook,
          },
        },
        relations: ['rate', 'cart.customer'],
      });
      const listRates = [];
      for (const item of cartDetail) {
        if (item?.rate) {
          listRates.push({ rate: item.rate, customer: item.cart.customer });
        }
      }
      return listRates;
    } catch (error) {
      console.log(error);
    }
  }
}
