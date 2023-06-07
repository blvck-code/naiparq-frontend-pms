export interface SpaceModelResponse {
  /**
   *  Count number of spaces
   */
  count?: number;
  /**
   * Next pagination link
   */
  next?: string;
  /**
   * Previous pagination link
   */
  previous?: string;
  /**
   * Spaces model content
   */
  results: [];
}

/**
 *  Space interface
 *  @interface
 */
export interface SpaceModel {
  /**
   * Space id
   * @type string
   */
  id: string;
  /**
   *  Space title
   *  @type string
   */
  title: string;
  /**
   * Space description
   * @type string
   */
  description: string;
  /**
   * Space location
   */
  location: {
    /**
     *  Location type
     *  @type string
     */
    type: string;
    /**
     *  Space coordinates
     *  @type number[]
     */
    coordinates: number[];
  };
  /**
   *  Space address
   *  @type string
   */
  address: string;
  /**
   * Space type
   * @type string
   */
  type: string;
  /**
   * Space features
   * @type string[]
   */
  features: string[];
  /**
   *  Space images
   *  @type SpaceImages[]
   */
  space_images: SpaceImages[];
  /**
   *  Space opening time
   * @type string
   */
  opening_time: string;
  /**
   *  Space closing time
   * @type string
   */
  closing_time: string;
  /**
   *  Space contact user
   *
   */
  contact_person?: any;
  /**
   *  Space license plate
   *  @type boolean
   */
  license_plate: boolean;
  /**
   *  Space drive license
   *  @type boolean
   */
  drivers_license: boolean;
  /**
   *  Space is partner
   *  @type boolean
   */
  is_partner: boolean;
  /**
   *  Space disabled
   *  @type boolean
   */
  is_disabled: boolean;
  /**
   *  Space published
   *  @type boolean
   */
  is_published: boolean;
  /**
   *  Space verified
   *  @type boolean
   */
  is_verified: boolean;
  /**
   *  Map address link
   *  @type string
   */
  map_address_link: string;
  /**
   *  Owner details
   */
  owner_detail: {
    /**
     *  Owner id
     *  @type string
     */
    id: string;
    /**
     *  Owner first name
     *  @type string
     */
    first_name: string;
    /**
     *  Owner last name
     *  @type string
     */
    last_name: string;
    /**
     *  Owner email address
     *  @type string
     */
    email: string;
    /**
     *  Owner phone number
     *  @type string
     */
    phone_number: string;
    /**
     *  User type
     */
    user_type: any;
  };
  /**
   *  Created at time
   *  @type string
   */
  created_at: string;
  /**
   *  Price schedule content
   *  @type PriceScheduleModel[]
   */
  price_schedule: PriceScheduleModel[];
}

export interface PriceScheduleModel {
  /**
   *  Price schedule id
   *  @type string
   */
  price_schedule_id: string;
  /**
   *  Price
   *  @type number
   */
  price: number;
  /**
   *  Price schedule
   *  @type string
   */
  schedule: string;
}

export interface SpaceImages {
  /**
   *  Images
   *  @type string
   */
  image: string;
}
