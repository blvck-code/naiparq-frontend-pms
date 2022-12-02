import {UserModel} from "./user.model";

export interface RegisterModel {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password1: string,
  password2: string
}

export interface RegisterResponseModel {
  user: UserModel;
  message: string;
}
