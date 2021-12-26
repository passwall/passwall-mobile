import client from '@/api';
import AuthService, { LoginPayload } from '@/api/services/Auth';
import { DEFAULT_PASSWALL_URL } from '@/utils/constants';
import CryptoUtils from '@/utils/crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface IUserState {
  serverUrl: string;
  email: string;
  access_token: string;
  refresh_token: string;
  transmission_key: string;
  master_hash: string;
  loading: boolean;
}

const initialState: IUserState = {
  serverUrl: DEFAULT_PASSWALL_URL,
  email: '',
  access_token: '',
  refresh_token: '',
  transmission_key: '',
  master_hash: '',
  loading: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (payload: LoginPayload, thunkAPi) => {
    payload.master_password = CryptoUtils.sha256Encrypt(
      payload.master_password,
    );
    try {
      const data = {
        master_password: payload.master_password,
        ...(await AuthService.login(payload)),
      };
      return data;
    } catch (error) {
      return thunkAPi.rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setServerUrl(state, action: PayloadAction<string>) {
      state.serverUrl = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const {
        access_token,
        refresh_token,
        transmission_key,
        secret,
        master_password,
        ...rest
      } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.transmission_key = transmission_key.substring(0, 32);

      state.master_hash = CryptoUtils.pbkdf2Encrypt(secret, master_password);

      CryptoUtils.encryptKey = state.master_hash;
      CryptoUtils.transmissionKey = state.transmission_key;

      client.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      console.log(rest);
      state.loading = false;
    });

    builder.addCase(login.rejected, state => {
      // TODO: handle error
      state.loading = false;
    });

    builder.addCase(login.pending, state => {
      state.loading = true;
    });
  },
});

export const actions = userSlice.actions;
export default userSlice;
