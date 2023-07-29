import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entity/author.entity';
import { Repository } from 'typeorm';
import { createAuthorDTO } from './dto/create-author.dto';
import { ErrorException } from 'src/utils/Error';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAllAuthor(): Promise<Author[]> {
    const listAuthors = await this.authorRepository.find();
    return listAuthors;
  }

  async findById(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { author_id: id },
    });
    return author;
  }

  async createAuthor(body: createAuthorDTO): Promise<Author> | null {
    try {
      const author = this.authorRepository.create(body);
      return this.authorRepository.save(author);
    } catch (error) {
      console.log(error);
      throw new ErrorException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
