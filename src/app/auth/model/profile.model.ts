import { UserModel } from './user.model';

/**
 * User profile details model interface
 *
 * @interface
 */
export interface ProfileResponseModel {
  /**
   * Count of number of users in response
   */
  count?: number;
  /**
   * Next link pagination
   */
  next?: string;
  /**
   * Previous link pagination
   */
  previous?: string;
  /**
   * Array of users on profile response
   */
  results: UserModel[];
}
