import { UserModel } from '../../auth/model/user.model';

export interface DevicesResponseModel {
  /**
   *  Count number of devices
   *  @type number
   */
  count?: number;
  /**
   * Next pagination link
   * @type string
   */
  next?: string;
  /**
   * Previous navigation link
   * @type string
   */
  previous?: string;
  /**
   *  Devices array content
   *  @type DevicesModel[]
   */
  results: DevicesModel[];
}

export interface DevicesModel {
  /**
   *  Device id
   *  @type string
   */
  id: string;
  /**
   *  Device name
   *  @type string
   */
  name: string;
  /**
   *  Description of device
   *  @type string
   */
  description: string;
  /**
   *  Asset type
   *  @type string
   */
  asset_type: string;
  /**
   *  Device brand
   *  @type string
   */
  brand: string;
  /**
   *  Device model
   *  @type string
   */
  model: string;
  /**
   *  Device serial number
   *  @type string
   */
  serial_number: string;
  /**
   *  Id address for device
   *  @type string
   */
  ip_address: string;
  /**
   *  Device mac address
   *  @type string
   */
  mac_address: string;
  /**
   *  Device sensor id
   *  @type string
   */
  sensor_id: string;
  /**
   *  Device online status
   *  @type string
   */
  status: string;
  /**
   *  Device purpose
   *  @type string
   */
  purpose: string;
  /**
   *  Device allocated space
   *  @type string
   */
  space: string;
  /**
   * Device owner details
   * @type UserModel
   */
  owner_details: UserModel;
  /**
   *  Device meta data
   */
  metadata: any;
  /**
   *  Device created time
   *  @type string
   */
  create_at: string;
}
