import { UserModel } from './user.model';

export interface ProfileResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: UserModel[];
}
