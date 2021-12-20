import { DEFAULT_PASSWALL_URL } from '@/utils/constants';
import Axios from 'axios';

const client = Axios.create({
  baseURL: DEFAULT_PASSWALL_URL,
});

export const setBaseUrl = (url: string) => {
  client.defaults.baseURL = url;
};

export const checkUrl = async (url: string) => {
  try {
    const { data } = await Axios.get(`${url}/health`);
    return data?.api?.status_code === 200;
  } catch (e) {
    return false;
  }
};

export default client;
