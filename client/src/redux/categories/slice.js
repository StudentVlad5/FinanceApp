// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  editCategory,
  deleteCategory,
} from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
