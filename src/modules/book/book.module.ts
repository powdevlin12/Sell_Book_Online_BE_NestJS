import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book } from 'src/entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookTypeModule } from '../book_type/book_type.module';
import { PublisherModule } from '../publisher/publisher.module';
import { AuthorModule } from '../author/author.module';
import { CartDetailModule } from '../cart-detail/cart-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    BookTypeModule,
    PublisherModule,
    AuthorModule,
    CartDetailModule,
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
