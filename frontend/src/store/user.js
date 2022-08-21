import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "axios";
import getEndpoint, { signup as signUpEndpoints, LOGIN } from "../config/api";

export const signUp = createAsyncThunk(
  "user/singUp",
  async ({ credentials, userType }, thunkAPI) => {
    let token, endpoint;
    try {
      token = thunkAPI.getState().user.user.token;
    } catch {
      return Promise.reject("No token found");
    }

    if (!token) return Promise.reject("No token found");
    path = signUpEndpoints[userType];
    if (!path) return Promise.reject("No path found");

    const response = await Axios.post(`${getEndpoint(path)}`, credentials, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  }
);

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
