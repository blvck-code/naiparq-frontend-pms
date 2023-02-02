export interface DriveOutResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: DriveOutModel[];
}

export interface DriveOutModel {
  id: string;
  exit_screenshot: string | null;
  check_out_time: string;
  drive_in: string;
  drive_in_details: {
    id: string;
    license_plate: string;
    check_in_time: string;
    space: string;
    entry_screenshot: string;
    create_at: string;
  };
  metadata?: {
    message: string;
    space_name: string;
    driver_phone_number: string;
    latest_checkout_time: string;
  };
  created_at: string;
  message?: string;
}
