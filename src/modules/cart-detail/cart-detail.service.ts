import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from 'src/entity/cart_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private cartRepository: Repository<CartDetail>,
  ) {}
}
