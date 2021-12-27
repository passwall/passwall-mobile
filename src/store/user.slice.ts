import client from '@/api';
import AuthService, { LoginPayload } from '@/api/services/Auth';
import { DEFAULT_PASSWALL_URL } from '@/utils/constants';
import CryptoUtils from '@/utils/crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface User {
  cancel_url: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  next_bill_date: string;
  role: string;
  status: string;
  type: string;
  update_url: string;
}
interface IUserState {
  serverUrl: string;
  email: string;
  access_token: string;
  refresh_token: string;
  transmission_key: string;
  master_hash: string;
  loading: boolean;
  user: User | null;
}

const initialState: IUserState = {
  serverUrl: DEFAULT_PASSWALL_URL,
  email: '',
  access_token: '',
  refresh_token: '',
  transmission_key: '',
  master_hash: '',
  loading: false,
  user: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
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
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootStore).user.refresh_token;

      const data = await AuthService.refresh({ refresh_token: token });
      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
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
    logOut(state) {
      state.access_token = '';
      state.refresh_token = '';
      state.transmission_key = '';
      state.master_hash = '';
      state.user = null;
    },
  },
  extraReducers: builder => {
    // login side effects
    builder.addCase(login.fulfilled, (state, action) => {
      const {
        access_token,
        refresh_token,
        transmission_key,
        secret,
        master_password,
        ...user
      } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.transmission_key = transmission_key.substring(0, 32);

      state.master_hash = CryptoUtils.pbkdf2Encrypt(secret, master_password);

      CryptoUtils.encryptKey = state.master_hash;
      CryptoUtils.transmissionKey = state.transmission_key;

      client.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      state.user = user;
      state.loading = false;
    });

    builder.addCase(login.rejected, state => {
      // TODO: handle error
      state.loading = false;
    });

    builder.addCase(login.pending, state => {
      state.loading = true;
    });

    // refresh side effects
    builder.addCase(refresh.fulfilled, (state, action) => {
      const { access_token, refresh_token, transmission_key } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.transmission_key = transmission_key.substring(0, 32);

      CryptoUtils.transmissionKey = state.transmission_key;

      client.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      state.loading = false;
    });

    builder.addCase(refresh.rejected, state => {
      state.loading = false;
    });

    builder.addCase(refresh.pending, state => {
      state.loading = true;
    });
  },
});

export const actions = userSlice.actions;
export default userSlice;
