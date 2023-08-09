import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from 'src/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookTypeService } from '../book_type/book_type.service';
import { PublisherService } from '../publisher/publisher.service';
import { AuthorService } from '../author/author.service';
import { SearchBookByAttributesDTO } from './dto/search-attribute.dto';
import { ErrorException } from 'src/utils/Error';
import { convertVNtoEn } from '../../utils/helper';

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
      relations: ['bookType', 'publishers', 'authors'],
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

  // SEARCH BOOK
  // Search by attributes
  async searchBookByAttributes(body: SearchBookByAttributesDTO) {
    const { author, bookName, publisher, typeBook, yearRelease } = body;
    const results = [];
    const weight = {
      bookName: 5,
      typeBook: 4,
      author: 3,
      publisher: 2,
      yearRelease: 1,
    };
    try {
      const books = await this.findAllBooks();
      for (const book of books) {
        let score = 0;
        if (
          bookName &&
          convertVNtoEn(book.book_name).includes(convertVNtoEn(bookName))
        ) {
          score += weight.bookName;
        }

        if (
          typeBook &&
          convertVNtoEn(book.bookType.book_type_name).includes(
            convertVNtoEn(typeBook),
          )
        ) {
          score += weight.typeBook;
        }

        if (author) {
          const bookValid = book.authors.filter((authorB) =>
            convertVNtoEn(
              `${authorB.first_name} ${authorB.last_name}`,
            ).includes(convertVNtoEn(author)),
          );
          if (bookValid.length > 0) {
            score += weight.author;
          }
        }

        if (
          publisher &&
          convertVNtoEn(book.publishers.name).includes(convertVNtoEn(publisher))
        ) {
          score += weight.publisher;
        }

        if (
          yearRelease &&
          Number.parseInt(yearRelease) ===
            new Date(book?.release_year)?.getFullYear()
        ) {
          score += weight.yearRelease;
        }

        if (score > 0) {
          results.push({ book, score });
        }
      }
      results.sort((a, b) => b.score - a.score);
      return results;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
