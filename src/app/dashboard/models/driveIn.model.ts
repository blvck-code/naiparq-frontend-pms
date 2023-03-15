import { DriveOutModel } from './driveOut.model';

export interface DriveInResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: DriveInModel[];
}

export interface DriveInModel {
  id: string;
  license_plate: string;
  check_in_time: string;
  space: string;
  entry_screenshot: string;
  create_at: string;
  space_details: {
    id: string;
    title: string;
    type: string;
    address: string;
  };
  status: string;
  driveOut?: DriveOutModel;
}
