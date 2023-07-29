import { IsString, MaxLength } from 'class-validator';

export class createTagDTO {
  @IsString()
  @MaxLength(50)
  content: string;

  @IsString()
  book_id: string;
}
