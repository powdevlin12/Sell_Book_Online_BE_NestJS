import { Module } from '@nestjs/common';
import { BookTypeController } from './book_type.controller';
import { BookTypeService } from './book_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookType } from 'src/entity/type_book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookType])],
  controllers: [BookTypeController],
  providers: [BookTypeService],
  exports: [BookTypeService],
})
export class BookTypeModule {}
