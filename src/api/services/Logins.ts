import client from '@/api';
import CryptoUtils from '@/utils/crypto';

export type LoginItem = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  url: string;
  username: string;
  password: string;
  extra: string;
  title: string;
};

const ENCRYPTED_FIELDS = ['username', 'password', 'extra'];

export default class LoginsService {
  static async fetchAll() {
    const { data } = await client.get<{ data: string }>('/api/logins');

    const itemList = JSON.parse(
      CryptoUtils.aesDecrypt(data.data),
    ) as LoginItem[];

    itemList.forEach(item => {
      CryptoUtils.decryptFields(item, ENCRYPTED_FIELDS);
    });

    return itemList;
  }
}
