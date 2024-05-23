import { createSlice } from '@reduxjs/toolkit';

//Початковий стан filters
const filtersInitialState = {
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setNameFilter(state, action) {
      state.name = action.payload;
    },
  },
});

// Експортуємо генератори екшенів та редюсер
export const { setNameFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

// Селектор для отримання значення фільтра
export const selectNameFilter = state => state.filters.name;
