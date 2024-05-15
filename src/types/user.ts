export interface IAuth {
  expires: string;
  token: string;
  user: IUser;
}

export interface IUser {
  activated_at: string;
  city: string | null;
  country: string | null;
  created_at: string;
  created_ip_address: string | null;
  deleted_at: string | null;
  email: string;
  id: number;
  is_activated: boolean;
  is_guest: number | boolean;
  is_superuser: number | boolean;
  last_ip_address: number | string | null;
  last_login: string;
  last_seen: string | null;
  name: string;
  permissions: string | null;
  phone: string | null;
  surname: string | null;
  updated_at: string;
  username: string;
}
