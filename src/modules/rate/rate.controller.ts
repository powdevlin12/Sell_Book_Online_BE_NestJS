import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { createRateDTO } from './create-rate.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createRate(@Req() req: Request, @Body() body: createRateDTO) {
    const user = req.user;
    return this.rateService.createRate({ ...body, idCustomer: user['userId'] });
  }
}
