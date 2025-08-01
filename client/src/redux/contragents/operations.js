import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/contragent';

export const getAllContragents = createAsyncThunk('contragent/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get_all`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const getContragentById = createAsyncThunk('contragent/getById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createContragent = createAsyncThunk(
  'contragent/create',
  async (groupData, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/create`, groupData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const editContragent = createAsyncThunk(
  'contragent/edit',
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/edit/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteContragent = createAsyncThunk('contragent/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
