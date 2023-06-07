import { UserModel } from '../../auth/model/user.model';

export interface PricingResponseModel {
  /**
   *  Count number of pricing content
   *  @type number
   */
  count?: number;
  /**
   *  Next pricing pagination
   *  @type string
   */
  next?: string;
  /**
   *  Previous pagination link
   *  @type string
   */
  previous?: string;
  /**
   *  Pricing array content
   *  @type PricingModel[]
   */
  results: PricingModel[];
}

export interface PricingModel {
  /**
   *  Pricing id
   *  @type string
   */
  id: string;
  /**
   *  Pricing min time
   *  @type string
   */
  min_time: string;
  /**
   *  Pricing max time
   *  @type string
   */
  max_time: string;
  /**
   *  Pricing
   *  @type number
   */
  price: number;
  /**
   *  Pricing owner
   *  @type UserModel
   */
  owner_detail?: UserModel;
}
