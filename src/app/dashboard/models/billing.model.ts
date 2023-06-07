export interface BillingResponseModel {
  /**
   *  Counts number of billings
   */
  count?: number;
  /**
   * Next billing pagination link
   */
  next?: string;
  /**
   * Previous billing pagination link
   */
  previous?: string;
  /**
   * Billing content array
   */
  results: BillingModel[];
}

export interface BillingModel {
  /**
   *  Billing item id
   *  @type string
   */
  id: string;
  /**
   *  Billing invoice number
   *  @type string
   */
  invoice_number: string;
  /**
   *  Slot rate
   *  @type number
   */
  slot_rate: number;
  /**
   *  Parking duration
   *  @type string
   */
  parking_duration: string;
  /**
   *  Amount charged
   *  @type number
   */
  total_amount: number;
  /**
   *  Billing status
   *  @type string
   */
  status: string;
  /**
   *  Is billing paid
   *  @type boolean
   */
  is_paid: boolean;
  /**
   *  Drive out id
   *  @type string
   */
  drive_out: string;
  /**
   *  Checkout time
   *  @type string
   */
  check_out_time: string;
  /**
   *  CHeck in time
   *  @type string
   */
  check_in_time: string;
  /**
   *  Billing available payments
   */
  payment_channels_available: PaymentChannelsModel[];
  /**
   *  Billing created time
   *  @type string
   */
  created_at: string;
  /**
   *  Drive out details
   */
  drive_out_details: {
    /**
     *  Drive out detail id
     */
    id: string;
    /**
     *  Exit screenshot link
     *  @type string
     */
    exit_screenshot: string;
    /**
     * Check out time
     * @type string
     */
    check_out_time: string;
    /**
     *  Drive in id
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
       *   Drive in license plate
       *   @type string
       */
      license_plate: string;
      /**
       *  Check in time
       *  @type string
       */
      check_in_time: string;
      /**
       *  Space name
       *  @type string
       */
      space: string;
      /**
       *  Space detail
       */
      space_details: {
        /**
         *  Space detail id
         *  @type id
         */
        id: string;
        /**
         *  Space title
         *  @type string
         */
        title: string;
        /**
         *  Space address
         *  @type string
         */
        address: string;
      };
      /**
       *  Entry screenshot link
       *  @type string
       */
      entry_screenshot: string;
      /**
       *  Drive in status
       *  @type string
       */
      status: string;
      /**
       *  Log created time
       *  @type string
       */
      created_at: string;
    };
    /**
     * Extra meta data
     */
    metadata: {};
    /**
     *  Created at
     *  @type string
     */
    created_at: string;
  };
}

export interface PaymentChannelsModel {
  /**
   *  Payment channel id
   *  @type string
   */
  id: string;
  /**
   *  Payment channel
   *  @type string
   */
  channel: string;
  /**
   * Payment channel active
   * @type boolean
   */
  is_active: boolean;
}
