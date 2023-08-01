export interface GuestsModelResponse {
  count: number;
  next?: string;
  previous?: string;
  results: GuestsModel[];
}

export interface GuestsModel {
  id: string;
  start_date: string;
  end_date: string;
  license_plate: string;
  status: string;
  person_type: string;
  organisation: string;
  organisation_detail: {
    space: string;
    name: string;
    floor: number;
  };
  created_at: string;
}
