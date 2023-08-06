import { IsNumber, IsString } from 'class-validator';

export class CreatePromotionCustomerDTO {
  @IsString()
  percent_discount: string;

  @IsString()
  promotion_id: string;

  @IsString()
  customer_type_id: string;
}
