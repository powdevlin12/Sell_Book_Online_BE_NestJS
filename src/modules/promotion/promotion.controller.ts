import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { PromotionService } from './promotion.service';
import { CreatePromotionCustomerDTO } from './dto/create-promotion-customer';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createPromotion(@Req() req: Request, @Body() body: CreatePromotionDTO) {
    const user = req.user;
    return this.promotionService.createPromotion(user['userId'], body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/customer-type')
  @HttpCode(HttpStatus.OK)
  createPromotionCustomer(@Body() body: CreatePromotionCustomerDTO) {
    return this.promotionService.createPromotionCustomer(body);
  }
}
