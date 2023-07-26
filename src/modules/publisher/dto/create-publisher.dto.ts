import { IsString, MaxLength } from 'class-validator';

export class CreatePublisherDTO {
  @IsString()
  @MaxLength(300)
  name: string;

  @IsString()
  @MaxLength(300)
  address: string;

  @IsString()
  @MaxLength(10)
  phone_number: string;

  @IsString()
  @MaxLength(100)
  email: string;
}
