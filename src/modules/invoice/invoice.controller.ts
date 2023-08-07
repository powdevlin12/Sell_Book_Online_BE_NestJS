import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getInvoice(@Req() req: Request) {
    const user = req.user;
    return this.invoiceService.getInvoiceStatusOfCustomer(user['userId']);
  }

  @Get('/fee')
  @HttpCode(HttpStatus.OK)
  getFeeShip(
    @Query('distance') distance: string,
    @Query('totalCostBook') totalCostBook: string,
    @Query('weight') weight: string,
  ) {
    return this.invoiceService.getFeeShip({ distance, totalCostBook, weight });
  }
}
