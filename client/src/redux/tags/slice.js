// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAllTags, getTagById, createTag, editTag, deleteTag } from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getTagById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createTag.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editTag.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const tagsReducer = tagsSlice.reducer;
