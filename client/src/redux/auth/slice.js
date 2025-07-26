import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  addEvents,
  removeEvents,
  update,
} from './operations';

const initialState = {
  user: {
    _id: null,
    name: null,
    surname: null,
    avatar: null,
    email: null,
    phone: null,
    events: [],
    favorites: [],
    role: 'candidate',
  },
  token: null,
  permission: null,
  isLoggedIn: false,
  isLoading: false,
  isError: null,
  isRefreshing: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.token = action.payload.data.authToken;
          state.permission = action.payload.data.role;
          state.isLoggedIn = true;
        }
      })
      .addCase(register.rejected, state => {
        state.user = initialState.user;
        state.token = null;
        state.permission = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.data.authToken;
        state.permission = action.payload.data.role;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, state => {
        state.user = initialState.user;
        state.token = null;
        state.permission = null;
        state.isLoggedIn = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = initialState.user;
        state.token = null;
        state.permission = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(update.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = null;
      })
      .addCase(update.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user; //data
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.user = initialState.user;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.token = null;
        state.permission = null;
      })
      .addCase(addEvents.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addEvents.fulfilled, (state, { payload }) => {
        state.user.events = [...state.user.events, payload];
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(addEvents.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(removeEvents.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(removeEvents.fulfilled, (state, { payload }) => {
        state.user.events = state.user.events.filter(_id => +_id !== payload);
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(removeEvents.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

export const authReducer = authSlice.reducer;