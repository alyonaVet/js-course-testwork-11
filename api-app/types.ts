import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  name: string;
  phoneNumber: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>

export interface ProductFields {
  user: string;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface CategoryFields {
  title: string;
}