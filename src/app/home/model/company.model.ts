export interface CompanyResponseModel {
  count?: number;
  next?: string;
  previous?: string;
  results: CompanyModel[];
}

export interface CompanyModel {
  id: string;
  name: string;
  created_at: string;
}
