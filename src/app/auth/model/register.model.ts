import { UserModel } from './user.model';

/**
 * Register Form model interface
 *
 * @interface
 */
export interface RegisterModel {
  /**
   *  User first name register form
   */
  first_name: string;
  /**
   * User last name register form
   */
  last_name: string;
  /**
   * User phone number register form
   */
  phone_number: string;
  /**
   * User email register form
   */
  email: string;
  /**
   * User password1 register form
   */
  password1: string;
  /**
   * User password2 register form
   */
  password2: string;
}

/**
 * Register form response model interface
 *
 * @interface
 */
export interface RegisterResponseModel {
  /**
   * Registered user details after register
   */
  user: UserModel;
  /**
   * Success message after register
   */
  message: string;
}
