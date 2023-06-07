/**
 * @ignore
 */
export interface UserModel {
  /**
   *  User Id
   */
  id: string;
  /**
   *  User first name
   *  @type string
   */
  first_name: string;
  /**
   *  User last name
   *  @type string
   */
  last_name: string;
  /**
   *  Email address
   *  @type string
   */
  email: string;
  /**
   *  Phone number
   *  @type string
   */
  phone_number: string;
  /**
   *  User type
   *
   */
  user_type?: any;
  /**
   *  Is superuser
   *  @type boolean
   */
  is_superuser?: boolean;
  /**
   *  User gender
   *  @type string
   */
  gender?: string;
  /**
   *  User profile link url
   *  @type string
   */
  profile_photo_url?: string;
  /**
   *  User date of birth
   *  @type string
   */
  date_of_birth?: string;
  /**
   *  User push alerts
   *  @type boolean
   */
  push_notification?: boolean;
  /**
   *  User sms alert
   *  @type boolean
   */
  sms_notification?: boolean;
  /**
   *  User email alert
   *  @type boolean
   */
  email_notification?: boolean;
  /**
   *  User created at
   *  @type string
   */
  created_at?: string;
  /**
   *  User last login
   *  @type string
   */
  last_login?: string;
}
/**
 * @ignore
 */
export interface AllUsersModel {
  /**
   *  Count for all users
   *  @type number
   */
  count: number;
  /**
   * Next pagination link
   *  @type string
   */
  next: string;
  /**
   * Previous pagination link
   *  @type string
   */
  previous: string;
  /**
   * All users
   *  @type UserModel[]
   */
  results: UserModel[];
}
/**
 * @ignore
 */
export interface TokenModel {
  /**
   * Token expiry date
   *  @type string
   */
  expiry_time: string;
  /**
   *  Token lifetime
   *  @type string
   */
  lifetime: string;
  /**
   *  Access token
   *  @type string
   */
  access: string;
  /**
   *  Refresh token
   *  @type string
   */
  refresh: string;
}
