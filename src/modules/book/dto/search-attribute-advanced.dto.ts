import { IsOptional, IsString } from 'class-validator';

export class SearchBookByAttributesAdvancedDTO {
  @IsString()
  @IsOptional()
  bookName: string;

  @IsString()
  @IsOptional()
  typeBook: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  yearRelease: string;

  @IsString()
  @IsOptional()
  author: string;
}
