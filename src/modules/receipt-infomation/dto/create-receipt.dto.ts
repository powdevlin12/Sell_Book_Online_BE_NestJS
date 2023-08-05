import { Transform } from 'class-transformer';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
export class createReceiptInfoDTO {
  @IsString()
  @MaxLength(30)
  province: string;

  @IsString()
  @MaxLength(30)
  district: string;

  @IsString()
  @MaxLength(30)
  commune: string;

  @IsString()
  @MaxLength(200)
  description_address: string;

  @IsString()
  @MaxLength(10)
  phone: string;

  @IsString()
  @MaxLength(50)
  name_receipt: string;

  @Transform(({ value }) => Number.parseInt(value))
  is_default: boolean;
}
