import { IsString } from 'class-validator';

export class ChangeCustomerTypeDTO {
  @IsString()
  customer_id: string;

  @IsString()
  customer_type_id: string;
}
