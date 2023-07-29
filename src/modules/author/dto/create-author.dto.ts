import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { toDate } from 'src/utils/helper';

export class createAuthorDTO {
  @IsString()
  @MaxLength(30)
  first_name: string;

  @IsString()
  @MaxLength(30)
  last_name: string;

  @Transform(({ value }) => (value === '0' ? false : true))
  @IsBoolean()
  gender: boolean;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  date_of_birth: Date;

  @IsString()
  @MaxLength(10)
  phone_number: string;

  @IsString()
  @MaxLength(300)
  address: string;

  @IsString()
  @MaxLength(100)
  email: string;
}
