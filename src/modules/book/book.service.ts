import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from 'src/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookTypeService } from '../book_type/book_type.service';
import { PublisherService } from '../publisher/publisher.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookTypeService: BookTypeService,
    private readonly publisherService: PublisherService,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createBook(body: CreateBookDTO) {
    const { book_type_id, publisher_id, ...rest } = body;
    try {
      const publisher = await this.publisherService.getPublisher(publisher_id);
      const book_type = await this.bookTypeService.getBookType(book_type_id);

      this.bookRepository.save({
        ...rest,
        publishers: publisher,
        bookType: book_type,
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
