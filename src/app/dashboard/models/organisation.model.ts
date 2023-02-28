import { UserModel } from '../../auth/model/user.model';

export interface OrganisationResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: OrganisationModel[];
}

export interface OrganisationModel {
  id: string;
  space: string;
  name: string;
  floor: number;
  owner_detail: UserModel;
  space_detail: {
    id: string;
    title: string;
    type: string;
    address: string;
  };
  created_at: string;
}
