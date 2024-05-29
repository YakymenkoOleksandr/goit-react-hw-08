import { configureStore, createSlice } from '@reduxjs/toolkit';
import { contactsReducer } from '../../redux/contacts/slise.js';

const filtersInitialState = {
  name: '',
  number: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setNameFilter(state, action) {
      console.log('Name filter:', state.name);
      state.name = action.payload;
    },
    setNumberFilter(state, action) {
      console.log('Number filter:', state.number);
      state.number = action.payload;
    },
  },
});

export const { setNameFilter } = filtersSlice.actions;
export const { setNumberFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

export default store;
