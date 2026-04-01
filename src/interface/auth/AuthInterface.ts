export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends LoginInterface {
  name: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: User,
  access_token: string,
  token_type: string
}

type UserRegister = Omit<User, 'email_verified_at'>;

export interface RegisterResponse {
  user: UserRegister,
  access_token: string,
  token_type: string
}

export interface CodigoInterface {
  email: string;
}

export interface CodigoResponse {
  message: string;
}

export interface RecuperarPasswordInterface {
  codigo:string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RecuperarPasswordResponse {
  message: string;
}