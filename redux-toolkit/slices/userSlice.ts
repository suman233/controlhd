import { userData } from "@/types/common.type";
import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null,
  accessToken: null
};

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: userData }) => {
      // state.email
      state.userData = payload;
      state.isLoggedIn = true;
    },
    setAccessToken: (state, { payload }: { payload: string }) => {
      // state.email
      state.accessToken = payload;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.accessToken = null;
      destroyCookie(null, "user", { path: "/" });
      destroyCookie(null, process.env.NEXT_APP_TOKEN_NAME!, { path: "/" });

      window.location.href = "/auth/login";
    }
  },
  extraReducers: {}
});

export const { setLoginData, setAccessToken, logout } = userSlice.actions;

export default userSlice.reducer;
