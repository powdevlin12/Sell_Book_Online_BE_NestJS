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

  async getPublisher(id: string) {
    const publisher = await this.publisherRepository.findOne({
      where: { publisher_id: id },
    });

    return publisher;
  }

  async createPublisher(body: CreatePublisherDTO) {
    const publisherName = await this.publisherRepository.findOne({
      where: { name: body.name },
    });

    const publisherPhone = await this.publisherRepository.findOne({
      where: { phone_number: body.phone_number },
    });

    const publisherEmail = await this.publisherRepository.findOne({
      where: { email: body.email },
    });
    if (publisherName) {
      throw new ErrorException(
        `Tên nhà xuất bản '${publisherName.name}' đã tồn tại, vui lòng chọn tên khác`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (publisherPhone) {
      throw new ErrorException(
        `Số điện thoại '${publisherPhone.phone_number}' đã tồn tại, vui lòng chọn số khác`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (publisherEmail) {
      throw new ErrorException(
        `Email '${publisherEmail.email}' đã tồn tại, vui lòng chọn email khác`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.publisherRepository.save(body);
  }
}
