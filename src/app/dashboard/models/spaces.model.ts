export interface SpaceModelResponse {
  count?: number;
  next?: string;
  previous?: string;
  results: [];
}

export interface SpaceModel {
  id: string;
  title: string;
  description: string;
  location: {
    type: string;
    coordinated: number[];
  };
  address: string;
  type: string;
  features: string[];
  space_images: SpaceImages[];
  opening_time: string;
  closing_time: string;
  contact_person?: any;
  license_place: boolean;
  drivers_license: boolean;
  is_partner: boolean;
  is_disabled: boolean;
  is_published: boolean;
  is_verified: boolean;
  map_address_link: string;
  owner_detail: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: any;
  };
  create_at: string;
}

export interface SpaceImages {
  image: string;
}
