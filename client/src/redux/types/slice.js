// redux/currency/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getAllTypes, getTypeById, createType, editType, deleteType } from './operations';

const initialState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data ?? action.payload;
      })
      .addCase(getAllTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getTypeById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Create
      .addCase(createType.fulfilled, (state, action) => {
        state.items.push(action.payload.data ?? action.payload);
      })

      // Edit
      .addCase(editType.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteType.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
      });
  },
});

export const typesReducer = typesSlice.reducer;
