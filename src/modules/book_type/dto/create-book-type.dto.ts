import { IsString, MaxLength } from 'class-validator';

export class CreateBookTypeDTO {
  @IsString()
  @MaxLength(200)
  book_type_name: string;
}
