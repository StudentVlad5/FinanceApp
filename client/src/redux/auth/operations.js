import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  signUp,
  signIn,
  singOut,
  addToEvents,
  removeFromEvents,
  refreshUserToken,
  updateUserData,
  changePassword,
  forgotPassword,
} from 'services';
import { onFetchError, onSuccess, onInfo } from 'helpers/Messages/NotifyMessages';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('/auth/signup', async (credentials, thunkAPI) => {
  try {
    const { data } = await signUp(credentials);
    setAuthHeader(data.data.authToken);
    onSuccess('Вітаю з успішною реєстрацією');
    return data;
  } catch (error) {
    onFetchError(`От халепа, щось іде не за планом`, error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('/auth/signin', async (credentials, thunkAPI) => {
  try {
    const { data } = await signIn(credentials);
    setAuthHeader(data.data.authToken);
    onSuccess('Вітаю з успішним логуванням');
    return data;
  } catch (error) {
    onFetchError(`От халепа, щось іде не за планом`, error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await singOut('/auth/logout');
    onInfo('Вже сумую за тобою');
    clearAuthHeader();
  } catch (error) {
    onFetchError(`От халепа, щось іде не за планом`, error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const update = createAsyncThunk('/auth/update/:id', async (updateData, thunkAPI) => {
  try {
    const result = await updateUserData(updateData);
    onSuccess('Вітаю з успішним оновленням персональних даних');
    return result;
  } catch (error) {
    onFetchError(`От халепа, зміни не збереглися`, error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('/auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }
  try {
    setAuthHeader(persistedToken);
    const { data } = await refreshUserToken('/auth');
    return data;
  } catch (error) {
    onFetchError(`Оновіть буд-ласка сторінку і залогінтеся знову`, error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const changePasswordAuth = createAsyncThunk(
  '/auth/changePassword',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await changePassword(credentials);
      onSuccess('Пароль змінено');
      return data;
    } catch (error) {
      onFetchError(`Отримали відмову при зміні паролю`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const forgotPasswordAuth = createAsyncThunk(
  '/auth/forgotPassword',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await forgotPassword(credentials);
      onSuccess('На пошту надіслано новий пароль, буд-ласка змініть його');
      return data;
    } catch (error) {
      onFetchError(`Сервер відмовився проводити заміну паролю`, error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addEvents = createAsyncThunk('/auth/addEvents', async (id, thunkAPI) => {
  try {
    await addToEvents(`${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeEvents = createAsyncThunk('/auth/removeEvents', async (id, thunkAPI) => {
  try {
    await removeFromEvents(`${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
