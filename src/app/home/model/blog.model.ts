import { UserModel } from '../../auth/model/user.model';

export interface BlogResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: BlogModel[];
}

export interface BlogModel {
  id: string;
  title: string;
  cover_image: string;
  slug: string;
  content: string;
  status: string;
  author_details: UserModel;
  created_at: string;
  updated_at: string;
}
