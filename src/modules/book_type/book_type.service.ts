import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookTypeDTO } from './dto/create-book-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookType } from 'src/entity/type_book.entity';
import { Repository } from 'typeorm';
import { ErrorException } from 'src/utils/Error';

@Injectable()
export class BookTypeService {
  constructor(
    @InjectRepository(BookType)
    private bookTypeRepository: Repository<BookType>,
  ) {}

  async getBookType(id: string) {
    const bookType = await this.bookTypeRepository.findOne({
      where: { book_type_id: id },
    });
    return bookType;
  }

  async createBookType(body: CreateBookTypeDTO) {
    const bookType = await this.bookTypeRepository.findOne({
      where: { book_type_name: body.book_type_name },
    });

    if (bookType) {
      throw new ErrorException(
        `Tên loại sách '${bookType.book_type_name}' đã tồn tại, vui lòng chọn tên khác`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.bookTypeRepository.save(body);
  }
}
