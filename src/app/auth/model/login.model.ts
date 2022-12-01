import {TokenModel, UserModel} from "./user.model";

export interface LoginModel {
  phone_number: string,
  password: string
}

export interface LoginResponseModel {
  user: UserModel,
  message: string,
  token: TokenModel
}
