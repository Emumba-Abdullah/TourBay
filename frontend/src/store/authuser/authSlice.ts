import { createSlice } from "@reduxjs/toolkit";
export interface IUser {
  email: string;
  token: string;
}

export interface authState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: authState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;
