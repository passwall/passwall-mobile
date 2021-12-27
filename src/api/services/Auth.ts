import client from '@/api';
import { User } from '@/store/user.slice';

export type LoginPayload = {
  email: string;
  master_password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  transmission_key: string;
  secret: string;
} & User;

export type RefreshPayload = {
  refresh_token: string;
};

export default class AuthService {
  static async login(payload: LoginPayload) {
    const { data } = await client.post<LoginResponse>('/auth/signin', payload);

    return data;
  }

  static async check(payload: {}) {
    const { data } = await client.post('/auth/check', payload);
    return data;
  }

  static async refresh(payload: RefreshPayload) {
    const { data } = await client.post<LoginResponse>('/auth/refresh', payload);
    return data;
  }
}
