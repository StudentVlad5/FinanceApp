// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  editAccount,
  deleteAccount,
} from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getAccountById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createAccount.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editAccount.fulfilled, (state, action) => {
        const newItems = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
        state.items = newItems;
      })

      // Delete
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const accountsReducer = accountsSlice.reducer;
