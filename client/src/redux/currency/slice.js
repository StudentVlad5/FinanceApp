// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCurrencies,
  getCurrencyById,
  createCurrency,
  editCurrency,
  deleteCurrency,
} from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllCurrencies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getCurrencyById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createCurrency.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Edit
      .addCase(editCurrency.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const currencyReducer = currencySlice.reducer;
