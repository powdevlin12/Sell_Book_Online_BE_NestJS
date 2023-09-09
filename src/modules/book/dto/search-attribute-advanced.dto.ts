import { IsOptional, IsString } from 'class-validator';

export class SearchBookByAttributesAdvancedDTO {
  @IsString()
  @IsOptional()
  bookName: string;

  @IsString()
  @IsOptional()
  w_bookName: string;

  @IsString()
  @IsOptional()
  typeBook: string;

  @IsString()
  @IsOptional()
  w_typeBook: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  w_publisher: string;

  @IsString()
  @IsOptional()
  yearRelease: string;

  @IsString()
  @IsOptional()
  w_yearRelease: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  w_author: string;
}
