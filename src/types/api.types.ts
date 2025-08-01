// -------------------------
// Auth
// -------------------------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      profile_img: string;
    };
    token: string;
  };
}

// -------------------------
// Users / Fans
// -------------------------
export interface FanUser {
  _id: string;
  name: string;
  email: string;
  is_verified: boolean;
  profile_image?: string;
  createdAt: string;
  updatedAt: string;
  role_id: {
    _id: string;
    name: string;
    description: string;
  };
}

export interface GetCustomersResponse {
  status: boolean;
  message: string;
  data: {
    users: FanUser[];
  };
}
