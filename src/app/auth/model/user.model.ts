export interface UserModel {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  user_type?: any,
  gender?: string,
  profile_photo_url?: string,
  date_of_birth?: string,
  push_notification?: boolean,
  sms_notification?: boolean,
  email_notification?: boolean,
  created_at?: string,
  last_login?: string
}

export interface TokenModel {
  expiry_time: string,
  lifetime: string,
  access: string,
  refresh: string
}
