import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookTypeDTO } from './dto/create-book-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookType } from 'src/entity/type_book.entity';
import { Connection, Repository } from 'typeorm';
import { ErrorException } from 'src/utils/Error';

@Injectable()
export class BookTypeService {
  constructor(
    @InjectRepository(BookType)
    private bookTypeRepository: Repository<BookType>, // private readonly connection: Connection,
  ) {}

  // async hasUsersTable(): Promise<boolean> {
  //   const hasTable = await this.connection.query(`
  //     SELECT COUNT(*)
  //     FROM information_schema.tables
  //     WHERE table_schema = '${process.env.DB_DATABASE}'
  //     AND table_name = 'book_type';
  //   `);
  //   let isSuccess = false;
  //   if (hasTable[0]['COUNT(*)'] !== 1) {
  //     isSuccess = await this.connection.query('create table book_type');
  //   }
  //   return isSuccess;
  // }

  async createBookType(body: CreateBookTypeDTO) {
    // const isExist = await this.hasUsersTable();
    // console.log(isExist);
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
