import { Transform } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class createRateDTO {
  @IsString()
  @MaxLength(300)
  comment: string;

  @IsString()
  star: string;

  @IsString()
  cart_detail_id: string;
}
