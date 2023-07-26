import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookTypeDTO } from './dto/create-book-type.dto';
import { BookTypeService } from './book_type.service';

@Controller('book-type')
export class BookTypeController {
  constructor(private readonly bookTypeService: BookTypeService) {}
  @Post()
  createBookType(@Body() body: CreateBookTypeDTO) {
    return this.bookTypeService.createBookType(body);
  }
}
