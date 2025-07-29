// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAllGroup, getGroupById, createGroup, editGroup, deleteGroup } from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getGroupById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createGroup.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editGroup.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const groupReducer = groupSlice.reducer;
