import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  createBook(@Body() body: CreateBookDTO) {
    return this.bookService.createBook(body);
  }

  @Get()
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.bookService.findBookById(id);
  }
}