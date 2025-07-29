import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = '/group';

export const getAllGroup = createAsyncThunk('group/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get_all`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const getGroupById = createAsyncThunk('group/getById', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${baseUrl}/get/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const createGroup = createAsyncThunk('group/create', async (groupData, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/create`, groupData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const editGroup = createAsyncThunk('group/edit', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.post(`${baseUrl}/edit/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const deleteGroup = createAsyncThunk('group/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
