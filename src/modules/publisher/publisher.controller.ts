import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePublisherDTO } from './dto/create-publisher.dto';
import { PublisherService } from './publisher.service';
import { Publisher } from 'src/entity/publisher.entity';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}
  @Get('/:id')
  getPublisherById(@Param('id') id: string): Promise<Publisher> {
    return this.publisherService.getPublisher(id);
  }

  @Get()
  getAllPublisher(): Promise<Publisher[]> {
    return this.publisherService.getAllPublishers();
  }

  @Post()
  createPubliser(@Body() body: CreatePublisherDTO) {
    return this.publisherService.createPublisher(body);
  }
}
