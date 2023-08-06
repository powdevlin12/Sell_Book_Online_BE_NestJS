import { IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsString()
  receipt_information_id: string;

  @IsString()
  cart_id: string;

  @IsString()
  distance: string;
}
