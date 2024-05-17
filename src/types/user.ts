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

export interface IUserOrdersData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: null;
  path: string;
  from: number;
  to: number;
  data: [
    {
      id: string;
      order_no: string;
      price: string | number;
      order_status: string;
      payment_status: string;
      order_status_name: string;
      payment_status_name: string;
      created_at: string;
      updated_at: string;
      stages: [
        {
          order_status: string;
          payment_status: string;
          order_status_name: string;
          payment_status_name: string;
          files: [
            {
              title: string | null;
              description: string | null;
              type: string;
              file_name: string;
              url: string;
            },
          ];
          created_at: string;
          updated_at: string;
        },
      ];
      car: {
        id: string;
        car_id: string;
        brand: string;
        model: string;
        year: number;
        vin: string;
        inner_color_hex: string;
        inner_color_name: string;
        outer_color_hex: string;
        outer_color_name: string;
        description: string;
        photos: [
          {
            thumb: string;
            original: string;
          },
        ];
        documents: [
          {
            title: string;
            description: string;
            file_name: string;
            url: string;
          },
        ];
        properties: [
          {
            name: string;
            value: string;
          },
        ];
      };
    },
  ];
}
