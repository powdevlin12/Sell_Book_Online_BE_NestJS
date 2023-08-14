import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class createCustomerDTO {
  @IsString()
  @MaxLength(30)
  first_name: string;

  @IsString()
  @MaxLength(30)
  last_name: string;

  @Transform(({ value }) => Number.parseInt(value))
  gender: boolean;

  @IsOptional()
  date_of_birth: Date;

  @IsString()
  @MaxLength(10)
  phone_number: string;

  @IsString()
  @MaxLength(10)
  role: string;

  @IsString()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(20)
  password: string;

  @IsOptional()
  avatar: string;

  @IsString()
  @MaxLength(36)
  customer_type_name: string;
}
