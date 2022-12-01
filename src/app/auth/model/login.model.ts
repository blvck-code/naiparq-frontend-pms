export interface LoginModel {
  phone_number: string,
  password: string
}

export interface LoginResponseModel {
  user: {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    user_type: any
  },
  message: string,
  token: {
    expiry_time: string,
    lifetime: string,
    access: string,
    refresh: string
  }
}
