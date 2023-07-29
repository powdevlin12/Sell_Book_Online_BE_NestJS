import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from 'src/entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), BookModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
