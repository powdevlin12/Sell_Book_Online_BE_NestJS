import { Transform } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class createRateDTO {
  @IsString()
  @MaxLength(300)
  comment: string;

  @Transform(({ value }) => Number.parseInt(value))
  star: number;

  @IsString()
  book_id: string;
}
