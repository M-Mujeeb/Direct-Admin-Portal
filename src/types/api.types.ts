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

// -------------------------
// Celebrities
// -------------------------

export interface Celebrity {
  _id: string;
  name: string;
  email: string;
  profile_image?: string;
  celebrity_type?: string;
  about?: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
  role_id: {
    _id: string;
    name: string;
    description: string;
  };
}

export interface GetCelebritiesResponse {
  status: boolean;
  message: string;
  data: {
    users: Celebrity[];
  };
}

export interface CreateCelebrityResponse {
  status: boolean;
  message: string;
  data: {
    email: string;
  };
}

export interface DeleteCelebrityResponse {
  status: boolean;
  message: string;
  data: {};
}

export interface UpdateCelebrity {
  _id: string;
  role_id:  string;
  name: string;
  email: string;
  profile_image?: string;
  is_verified: boolean;
  celebrity_type?: string;
  about?: string;
  createdAt: string;
  updatedAt: string;
  
}

export interface UpdateCelebrityResponse {
  status: boolean;
  message: string;
  data: {
    user: UpdateCelebrity[];
  };
}
