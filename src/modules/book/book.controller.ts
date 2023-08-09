import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookService } from './book.service';
import { SearchBookByAttributesDTO } from './dto/search-attribute.dto';

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

  //SEARCH BOOKS
  // search by attributes
  @Post('/search-attributes')
  searchBookByAttributes(@Body() body: SearchBookByAttributesDTO) {
    return this.bookService.searchBookByAttributes(body);
  }
}
