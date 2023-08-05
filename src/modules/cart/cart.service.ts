import { Injectable, HttpStatus } from '@nestjs/common';
import { createCartDTO } from './dto/create-cart.dto';
import { CustomerService } from '../customer/customer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartParams } from 'src/utils/params/create-cart.param';
import { ErrorException } from 'src/utils/Error';
import { BookService } from '../book/book.service';
import { Customer } from '../../entity/customer.entity';
import { CartDetail } from 'src/entity/cart_detail.entity';
import * as lodash from 'lodash';

@Injectable()
export class CartService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly bookService: BookService,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
  ) {}

  async createCart(body: CreateCartParams) {
    const { customer_id, book_id, quantity } = body;
    const quantityNum = Number.parseInt(quantity);
    try {
      // check cart of user don't handle
      const cart = await this.cartRepository.findOne({
        relations: {
          customer: true,
        },
        where: {
          customer: {
            customer_id: customer_id,
          },
          isCompleted: false,
        },
      });
      console.log(
        '🚀 ~ file: cart.service.ts:40 ~ CartService ~ createCart ~ cart:',
        cart,
      );

      if (lodash.isEmpty(cart)) {
        console.log('🚀 ~ file: cart.service.ts:42 ~ check cart not exists');

        // dont have cart -> create a new cart
        const book = await this.bookService.findBookById(book_id);
        const customer = await this.customerService.getMySelf(customer_id);
        // save cart
        const newCart = await this.cartRepository.save({
          customer,
          isCompleted: false,
        });

        const newCartDetail = await this.cartDetailRepository.save({
          book: book,
          cart: newCart,
          quantity: quantityNum,
          total_price: book.price * quantityNum,
          total_weight: book.weight * quantityNum,
        });

        return newCartDetail;
      } else {
        console.log('🚀 ~ file: cart.service.ts:42 ~ check cart exists');

        const checkExistBook = await this.cartDetailRepository.findOne({
          where: { book: { book_id } },
          relations: ['book'],
        });

        if (!lodash.isEmpty(checkExistBook)) {
          const newQuantity = checkExistBook.quantity + quantityNum;
          const newCartDetail = await this.cartDetailRepository.update(
            { book: { book_id } },
            {
              quantity: newQuantity,
              total_price: checkExistBook.book.price * newQuantity,
              total_weight: checkExistBook.book.weight * newQuantity,
            },
          );
          return newCartDetail;
        } else {
          const bookAdd = await this.bookService.findBookById(book_id);
          const newCartDetail = await this.cartDetailRepository.save({
            book: bookAdd,
            cart: cart,
            quantity: quantityNum,
            total_price: bookAdd.price * quantityNum,
            total_weight: bookAdd.weight * quantityNum,
          });
          return newCartDetail;
        }
      }
      return [];
    } catch (error) {
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCartForCustomer(idCustomer: string) {
    const cart = await this.cartRepository.findOne({
      where: {
        customer: {
          customer_id: idCustomer,
        },
        isCompleted: false,
      },
      relations: ['cartDetail', 'cartDetail.book'],
    });

    return cart;
  }
}
