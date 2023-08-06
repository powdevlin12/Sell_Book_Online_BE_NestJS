import { IsString, MaxLength } from 'class-validator';

export class CreateCustomerTypeDTO {
  @IsString()
  @MaxLength(200)
  name: string;
}
