import { createAsyncThunk } from '@reduxjs/toolkit'; // Бібліотека з якої ми беремо createAsyncThunk для створення асинхронних функцій
import axios from 'axios'; // Бібліотека для асинхронних запитів на бекенд

axios.defaults.baseURL = `https://6651b9f220f4f4c44278882e.mockapi.io`;
/* - це властивість об'єкта defaults, яка налаштовує
базовий URL для всіх HTTP запитів, які ви виконуєте за допомогою бібліотеки Axios
Наприклад, якщо ви встановите axios.defaults.baseURL на https://example.com/api, і потім зробите запит до
/users, то фактичний URL запиту буде https:/ / example.com / api / users.*/

export const fetchContacts = createAsyncThunk(
  /*createAsyncThunk - це функція з бібліотеки Redux Toolkit, яка дозволяє створювати асинхронні thunks для виконання
   асинхронних операцій, таких як HTTP запити, і обробляти їх у вашому Redux store.*/
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    //thunkAPI - це об'єкт, який надається Redux Toolkit для кожного thunk під час його виконання.
    try {
      //Ця строка коду виконує HTTP GET запит за адресою /contacts за допомогою бібліотеки Axios.
      const response = await axios.get('/contacts');
      //response.data - це частина об'єкта відповіді, яка містить реальні дані, які були отримані від сервера.
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phoneNumber }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, phoneNumber });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
