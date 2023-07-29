import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from 'src/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookTypeService } from '../book_type/book_type.service';
import { PublisherService } from '../publisher/publisher.service';
import { AuthorService } from '../author/author.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookTypeService: BookTypeService,
    private readonly publisherService: PublisherService,
    private readonly authorService: AuthorService,
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
      relations: ['bookType', 'publishers', 'authors'],
    });
    return book;
  }

  async createBook(body: CreateBookDTO) {
    const { book_type_id, publisher_id, list_authors_id, ...rest } = body;
    try {
      const publisher = await this.publisherService.getPublisher(publisher_id);
      const book_type = await this.bookTypeService.getBookType(book_type_id);
      const authors = await this.authorService.findAuthorsWithListID(
        list_authors_id,
      );

      return this.bookRepository.save({
        ...rest,
        publishers: publisher,
        bookType: book_type,
        authors: authors,
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
