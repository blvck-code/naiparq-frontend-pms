export interface BillingResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: BillingModel[];
}

export interface BillingModel {
  id: string;
  invoice_number: string;
  slot_rate: number;
  parking_duration: string;
  total_amount: number;
  status: string;
  is_paid: boolean;
  drive_out: string;
  payment_channels_available: string;
  created_at: string;
}
