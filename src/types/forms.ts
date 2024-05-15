export interface IAuthForm {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface IFeedback {
  name: string;
  email: string;
  message: string;
}

export interface IUserForm {
  name: string;
  last_name?: string;
  email: string;
  city?: string;
  phone?: string;
}
