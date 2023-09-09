import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { BookService } from './book.service';
import { SearchBookByAttributesDTO } from './dto/search-attribute.dto';
import { SearchBookByAttributesAdvancedDTO } from './dto/search-attribute-advanced.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/config';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  createBook(@Body() body: CreateBookDTO) {
    return this.bookService.createBook(body);
  }

  // update image book
  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig('book') }))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    console.log('uploading image');
    console.log(file);

    return this.bookService.updateImage(
      id,
      file.destination + '/' + file.filename,
    );
  }

  @Get()
  getAllBooks() {
    return this.bookService.findAllBooks();
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.bookService.findBookDetail(id);
  }

  //SEARCH BOOKS
  // search by attributes
  @Post('/search-attributes')
  searchBookByAttributes(@Body() body: SearchBookByAttributesDTO) {
    return this.bookService.searchBookByAttributes(body);
  }

  // search by attributes advanced
  @Post('/search-attributes-advanced')
  searchBookByAttributesAdvance(
    @Body() body: SearchBookByAttributesAdvancedDTO,
  ) {
    console.log(
      '🚀 ~ file: book.controller.ts:64 ~ BookController ~ body:',
      body,
    );
    return this.bookService.searchBookByAttributesAdvanced(body);
  }

  // search by tags
  @Post('/search-tag')
  searchBookByTags(@Body() body: { tags: string }) {
    return this.bookService.searchBookByTags(body);
  }

  // search by rate
  @Post('/search-rate')
  searchBookByRate(@Body() body: { query: string }) {
    return this.bookService.searchByRate(body.query);
  }
}
