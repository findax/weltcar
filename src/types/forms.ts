export interface IAuthForm {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface IFeedback {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface IUserForm {
  name: string;
  surname?: string;
  email?: string;
  city?: string;
  phone?: string;
}
