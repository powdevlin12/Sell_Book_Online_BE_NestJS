import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entity/tag.entity';
import { Repository } from 'typeorm';
import { createTagDTO } from './dto/create-tag.dto';
import { BookService } from '../book/book.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly bookService: BookService,
  ) {}

  async findAllTag(): Promise<Tag[]> {
    const listTags = await this.tagRepository.find();
    return listTags;
  }

  async findById(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { tag_id: id },
    });
    return tag;
  }

  async createTag(body: createTagDTO) {
    const { book_id, content } = body;
    const book = await this.bookService.findBookById(book_id);

    const dataInsert = this.tagRepository.create({
      content,
      book,
    });

    return this.tagRepository.save(dataInsert);
  }
}
