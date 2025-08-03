import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/category';

export const getAllCategories = createAsyncThunk('category/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get_all`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const getCategoryById = createAsyncThunk('category/getById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createCategory = createAsyncThunk('category/create', async (groupData, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/create`, groupData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const editCategory = createAsyncThunk('category/edit', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteCategory = createAsyncThunk('category/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
