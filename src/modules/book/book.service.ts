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
import { CartDetailService } from '../cart-detail/cart-detail.service';
import { SearchBookByAttributesAdvancedDTO } from './dto/search-attribute-advanced.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookTypeService: BookTypeService,
    private readonly publisherService: PublisherService,
    private readonly authorService: AuthorService,
    private readonly cartDetailService: CartDetailService,
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

  async findBookDetail(id: string) {
    const book = await this.bookRepository.findOne({
      where: { book_id: id },
      relations: ['bookType', 'publishers', 'authors'],
    });

    const rates = await this.cartDetailService.getRateForBook(id);

    return { book, rates };
  }

  async createBook(body: CreateBookDTO) {
    const { book_type_id, publisher_id, list_authors_id, ...rest } = body;
    console.log('book weight : ', body.weight);
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

  // update image
  async updateImage(id: string, image: string) {
    return await this.bookRepository.update(id, { image });
  }

  // SEARCH BOOK
  // Search by attributes
  async searchBookByAttributes(body: SearchBookByAttributesDTO) {
    // const { author, bookName, publisher, typeBook, yearRelease } = body;
    const { query } = body;
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
        if (query) {
          if (convertVNtoEn(book.book_name).includes(convertVNtoEn(query))) {
            score += weight.bookName;
          }

          if (
            convertVNtoEn(book.bookType.book_type_name).includes(
              convertVNtoEn(query),
            )
          ) {
            score += weight.typeBook;
          }

          const bookValid = book.authors.filter((authorB) =>
            convertVNtoEn(
              `${authorB.first_name} ${authorB.last_name}`,
            ).includes(convertVNtoEn(query)),
          );
          if (bookValid.length > 0) {
            score += weight.author;
          }

          if (
            convertVNtoEn(book.publishers.name).includes(convertVNtoEn(query))
          ) {
            score += weight.publisher;
          }

          if (
            Number.parseInt(query) ===
            new Date(book?.release_year)?.getFullYear()
          ) {
            score += weight.yearRelease;
          }
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

  // Search by attributes Advanced Search
  async searchBookByAttributesAdvanced(
    body: SearchBookByAttributesAdvancedDTO,
  ) {
    const {
      author,
      bookName,
      publisher,
      typeBook,
      yearRelease,
      w_bookName,
      w_typeBook,
      w_publisher,
      w_yearRelease,
      w_author,
    } = body;
    // const { query } = body;
    const results = [];
    const weight = {
      bookName: Number.parseInt(w_bookName) ?? 2,
      typeBook: Number.parseInt(w_typeBook) ?? 1,
      author: Number.parseInt(w_publisher) ?? 1,
      publisher: Number.parseInt(w_author) ?? 1,
      yearRelease: Number.parseInt(w_yearRelease) ?? 1,
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
      console.log(
        '🚀 ~ file: book.service.ts:221 ~ BookService ~ results:',
        results,
      );
      return results;
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // search by tags
  async searchBookByTags(body: { tags: string }) {
    const { tags } = body;
    console.log(
      '🚀 ~ file: book.service.ts:129 ~ BookService ~ searchBookByTags ~ tags:',
      tags,
    );
    const listTags = tags.split(' ');

    try {
      const books = await this.findAllBooks();
      const results = [];
      for (const book of books) {
        let score = 0;
        const bookTags = convertVNtoEn(book.tag.replace(/,/g, '')).split(' ');

        for (const tag of listTags) {
          if (bookTags.includes(convertVNtoEn(tag))) {
            score += 1;
          }
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
    return listTags;
  }

  // search by rate
  async searchByRate(query: string) {
    const results = [];
    const weight = {
      bookName: 2,
      typeBook: 1,
      author: 1,
      publisher: 1,
      yearRelease: 1,
    };
    try {
      const books = await this.findAllBooks();
      for (const book of books) {
        let score = 0;
        if (query) {
          if (convertVNtoEn(book.book_name).includes(convertVNtoEn(query))) {
            score += weight.bookName;
          }

          if (
            convertVNtoEn(book.bookType.book_type_name).includes(
              convertVNtoEn(query),
            )
          ) {
            score += weight.typeBook;
          }

          const bookValid = book.authors.filter((authorB) =>
            convertVNtoEn(
              `${authorB.first_name} ${authorB.last_name}`,
            ).includes(convertVNtoEn(query)),
          );
          if (bookValid.length > 0) {
            score += weight.author;
          }

          if (
            convertVNtoEn(book.publishers.name).includes(convertVNtoEn(query))
          ) {
            score += weight.publisher;
          }

          if (
            Number.parseInt(query) ===
            new Date(book?.release_year)?.getFullYear()
          ) {
            score += weight.yearRelease;
          }
        }

        if (score > 0) {
          results.push({ book, score });
        }
      }
      for (const result of results) {
        if (result.book.quantity_sold !== 0) {
          result.score =
            result.score +
            (result.book.total_star * result.book.total_rate) /
              result.book.quantity_sold;
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
