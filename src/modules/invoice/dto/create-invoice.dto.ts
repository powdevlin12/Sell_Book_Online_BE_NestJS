import { IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsString()
  receipt_information_id: string;

  @IsString()
  feeTotal: string;
}
