import { UserModel } from '../../auth/model/user.model';

export interface DevicesResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: DevicesModel[];
}

export interface DevicesModel {
  id: string;
  name: string;
  description: string;
  asset_type: string;
  brand: string;
  model: string;
  serial_number: string;
  ip_address: string;
  mac_address: string;
  sensor_id: string;
  status: string;
  purpose: string;
  space: string;
  owner_details: UserModel;
  metadata: any;
  create_at: string;
}
