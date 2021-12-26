import client from '@/api';

export type LoginPayload = {
  email: string;
  master_password: string;
};

export default class AuthService {
  static async login(payload: LoginPayload) {
    const { data } = await client.post<{
      access_token: string;
      refresh_token: string;
      transmission_key: string;
      secret: string;
    }>('/auth/signin', payload);

    return data;
  }

  static async check(payload: {}) {
    return client.post('/auth/check', payload);
  }

  static async refresh(payload: {}) {
    return client.post('/auth/refresh', payload);
  }
}
