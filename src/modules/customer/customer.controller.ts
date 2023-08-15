import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangeCustomerTypeDTO } from './dto/changeCustomerType.dto';

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

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAllCustomer() {
    return this.customerService.getAllCustomer();
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  changeCustomerType(@Body() body: ChangeCustomerTypeDTO) {
    return this.customerService.changeCustomerType(body);
  }
}
