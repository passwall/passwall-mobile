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

export default class AuthService {
  static async login(payload: LoginPayload) {
    const { data } = await client.post<LoginResponse>('/auth/signin', payload);

    return data;
  }

  static async check(payload: {}) {
    return client.post('/auth/check', payload);
  }

  static async refresh(payload: {}) {
    return client.post('/auth/refresh', payload);
  }
}
