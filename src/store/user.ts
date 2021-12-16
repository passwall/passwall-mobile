import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string;
}

const initialState: IUserState = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const actions = userSlice.actions;
export default userSlice;
