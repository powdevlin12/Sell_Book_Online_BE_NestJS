import { Body, Controller, Post } from '@nestjs/common';
import { CreatePublisherDTO } from './dto/create-publisher.dto';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}
  @Post()
  createPubliser(@Body() body: CreatePublisherDTO) {
    return this.publisherService.createPublisher(body);
  }
}
