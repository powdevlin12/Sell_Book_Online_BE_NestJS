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
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createInvoice(@Req() req: Request, @Body() body: CreateInvoiceDTO) {
    const user = req.user;
    const params = {
      ...body,
      idCustomer: user['userId'],
    };
    return this.invoiceService.createInvoice(params);
  }
}
