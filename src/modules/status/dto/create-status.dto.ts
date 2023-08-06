import { IsString, MaxLength } from 'class-validator';

export class CreateStatusDTO {
  @IsString()
  @MaxLength(30)
  status_name: string;

  @IsString()
  @MaxLength(200)
  description: string;
}
