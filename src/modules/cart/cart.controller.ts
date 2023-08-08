import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getCartForCustomer(@Req() req: Request) {
    const user = req.user;
    return this.cartService.getAllCartForCustomer(user['userId']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:book_id')
  @HttpCode(HttpStatus.OK)
  deleteBookInCart(@Req() req: Request, @Param('book_id') book_id: string) {
    const user = req.user;
    return this.cartService.deleteBookInCart(user['userId'], book_id);
  }
}
