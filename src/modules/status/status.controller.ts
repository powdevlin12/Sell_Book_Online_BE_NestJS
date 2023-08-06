import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDTO } from './dto/create-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  createStatus(@Body() body: CreateStatusDTO) {
    return this.statusService.createStatus(body);
  }
}
