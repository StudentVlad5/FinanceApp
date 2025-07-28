// redux/currency/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/accounts';

export const getAllAccounts = createAsyncThunk('accounts/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get_all`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const getAccountById = createAsyncThunk('accounts/getById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createAccount = createAsyncThunk('accounts/create', async (accountData, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/create`, accountData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const editAccount = createAsyncThunk('accounts/edit', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteAccount = createAsyncThunk('accounts/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
