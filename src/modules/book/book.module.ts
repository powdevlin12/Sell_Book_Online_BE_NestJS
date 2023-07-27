import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book } from 'src/entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookTypeModule } from '../book_type/book_type.module';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), BookTypeModule, PublisherModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
