import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from 'src/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookTypeService } from '../book_type/book_type.service';
import { PublisherService } from '../publisher/publisher.service';
import { BookType } from 'src/entity/type_book.entity';

@Injectable()
export class BookService {
  constructor(
    private readonly bookTypeService: BookTypeService,
    private readonly publisherService: PublisherService,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAllBooks(): Promise<Book[]> {
    const bookList = await this.bookRepository.find({
      relations: ['bookType', 'publishers'],
    });
    return bookList;
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { book_id: id },
      relations: ['bookType', 'publishers'],
    });
    return book;
  }

  async createBook(body: CreateBookDTO) {
    const { book_type_id, publisher_id, ...rest } = body;
    try {
      const publisher = await this.publisherService.getPublisher(publisher_id);
      const book_type = await this.bookTypeService.getBookType(book_type_id);

      return this.bookRepository.save({
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
