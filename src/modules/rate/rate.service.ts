import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from 'src/entity/rate.entity';
import { Repository } from 'typeorm';
import { BookService } from '../book/book.service';
import { createRateDTO } from './create-rate.dto';
import { CartDetailService } from '../cart-detail/cart-detail.service';
import { ErrorException } from 'src/utils/Error';
import { CartDetail } from 'src/entity/cart_detail.entity';
import { createRate } from 'src/utils/params/rate.params';
import { Book } from 'src/entity/book.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private readonly bookService: BookService,
    private readonly cartDetailService: CartDetailService,
  ) {}

  async findAllTag(): Promise<Rate[]> {
    const listTags = await this.rateRepository.find();
    return listTags;
  }

  async findById(id: string): Promise<Rate> {
    const rate = await this.rateRepository.findOne({
      where: { rate_id: id },
    });
    return rate;
  }

  async createRate(body: createRate) {
    const { comment, star, cart_detail_id, idCustomer } = body;

    try {
      const cartDetail = await this.cartDetailService.getCartDetailById(
        cart_detail_id,
      );

      if (!cartDetail) {
        throw new ErrorException(
          'Không tìm thấy cart Detail',
          HttpStatus.NOT_FOUND,
        );
      } else if (cartDetail.cart.customer.customer_id !== idCustomer) {
        throw new ErrorException(
          'Bạn không có quyền đánh giá vì bạn không phải chủ đơn hàng này!',
          HttpStatus.FORBIDDEN,
        );
      }

      const rateNew = await this.rateRepository.save({
        comment,
        star: Number.parseInt(star),
      });

      if (!rateNew) {
        throw new ErrorException(
          'Tạo rate không thành công !',
          HttpStatus.NOT_FOUND,
        );
      }

      const updateCartDetail = await this.cartDetailRepository.save({
        ...cartDetail,
        rate: rateNew,
      });

      const updateBook = await this.bookRepository.save({
        ...updateCartDetail.book,
        total_star: updateCartDetail.book.total_star + Number.parseInt(star),
        total_rate: updateCartDetail.book.total_rate + 1,
      });

      return { updateCartDetail, updateBook };
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
