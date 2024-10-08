export interface User {
  _id: string;
  username: string;
  name: string;
  phoneNumber: string;
  token: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface CategoryCredentials {
  _id: string;
  title: string;
}

export interface ProductCredentials {
  _id: string;
  user: {
    _id: string;
    name: string;
    phoneNumber: string;
  };
  category: {
    _id: string;
    title: string;
  };
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductFields {
  user: string;
  category: string;
  title: string;
  price: string;
  description: string;
  image: string | null;
}