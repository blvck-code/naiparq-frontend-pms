import { DriveOutModel } from './driveOut.model';

export interface DriveInResponseModel {
  /**
   * Count number of Drive in
   */
  count?: number;
  /**
   * Next drive in pagination
   */
  next?: string;
  /**
   * Previous drive in pagination link
   */
  previous?: string;
  /**
   *  Drive in list array
   */
  results: DriveInModel[];
}

export interface DriveInModel {
  /**
   *  Drive in id
   */
  id: string;
  /**
   *  Drive in license plate
   */
  license_plate: string;
  /**
   *  Drive on check in time
   */
  check_in_time: string;
  /**
   *  Drive in space name
   */
  space: string;
  /**
   *  Drive in screenshot link
   */
  entry_screenshot: string;
  /**
   * Drive in created time
   */
  create_at: string;
  /**
   *  Drive in space details
   */
  space_details: {
    /**
     *  Space id
     */
    id: string;
    /**
     *  Space title
     */
    title: string;
    /**
     *  Space type
     */
    type: string;
    /**
     *  Space address
     */
    address: string;
  };
  /**
   *  Drive in status
   */
  status: string;
  /**
   *  Drive in extra details
   */
  driveOut?: DriveOutModel;
}
