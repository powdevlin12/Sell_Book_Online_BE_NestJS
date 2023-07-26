import { HttpStatus, Injectable } from '@nestjs/common';
import { Publisher } from 'src/entity/publisher.entity';
import { CreatePublisherDTO } from './dto/create-publisher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorException } from 'src/utils/Error';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  async createPublisher(body: CreatePublisherDTO) {
    const publisher = await this.publisherRepository.findOne({
      where: { name: body.name },
    });
    if (publisher) {
      throw new ErrorException(
        `Tên nhà xuất bản '${publisher.name}' đã tồn tại, vui lòng chọn tên khác`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.publisherRepository.save(body);
  }
}
