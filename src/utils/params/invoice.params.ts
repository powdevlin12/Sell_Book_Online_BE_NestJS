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

export type { createInvoiceParams, caculatorFeeParams };
