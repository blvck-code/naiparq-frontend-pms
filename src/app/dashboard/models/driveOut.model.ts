export interface DriveOutResponseModel {
  /**
   *  Count number of drive outs
   */
  count?: number;
  /**
   *  Next drive out pagination link
   */
  next?: string;
  /**
   *  Previous drive out pagination link
   */
  previous?: string;
  /**
   *  Drive out array content
   *  @type DriveOutModel[]
   */
  results: DriveOutModel[];
}

export interface DriveOutModel {
  /**
   *  Drive out id
   */
  id: string;
  /**
   *  Drive out exit screenshot
   *  @type string
   */
  exit_screenshot: string | null;
  /**
   *  Checkout time
   *  @type string
   */
  check_out_time: string;
  /**
   *  Drive in
   *  @type string
   */
  drive_in: string;
  /**
   *  Drive in details
   */
  drive_in_details: {
    /**
     *  Drive in id
     *  @type string
     */
    id: string;
    /**
     *  License plate
     *  @type string
     */
    license_plate: string;
    /**
     *  Check in time
     *  @type string
     */
    check_in_time: string;
    /**
     *  Drive out space name
     *  @type string
     */
    space: string;
    /**
     *  Drive out status
     *  @type string
     */
    status: string;
    /**
     *  Drive out entry screenshot link
     *  @type string
     */
    entry_screenshot: string;
    /**
     *  Created at time
     *  @type string
     */
    created_at: string;
    /**
     *  Space details
     */
    space_details: {
      /**
       *  Space details address
       *  @type string
       */
      address: string;
      /**
       *  Space details id
       *  @type string
       */
      id: string;
      /**
       *  Space detail title
       *  @type string
       */
      title: string;
      /**
       *  Space detail type
       *  @type string
       */
      type: string;
    };
  };
  /**
   *  Drive out meta data
   */
  metadata?: {
    /**
     *  Meta data message
     *  @type string
     */
    message: string;
    /**
     *  Meta data space name
     *  @type string
     */
    space_name: string;
    /**
     *  Drive phone number
     *  @type string
     */
    driver_phone_number: string;
    /**
     *  Drive out latest checkout time
     *  @type string
     */
    latest_checkout_time: string;
  };
  /**
   *  Drive out created time
   *  @type string
   */
  created_at: string;
  /**
   *  Drive out message
   *  @type string
   */
  message?: string;
}
