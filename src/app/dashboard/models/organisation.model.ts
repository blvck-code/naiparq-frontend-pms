import { UserModel } from '../../auth/model/user.model';

export interface OrganisationResponseModel {
  /**
   * Count number of organizations
   * @type number
   */
  count?: number;
  /**
   * Organization next page link
   * @type string
   */
  next?: string;
  /**
   *  Previous pagination link
   *  @type string
   */
  previous?: string;
  /**
   *  Organization array content
   *  @type OrganisationModel[]
   */
  results: OrganisationModel[];
}

export interface OrganisationModel {
  /**
   * Org id
   * @type string
   */
  id: string;
  /**
   *  Space to the org
   *  @type string
   */
  space: string;
  /**
   *  Org name
   *  @type string
   */
  name: string;
  /**
   *  Org floor number
   *  @type number
   */
  floor: number;
  /**
   *  Org owner details
   *  @type UserModel
   */
  owner_detail: UserModel;
  /**
   *  Space detail
   */
  space_detail: {
    /**
     *  Space id
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
    /**
     *  Space address
     *  @type string
     */
    address: string;
  };
  /**
   *  Space created time
   *  @type string
   */
  created_at: string;
}
