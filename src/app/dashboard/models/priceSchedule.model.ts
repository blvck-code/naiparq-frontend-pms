import { UserModel } from '../../auth/model/user.model';

export interface PriceScheduleResponseModel {}
export interface PriceScheduleModel {
  id: string;
  label: string;
  spacePriceGroup: string[];
  price_group_detail: PriceGroupDetail[];
  owner_detail: UserModel;
}

export interface PriceGroupDetail {
  id: string;
  min_time: string;
  max_time: string;
  price: number;
  owner_detail: UserModel;
}
