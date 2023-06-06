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
  check_out_time: string;
  check_in_time: string;
  payment_channels_available: PaymentChannelsModel[];
  created_at: string;
  drive_out_details: {
    id: string;
    exit_screenshot: string;
    check_out_time: string;
    drive_in: string;
    drive_in_details: {
      id: string;
      license_plate: string;
      check_in_time: string;
      space: string;
      space_details: {
        id: string;
        title: string;
        address: string;
      };
      entry_screenshot: string;
      status: string;
      created_at: string;
    };
    metadata: {};
    created_at: string;
  };
}

export interface PaymentChannelsModel {
  id: string;
  channel: string;
  is_active: boolean;
}
