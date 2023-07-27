import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @MaxLength(200)
  book_name: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  pages: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  price: number;

  @IsDate()
  @IsOptional()
  release_year: Date;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  quantity_in_stock: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  weight: number;

  @IsString()
  publisher_id: string;

  @IsString()
  book_type_id: string;
}
