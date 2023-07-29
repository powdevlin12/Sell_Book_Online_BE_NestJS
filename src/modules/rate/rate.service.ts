import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from 'src/entity/rate.entity';
import { Repository } from 'typeorm';
import { BookService } from '../book/book.service';
import { createRateDTO } from './create-rate.dto';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    private readonly bookService: BookService,
  ) {}

  async findAllTag(): Promise<Rate[]> {
    const listTags = await this.rateRepository.find();
    return listTags;
  }

  async findById(id: string): Promise<Rate> {
    const rate = await this.rateRepository.findOne({
      where: { rate_id: id },
    });
    return rate;
  }

  async createRate(body: createRateDTO) {
    const { book_id, comment, star } = body;
    const book = await this.bookService.findBookById(book_id);

    const dataInsert = this.rateRepository.create({
      comment,
      star,
      book,
    });

    return this.rateRepository.save(dataInsert);
  }
}
