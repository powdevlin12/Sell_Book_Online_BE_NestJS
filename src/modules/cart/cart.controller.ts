import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { createCartDTO } from './dto/create-cart.dto';
import { Request } from 'express';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCartParams } from 'src/utils/params/create-cart.param';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createCart(@Body() body: createCartDTO, @Req() req: Request) {
    const user = req.user;
    const { book_id, quantity } = body;
    const params: CreateCartParams = {
      customer_id: user['userId'],
      book_id,
      quantity,
    };
    return this.cartService.createCart(params);
  }
}
