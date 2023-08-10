import { IsString } from 'class-validator';

export class PatchStatusInvoice {
  @IsString()
  status_invoice_id: string;

  @IsString()
  status_id: string;
}
