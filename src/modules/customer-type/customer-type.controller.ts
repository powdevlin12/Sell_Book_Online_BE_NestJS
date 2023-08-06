import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CustomerTypeService } from './customer-type.service';
import { CreateCustomerTypeDTO } from './dto/create-customer-type.dto';

@Controller('customer-type')
export class CustomerTypeController {
  constructor(private readonly customerTypeService: CustomerTypeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  createCustomerType(@Body() body: CreateCustomerTypeDTO) {
    return this.customerTypeService.createCustomerType(body);
  }
}
