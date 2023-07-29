import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { createAuthorDTO } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  getAllAuthors() {
    return this.authorService.findAllAuthor();
  }

  @Get('/:id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.findById(id);
  }

  @Post()
  postAuthor(@Body() body: createAuthorDTO) {
    return this.authorService.createAuthor(body);
  }
}
