type createInvoiceParams = {
  receipt_information_id: string;
  idCustomer: string;
  feeTotal: string;
  feeShip: string;
};

type caculatorFeeParams = {
  distance: string;
  weight: string;
  totalCostBook: string;
};

type changeStatusInvoice = {
  status_invoice_id: string;
  status_id: string;
  staffId: string;
};

export type { createInvoiceParams, caculatorFeeParams, changeStatusInvoice };
