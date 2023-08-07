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
import { AuthGuard } from '@nestjs/passport';
import { createReceiptInfoDTO } from './dto/create-receipt.dto';
import { ReceiptInfomationService } from './receipt-infomation.service';
import { Request } from 'express';

@Controller('receipt-infomation')
export class ReceiptInfomationController {
  constructor(
    private readonly receiptInfomationService: ReceiptInfomationService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createReceiptInfo(@Body() body: createReceiptInfoDTO, @Req() req: Request) {
    const user = req.user;
    return this.receiptInfomationService.createReceiptInfo({
      ...body,
      customer_id: user['userId'],
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getReceiptInfo(@Req() req: Request) {
    const user = req.user;
    return this.receiptInfomationService.getReceiptInfo(user['userId']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  @HttpCode(HttpStatus.OK)
  updateDefaultReceiptInfo(
    @Req() req: Request,
    @Body() body: { idReceipt: string },
  ) {
    const user = req.user;
    const { idReceipt } = body;
    const params = {
      idReceipt,
      customerId: user['userId'],
    };
    return this.receiptInfomationService.setDefault(params);
  }
}
