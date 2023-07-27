import { Injectable } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from 'src/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookType } from 'src/entity/type_book.entity';

export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  async createBook(body: CreateBookDTO) {
    // const book_type = await this.bookTypeRepository.getBookType(
    //   body.book_type_id,
    // );
    // return book_type;
    return body;
  }
}
