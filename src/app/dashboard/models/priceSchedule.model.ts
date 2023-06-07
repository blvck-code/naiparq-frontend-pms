import { UserModel } from '../../auth/model/user.model';

/**
 *  Price schedule response interface
 *  @interface
 */
export interface PriceScheduleResponseModel {}
/**
 *  Price schedule interface
 *  @interface
 */
export interface PriceScheduleModel {
  /**
   *  Pricing schedule id
   *  @type string
   */
  id: string;
  /**
   *  Pricing label
   *  @type string
   */
  label: string;
  /**
   *  Pricing space group price
   *  @type string[]
   */
  spacePriceGroup: string[];
  /**
   *  Pricing group data
   *  @type PriceGroupDetail[]
   */
  price_group_detail: PriceGroupDetail[];
  /**
   *  Owner details
   *  @type UserModel
   */
  owner_detail: UserModel;
}

export interface PriceGroupDetail {
  /**
   *  Pricing group detail
   *  @type string
   */
  id: string;
  /**
   *  Pricing group detail min time
   *  @type string
   */
  min_time: string;
  /**
   *  Pricing group detail max time
   *  @type string
   */
  max_time: string;
  /**
   *  Pricing group detail price
   *  @type number
   */
  price: number;
  /**
   *  Pricing group detail owner
   *  @type UserModel
   */
  owner_detail: UserModel;
}
