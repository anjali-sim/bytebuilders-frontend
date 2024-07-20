import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface UserState {
  userInfo: {
    username: string;
    email: string;
    // [key: string]: any; // To accommodate other user info fields
  } | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload;
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserInfo = (state: RootState) => state.user.userInfo;
