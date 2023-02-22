import { UserModel } from '../../auth/model/user.model';

export interface PricingResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: PricingModel[];
}

export interface PricingModel {
  id: string;
  min_time: string;
  max_time: string;
  price: number;
  owner_detail: UserModel;
}
