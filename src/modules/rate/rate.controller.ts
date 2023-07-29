import { Body, Controller, Post } from '@nestjs/common';
import { RateService } from './rate.service';
import { createRateDTO } from './create-rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  createRate(@Body() body: createRateDTO) {
    return this.rateService.createRate(body);
  }
}
