// redux/currency/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/currency';

export const getAllCurrencies = createAsyncThunk('currency/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get_all`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const getCurrencyById = createAsyncThunk('currency/getById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createCurrency = createAsyncThunk(
  'currency/create',
  async (currencyData, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/create`, currencyData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const editCurrency = createAsyncThunk('currency/edit', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteCurrency = createAsyncThunk('currency/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
