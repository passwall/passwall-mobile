import { DEFAULT_PASSWALL_URL } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  serverUrl: string;
  email: string;
  masterPassword: string;
}

const initialState: IUserState = {
  serverUrl: DEFAULT_PASSWALL_URL,
  email: '',
  masterPassword: '',
};

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
    setMasterPassword(state, action: PayloadAction<string>) {
      state.masterPassword = action.payload;
    },
  },
});

export const actions = userSlice.actions;
export default userSlice;
