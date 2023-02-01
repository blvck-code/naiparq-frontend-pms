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
  created_at: string;
  message?: string;
}
