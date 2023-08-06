import { IsDate, IsDateString, IsString, MaxLength } from 'class-validator';

export class CreatePromotionDTO {
  @IsString()
  @MaxLength(300)
  name: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;

  @IsString()
  @MaxLength(300)
  reason: string;
}
