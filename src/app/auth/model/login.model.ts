import { TokenModel, UserModel } from './user.model';

/**
 * Login Model Interface
 *
 * @interface
 */
export interface LoginModel {
  /**
   *  Phone number {string} input during log in
   */
  phone_number: string;
  /**
   *  Password { string} input during log in
   */
  password: string;
}

/**
 * Login Response model interface
 *
 * @interface
 */
export interface LoginResponseModel {
  /**
   *  User details response after login success
   */
  user: UserModel;
  /**
   *  Message response after log in
   */
  message: string;
  /**
   *  User token data
   */
  token: TokenModel;
}
