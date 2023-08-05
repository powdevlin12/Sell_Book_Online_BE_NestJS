type CreateCartParams = {
  book_id: string;
  quantity: string;
  customer_id: string;
};

type CreateReceiptInfo = {
  province: string;
  district: string;
  commune: string;
  description_address: string;
  phone: string;
  name_receipt: string;
  is_default: boolean;
  customer_id: string;
};

export { CreateCartParams, CreateReceiptInfo };
