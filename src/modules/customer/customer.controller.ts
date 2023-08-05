import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/my-self')
  @HttpCode(HttpStatus.OK)
  getMySelf(@Req() req: Request) {
    const user = req?.user;
    console.log(
      '🚀 ~ file: customer.controller.ts:23 ~ CustomerController ~ getMySelf ~ user:',
      user,
    );
    return this.customerService.getMySelf(user['userId']);
  }
}
