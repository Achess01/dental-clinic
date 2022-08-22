import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "axios";
import getEndpoint, { LOGIN } from "../config/api";

export const login = createAsyncThunk("user/login", async ({ credentials }) => {
  const endpoint = getEndpoint(LOGIN);
  const response = await Axios.post(endpoint, {
    ...credentials,
  });

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "",
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = "";
    },
    clearStatus: (state) => {
      state.status = "";
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { logOut, clearStatus } = userSlice.actions;

export default userSlice.reducer;
