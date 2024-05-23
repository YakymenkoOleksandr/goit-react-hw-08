import { createSlice, nanoid } from '@reduxjs/toolkit';

//Початковий стан contacts
const contactsInitialState = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(name, phoneNumber) {
        return {
          payload: {
            id: nanoid(),
            name,
            phoneNumber,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

// Генератори екшенів
// Експортуємо генератори екшенів та редюсер
export const { addContact, deleteContact } = contactsSlice.actions;

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

// Селектор для отримання списку контактів
export const selectContacts = state => state.contacts.items;
