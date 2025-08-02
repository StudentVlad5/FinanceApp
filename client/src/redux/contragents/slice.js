// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllContragents,
  getContragentById,
  createContragent,
  editContragent,
  deleteContragent,
} from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const contragentsSlice = createSlice({
  name: 'contragents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllContragents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllContragents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllContragents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getContragentById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createContragent.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editContragent.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteContragent.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const contragentsReducer = contragentsSlice.reducer;
