import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class createCartDTO {
  @IsString()
  book_id: string;

  @IsString()
  quantity: string;
}
