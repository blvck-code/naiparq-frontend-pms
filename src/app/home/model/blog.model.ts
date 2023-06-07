import { UserModel } from '../../auth/model/user.model';

export interface BlogResponseModel {
  /**
   *  Count number of blogs
   */
  count?: number;
  /**
   * Next pagination link
   */
  next?: string;
  /**
   * Previous pagination link
   */
  previous?: string;
  /**
   *  Blog array content
   */
  results: BlogModel[];
}

export interface BlogModel {
  /**
   * Blog id
   * @type string
   */
  id: string;
  /**
   * Blog title
   * @type string
   */
  title: string;
  /**
   * Blog cover image
   * @type string
   */
  cover_image: string;
  /**
   * Blog slug
   * @type string
   */
  slug: string;
  /**
   * Blog content
   * @type string
   */
  content: string;
  /**
   * Blog status
   * @type string
   */
  status: string;
  /**
   * Blog author
   * @type UserModel
   */
  author_details: UserModel;
  /**
   * Blog created date
   * @type string
   */
  created_at: string;
  /**
   * Blog updated date
   * @type string
   */
  updated_at: string;
}
